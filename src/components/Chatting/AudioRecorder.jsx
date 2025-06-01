import React, { useState, useRef } from "react";
import styled from "styled-components";
import AudioPlayer from "./AudioPlayer";

const AudioRecorder = ({ onSendAudio }) => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const streamRef = useRef(null);

  const startRecording = async () => {
    try {
      // Request audio with specific constraints for better quality
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          channelCount: 1, // Mono audio
          sampleRate: 16000, // 16kHz sample rate
          bitrate: 128000, // 128kbps
        },
      });

      streamRef.current = stream;

      // Set MIME type to webm for better browser compatibility
      const options = { mimeType: "audio/webm;codecs=opus" };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunks.current, {
            type: "audio/webm;codecs=opus",
          });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
        } catch (error) {
          console.error("Error creating audio URL:", error);
        }
      };

      // Collect data every second
      mediaRecorderRef.current.start(1000);
      setRecording(true);
      setShowPreview(false);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("마이크 접근 권한이 필요합니다.");
    }
  };

  const stopRecording = (save = true) => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach((track) => track.stop());
      setRecording(false);
      if (save) {
        setShowPreview(true);
      } else {
        setAudioUrl(null);
        setShowPreview(false);
      }
    }
  };

  const handleSend = () => {
    if (!audioUrl || !audioChunks.current.length) {
      console.error("No audio data to send");
      return;
    }

    try {
      // Combine all audio chunks into a single Blob
      const audioBlob = new Blob(audioChunks.current, {
        type: "audio/webm;codecs=opus",
      });

      const reader = new FileReader();

      reader.onloadend = () => {
        try {
          // The result is a base64 string like 'data:audio/webm;base64,...'
          const base64Audio = reader.result.split(",")[1];
          if (!base64Audio) {
            throw new Error("Failed to encode audio to base64");
          }

          console.log("Sending audio data, size:", base64Audio.length);
          onSendAudio(base64Audio);

          // Reset state
          setAudioUrl(null);
          setShowPreview(false);
          audioChunks.current = [];
        } catch (error) {
          console.error("Error processing audio data:", error);
          alert("오디오 처리 중 오류가 발생했습니다.");
        }
      };

      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        alert("오디오를 읽는 중 오류가 발생했습니다.");
      };

      // Read the Blob as base64
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error("Error preparing audio for sending:", error);
      alert("오디오 전송 준비 중 오류가 발생했습니다.");
    }
  };

  return (
    <RecorderWrapper>
      {!recording && !showPreview && (
        <RecordButton onClick={startRecording}>
          <ion-icon name="mic-outline"></ion-icon>
        </RecordButton>
      )}

      {recording && (
        <ButtonGroup>
          <ActionButton onClick={() => stopRecording(false)} $cancel>
            <ion-icon name="close-outline"></ion-icon>
          </ActionButton>
          <RecordingIndicator>
            <PulsingDot />
            Recording...
          </RecordingIndicator>
          <ActionButton onClick={() => stopRecording(true)} $confirm>
            <ion-icon name="checkmark-outline"></ion-icon>
          </ActionButton>
        </ButtonGroup>
      )}

      {showPreview && audioUrl && (
        <PreviewWrapper>
          <AudioPlayer audioUrl={audioUrl} />
          <SendButton onClick={handleSend}>
            <ion-icon name="paper-plane-outline"></ion-icon>
          </SendButton>
        </PreviewWrapper>
      )}
    </RecorderWrapper>
  );
};

const RecorderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
`;

const RecordButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--button-brand);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  ion-icon {
    font-size: 24px;
  }

  &:hover {
    transform: scale(1.05);
    background-color: var(--button-brand-hover);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) =>
    props.$cancel
      ? "var(--status-negative)"
      : props.$confirm
      ? "var(--status-positive)"
      : "var(--button-brand)"};
  color: var(--text-brand-invert);

  ion-icon {
    font-size: 20px;
  }

  &:hover {
    transform: scale(1.05);
    background-color: ${(props) =>
      props.$cancel
        ? "var(--color-red-40)"
        : props.$confirm
        ? "var(--color-green-40)"
        : "var(--button-brand-hover)"};
  }
`;

const RecordingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--status-negative);
  font-size: 14px;
`;

const PulsingDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--status-negative);
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--button-brand);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  ion-icon {
    font-size: 20px;
  }

  &:hover {
    transform: scale(1.05);
    background-color: var(--button-brand-hover);
  }
`;

export default AudioRecorder;
