import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const AudioPlayer = ({ audioUrl, title, autoplay = false }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // When audioUrl changes and exists, and autoplay is true, play the audio
    if (audioUrl && audioRef.current && autoplay) {
      const playAudio = () => {
        audioRef.current.play().catch((error) => {
          console.error("Auto-play failed:", error);
        });
      };

      if (audioRef.current.readyState >= 3) {
        // If audio is already loaded, play it
        playAudio();
      } else {
        // Wait for the audio to be loaded
        audioRef.current.addEventListener("canplay", playAudio, { once: true });
      }
    }
  }, [audioUrl]);

  if (!audioUrl) return null;

  return (
    <AudioWrapper>
      {title && <Title>{title}</Title>}
      <audio ref={audioRef} controls src={audioUrl} />
    </AudioWrapper>
  );
};

export default AudioPlayer;

const AudioWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  audio {
    width: 240px;
    height: 40px;
  }
`;

const Title = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
`;
