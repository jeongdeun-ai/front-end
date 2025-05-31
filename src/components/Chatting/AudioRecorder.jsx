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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
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
    if (audioUrl) {
      fetch(audioUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result.split(",")[1];
            onSendAudio(base64);
            setAudioUrl(null);
            setShowPreview(false);
          };
          reader.readAsDataURL(blob);
        });
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
