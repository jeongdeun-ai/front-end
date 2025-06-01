import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AudioRecorder from "../components/Chatting/AudioRecorder";
import { chatAPI } from "../api/chat";
import { format, subDays } from "date-fns";
import { ko } from "date-fns/locale";

// Audio Player Component
const AudioPlayer = ({
  audioUrl,
  title,
  autoplay = false,
  $isUser = false,
}) => {
  const audioRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState("");

  // Convert base64 to Blob URL if needed
  useEffect(() => {
    if (!audioUrl) return;

    if (audioUrl.startsWith("data:audio/")) {
      setAudioSrc(audioUrl);
    } else if (audioUrl.startsWith("blob:")) {
      setAudioSrc(audioUrl);
    } else {
      // Assume it's a base64 string without data URL prefix
      setAudioSrc(`data:audio/mp3;base64,${audioUrl}`);
    }
  }, [audioUrl]);

  // Handle autoplay
  useEffect(() => {
    if (autoplay && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });
    }
  }, [audioSrc, autoplay]);

  if (!audioSrc) return null;

  return (
    <AudioWrapper $isUser={$isUser}>
      <audio
        ref={audioRef}
        src={audioSrc}
        controls
        controlsList="nodownload"
        style={{
          width: "100%",
          maxWidth: "300px",
          height: "36px",
        }}
      />
      {title && <Title $isUser={$isUser}>{title}</Title>}
    </AudioWrapper>
  );
};

