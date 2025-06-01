import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

// Helper function to convert base64 to Blob URL
const base64ToBlobUrl = (base64Data) => {
  try {
    if (!base64Data) return null;

    // Extract the base64 part of the data URL if it's a full data URL
    const base64Content = base64Data.split(",")[1] || base64Data;
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "audio/mp3" });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error converting base64 to Blob URL:", error);
    return null;
  }
};

const AudioPlayer = ({
  audioUrl,
  title,
  autoplay = false,
  $isUser = false,
}) => {
  const audioRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const progressRef = useRef(null);

  // Handle base64 audio data
  useEffect(() => {
    if (!audioUrl) return;

    if (audioUrl.startsWith("data:audio/")) {
      const blobUrl = base64ToBlobUrl(audioUrl);
      setAudioSrc(blobUrl);
      return () => {
        if (blobUrl) URL.revokeObjectURL(blobUrl);
      };
    } else {
      setAudioSrc(audioUrl);
    }
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      if (progressRef.current) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressRef.current.style.width = `${progress}%`;
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (progressRef.current) {
        progressRef.current.style.width = "0%";
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    if (autoplay) {
      audio.play().catch((error) => {
        console.error("Auto-play failed:", error);
      });
    }

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioSrc, autoplay]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!audioSrc) return null;

  return (
    <AudioWrapper $isUser={$isUser}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      <PlayButton
        onClick={togglePlayPause}
        $isPlaying={isPlaying}
        $isUser={$isUser}
      >
        {isPlaying ? (
          <PauseIcon $isUser={$isUser} />
        ) : (
          <PlayIcon $isUser={$isUser} />
        )}
      </PlayButton>

      <ProgressBar $isUser={$isUser}>
        <ProgressFill ref={progressRef} $isUser={$isUser} />
      </ProgressBar>

      <TimeDisplay $isUser={$isUser}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </TimeDisplay>

      {title && <Title $isUser={$isUser}>{title}</Title>}
    </AudioWrapper>
  );
};

// Styled components
const AudioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 18px;
  background-color: ${({ $isUser }) =>
    $isUser ? "var(--color-light-blue-40)" : "var(--color-neutral-98)"};
  max-width: 280px;
  width: fit-content;
  margin: ${({ $isUser }) => ($isUser ? "0 0 0 auto" : "0 auto 0 0")};
`;

const PlayButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background-color: ${({ $isUser }) =>
    $isUser ? "var(--color-common-100)" : "var(--color-light-blue-40)"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: ${({ $isUser }) =>
      $isUser ? "var(--color-neutral-20)" : "var(--color-light-blue-50)"};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const PlayIcon = styled.div`
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 12px solid
    ${({ $isUser }) =>
      $isUser ? "var(--color-light-blue-40)" : "var(--color-common-100)"};
  margin-left: 2px;
  transition: border-color 0.2s;
`;

const PauseIcon = styled.div`
  position: relative;
  width: 12px;
  height: 16px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 3px;
    height: 100%;
    background-color: ${({ $isUser }) =>
      $isUser ? "var(--color-light-blue-40)" : "var(--color-common-100)"};
    transition: background-color 0.2s;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const ProgressBar = styled.div`
  flex-grow: 1;
  height: 4px;
  background-color: ${({ $isUser }) =>
    $isUser ? "rgba(255, 255, 255, 0.3)" : "var(--color-neutral-90)"};
  border-radius: 2px;
  overflow: hidden;
  margin: 0 8px;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: 0;
  background-color: ${({ $isUser }) =>
    $isUser ? "var(--color-common-100)" : "var(--color-light-blue-40)"};
  transition: width 0.1s linear;
`;

const TimeDisplay = styled.div`
  font-size: 12px;
  color: ${({ $isUser }) =>
    $isUser ? "var(--color-common-100)" : "var(--color-neutral-30)"};
  min-width: 70px;
  text-align: center;
  font-family: var(--font-family);
`;

const Title = styled.div`
  font-size: 12px;
  color: ${({ $isUser }) =>
    $isUser ? "var(--color-common-100)" : "var(--color-neutral-30)"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
  width: 100%;
  font-family: var(--font-family);
`;

export default AudioPlayer;
