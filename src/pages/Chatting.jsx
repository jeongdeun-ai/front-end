import React, { useState } from "react";
import styled from "styled-components";
import AudioRecorder from "../components/Chatting/AudioRecorder";
import AudioPlayer from "../components/Chatting/AudioPlayer";

const Chatting = () => {
  const [responseAudioUrl, setResponseAudioUrl] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([]);
  const [lastPlayedMessageId, setLastPlayedMessageId] = useState(null);

  const handleSendAudio = async (base64Audio) => {
    // Add user message
    const messageId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        type: "user",
        content: "audio",
        timestamp: new Date(),
      },
    ]);

    setIsSending(true);

    // Simulate API call
    setTimeout(() => {
      const responseMessageId = (Date.now() + 1).toString();
      const mockedAudioUrl =
        "https://capstone-design-sogang.s3.ap-northeast-2.amazonaws.com/speech/23df8d8e-e1f2-4fcb-8f46-dc3040dff771.mp3";

      setResponseAudioUrl(mockedAudioUrl);
      setMessages((prev) => [
        ...prev,
        {
          id: responseMessageId,
          type: "assistant",
          content: "audio",
          audioUrl: mockedAudioUrl,
          timestamp: new Date(),
        },
      ]);
      setLastPlayedMessageId(responseMessageId);
      setIsSending(false);
    }, 3000);
  };

  return (
    <ChatContainer>
      <Header>
        <Title>
          <ion-icon name="chatbubbles-outline"></ion-icon>
          음성 대화
        </Title>
      </Header>

      <ChatArea>
        <MessageList>
          {messages.map((message, index) => (
            <MessageBubble key={index} $isUser={message.type === "user"}>
              {message.type === "user" ? (
                <div>
                  <ion-icon name="mic"></ion-icon>
                  음성 메시지를 전송했습니다.
                </div>
              ) : (
                <AudioPlayer
                  audioUrl={message.audioUrl}
                  autoplay={lastPlayedMessageId === message.id}
                />
              )}
              <Timestamp>
                {message.timestamp.toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Timestamp>
            </MessageBubble>
          ))}
          {isSending && (
            <LoadingBubble>
              <LoadingDots>
                <span></span>
                <span></span>
                <span></span>
              </LoadingDots>
            </LoadingBubble>
          )}
        </MessageList>
      </ChatArea>

      <InputArea>
        <AudioRecorder onSendAudio={handleSendAudio} />
      </InputArea>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--background-primary);
`;

const Header = styled.header`
  padding: 16px 20px;
  background-color: var(--background-secondary);
  border-bottom: 1px solid var(--line-secondary);
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);

  ion-icon {
    font-size: 24px;
  }
`;

const ChatArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageBubble = styled.div`
  align-self: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  max-width: 80%;
  background-color: ${(props) =>
    props.$isUser ? "var(--button-primary)" : "var(--background-secondary)"};
  color: ${(props) => (props.$isUser ? "white" : "var(--text-primary)")};
  padding: 12px 16px;
  border-radius: 16px;
  border-bottom-right-radius: ${(props) => (props.$isUser ? "4px" : "16px")};
  border-bottom-left-radius: ${(props) => (!props.$isUser ? "4px" : "16px")};
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: var(--text-quaternary);
  margin-top: 4px;
  text-align: right;
`;

const LoadingBubble = styled.div`
  align-self: flex-start;
  background-color: var(--background-secondary);
  padding: 12px 16px;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
  padding: 0 8px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--text-tertiary);
    animation: bounce 1.4s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const InputArea = styled.footer`
  background-color: var(--background-secondary);
  border-top: 1px solid var(--line-secondary);
  padding: 8px;
  display: flex;
  justify-content: center;
`;

export default Chatting;