// Main Chatting Component
const Chatting = () => {
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([]);
  const [lastPlayedMessageId, setLastPlayedMessageId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);
  const navigate = useNavigate();
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  // Clean up audio URLs when component unmounts or when messages change
  useEffect(() => {
    return () => {
      // Clean up any object URLs we've created
      messages.forEach((message) => {
        if (message.audioUrl && message.audioUrl.startsWith("blob:")) {
          URL.revokeObjectURL(message.audioUrl);
        }
      });
    };
  }, [messages]);

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch chat messages for the selected date
  const fetchChatHistory = async (date) => {
    try {
      setIsSending(true);
      // Format date as YYYY-MM-DD
      const dateString = format(date, "yyyy-MM-dd");
      console.log(`[Chat] Fetching chat history for date: ${dateString}`);

      // If it's today, get a new message, otherwise fetch history
      const isToday = format(new Date(), "yyyy-MM-dd") === dateString;

      if (isToday) {
        console.log("[Chat] Fetching new message for today");
        const response = await chatAPI.getGptResponse();
        console.log("[Chat] Received response from getGptResponse:", {
          hasAudio: !!response.audio_base64,
          hasText: !!response.question_text,
          isFirstToday: response.is_first_today,
          fullResponse: response,
        });

        // Create audio URL directly from base64 for the AudioPlayer component
        const audioUrl = `data:audio/mp3;base64,${response.audio_base64}`;

        const newMessage = {
          id: `msg-${Date.now()}`,
          type: "assistant",
          content: "audio",
          audioUrl: audioUrl,
          text: response.question_text,
          timestamp: new Date(),
        };

        console.log("[Chat] Created new message:", newMessage);

        setMessages([newMessage]);
        setLastPlayedMessageId(newMessage.id);
        setIsFirstMessage(response.is_first_today);
      } else {
        console.log("[Chat] Fetching historical messages");
        const history = await chatAPI.getChatHistory(dateString);
        console.log("[Chat] Received chat history:", {
          messageCount: history.messages?.length || 0,
          isFirstOfDay: history.is_first_of_day,
          fullResponse: history,
        });

        // Process history messages
        const processedMessages = (history.messages || []).map((msg, index) => {
          // Convert base64 audio to data URL if needed
          let audioUrl = msg.audio_url;
          if (
            audioUrl &&
            !audioUrl.startsWith("http") &&
            !audioUrl.startsWith("blob:")
          ) {
            audioUrl = `data:audio/mp3;base64,${audioUrl}`;
          }

          const processedMsg = {
            id: msg.id || `hist-${index}-${Date.now()}`,
            type: msg.sender === "assistant" ? "assistant" : "user",
            content: "audio",
            audioUrl: audioUrl,
            text: msg.text,
            timestamp: new Date(msg.timestamp || new Date()),
          };
          console.log(`[Chat] Processed message ${index + 1}:`, processedMsg);
          return processedMsg;
        });

        console.log(
          `[Chat] Setting ${processedMessages.length} messages to state`
        );
        setMessages(processedMessages);
        setIsFirstMessage(history.is_first_of_day || false);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
      // Show error message to user
    } finally {
      setIsSending(false);
    }
  };

  // Load chat history when selected date changes
  useEffect(() => {
    fetchChatHistory(selectedDate);
  }, [selectedDate]);

  // Helper function to convert base64 to Blob
  const base64ToBlob = (base64, type = "") => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  };

  const handleSendAudio = async (base64Audio) => {
    try {
      // Add user message to UI
      const userMessageId = `user-${Date.now()}`;
      const userMessage = {
        id: userMessageId,
        type: "user",
        content: "audio",
        audioUrl: `data:audio/webm;base64,${base64Audio}`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsSending(true);

      try {
        // Send audio to backend
        await chatAPI.sendUserResponse(base64Audio);

        // Get GPT response
        const response = await chatAPI.getGptResponse();

        // Create data URL for the audio response
        const audioUrl = `data:audio/mp3;base64,${response.audio_base64}`;

        // Create assistant message
        const assistantMessage = {
          id: `assistant-${Date.now()}`,
          type: "assistant",
          content: "audio",
          audioUrl: audioUrl,
          text: response.question_text,
          timestamp: new Date(),
        };

        // Update state with the assistant's response
        setMessages((prev) => [...prev, assistantMessage]);
        setLastPlayedMessageId(assistantMessage.id);
      } catch (apiError) {
        console.error("API Error:", apiError);
        // Add error message to chat
        const errorMessage = {
          id: `error-${Date.now()}`,
          type: "system",
          content: "error",
          text: "메시지를 보내는 중 오류가 발생했습니다. 다시 시도해주세요.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error in handleSendAudio:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Function to format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  // Render chat messages
  const renderMessages = () => {
    return messages.map((message) => (
      <MessageBubble
        key={message.id}
        $isUser={message.type === "user"}
        $isFirstOfDay={
          message.type === "assistant" &&
          isFirstMessage &&
          messages[0]?.id === message.id
        }
      >
        {message.content === "audio" && message.audioUrl && (
          <AudioPlayer
            audioUrl={message.audioUrl}
            title={message.text}
            autoplay={message.id === lastPlayedMessageId}
            $isUser={message.type === "user"}
          />
        )}
        {message.content === "text" && <p>{message.text}</p>}
        {message.content === "error" && (
          <ErrorMessage>{message.text}</ErrorMessage>
        )}
        <MessageTime $isUser={message.type === "user"}>
          {formatTime(message.timestamp)}
        </MessageTime>
      </MessageBubble>
    ));
  };

  const isToday =
    format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
  const isYesterday =
    format(selectedDate, "yyyy-MM-dd") ===
    format(subDays(new Date(), 1), "yyyy-MM-dd");

  const formattedDate = isToday
    ? "오늘"
    : isYesterday
    ? "어제"
    : format(selectedDate, "M월 d일 (E)", { locale: ko });

  return (
    <ChatContainer>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ion-icon name="chevron-back"></ion-icon>
        </BackButton>
        <DateSelector ref={datePickerRef}>
          <DateButton onClick={() => setShowDatePicker(!showDatePicker)}>
            <h2>{formattedDate}</h2>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </DateButton>
          {showDatePicker && (
            <DatePickerContainer>
              <DateButton
                onClick={() => handleDateChange(new Date())}
                $active={isToday}
              >
                오늘
              </DateButton>
              <DateButton
                onClick={() => handleDateChange(subDays(new Date(), 1))}
                $active={isYesterday}
              >
                어제
              </DateButton>
              <DateInput
                type="date"
                value={format(selectedDate, "yyyy-MM-dd")}
                onChange={(e) => handleDateChange(new Date(e.target.value))}
                max={format(new Date(), "yyyy-MM-dd")}
              />
            </DatePickerContainer>
          )}
        </DateSelector>
        {isFirstMessage && (
          <FirstMessageBadge>이 날의 첫 대화</FirstMessageBadge>
        )}
      </Header>

      <Messages>
        {renderMessages()}
        {isSending && (
          <MessageBubble $isUser={false}>
            <div>답변을 생성하고 있습니다...</div>
          </MessageBubble>
        )}
      </Messages>

      <InputArea>
        <AudioRecorder onSendAudio={handleSendAudio} disabled={isSending} />
      </InputArea>
    </ChatContainer>
  );
};

// Audio Player Styled Components
const AudioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 300px;
  width: 100%;
  margin: ${({ $isUser }) => ($isUser ? "0 0 0 auto" : "0 auto 0 0")};

  audio {
    &::-webkit-media-controls-panel {
      background-color: ${({ $isUser }) =>
        $isUser ? "var(--color-light-blue-40)" : "var(--color-neutral-98)"};
    }

    &::-webkit-media-controls-play-button,
    &::-webkit-media-controls-mute-button {
      filter: ${({ $isUser }) => ($isUser ? "invert(1)" : "none")};
    }

    &::-webkit-media-controls-current-time-display,
    &::-webkit-media-controls-time-remaining-display {
      color: ${({ $isUser }) =>
        $isUser ? "var(--color-common-100)" : "var(--text-primary)"};
    }
  }
`;

const Title = styled.div`
  font-size: 12px;
  color: ${({ $isUser }) =>
    $isUser ? "var(--color-common-100)" : "var(--text-secondary)"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 4px;
`;

// Chat Styled Components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--color-common-100);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-common-100);
  border-bottom: 1px solid var(--line-primary);
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 0.5rem;
  color: var(--text-primary);

  &:hover {
    color: var(--color-light-blue-40);
  }
`;

const DateSelector = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 auto;
`;

const DateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ $active }) => ($active ? "#1976d2" : "#333")};
`;

const DatePickerContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-common-100);
  border: 1px solid var(--line-primary);
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 180px;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--line-primary);
  border-radius: 0.25rem;
  font-size: 0.9rem;
  background-color: var(--color-common-100);
  color: var(--text-primary);

  &::-webkit-calendar-picker-indicator {
    filter: ${({ theme }) => (theme === "dark" ? "invert(1)" : "none")};
  }
`;

const FirstMessageBadge = styled.span`
  background-color: var(--color-light-blue-95);
  color: var(--color-light-blue-30);
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  margin-left: 8px;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  color: var(--color-red-40);
  font-size: 14px;
  margin: 4px 0;
  padding: 8px 12px;
  background-color: var(--color-red-95);
  border-radius: 8px;
  border: 1px solid var(--color-red-90);
  font-weight: 500;
`;

const Messages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-neutral-99);
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  align-self: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  background-color: ${(props) =>
    props.$isUser ? "var(--color-light-blue-40)" : "var(--color-common-100)"};
  color: ${(props) =>
    props.$isUser ? "var(--color-common-100)" : "var(--text-primary)"};
  position: relative;
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.$isFirstOfDay &&
    `
    margin-top: 2rem;
    &::before {
      content: '${props.$isFirstOfDay ? "이 날의 첫 대화" : ""}';
      position: absolute;
      top: -1.5rem;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 0.8rem;
      color: var(--text-tertiary);
    }
  `}
`;

const MessageTime = styled.span`
  display: block;
  font-size: 0.7rem;
  margin-top: 0.5rem;
  text-align: right;
  color: ${(props) =>
    props.$isUser ? "rgba(255, 255, 255, 0.7)" : "var(--text-tertiary)"};
`;

const InputArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: var(--color-common-100);
  border-top: 1px solid var(--line-primary);
  display: flex;
  justify-content: center;
`;

export default Chatting;
