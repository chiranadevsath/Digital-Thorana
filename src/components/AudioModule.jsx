// components/AudioModule.jsx
import React, { useState, useEffect, useRef } from "react";
import "./AudioModule.css";

const AudioModule = ({
  audioSrc, // Can be URL or base64 string
  autoPlay = true,
  loop = true,
  showControls = true,
  volume = 0.5,
  onPlay = null,
  onPause = null,
  onError = null,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = currentVolume;
      audioRef.current.loop = loop;

      if (autoPlay) {
        // Try to play, handle browser autoplay policies
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
            if (onError) onError(error);
          });
        }
      }
    }
  }, [autoPlay, loop, currentVolume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      if (onPause) onPause();
    } else {
      audioRef.current.play();
      if (onPlay) onPlay();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setCurrentVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = currentVolume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  if (!showControls) {
    return (
      <audio
        ref={audioRef}
        src={audioSrc}
        autoPlay={autoPlay}
        loop={loop}
        style={{ display: "none" }}
      />
    );
  }

  return (
    <div className="audio-module">
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        style={{ display: "none" }}
      />
      <div className="audio-controls">
        <button
          className="audio-btn play-btn"
          onClick={togglePlay}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button
          className="audio-btn mute-btn"
          onClick={toggleMute}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        <input
          type="range"
          className="volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : currentVolume}
          onChange={handleVolumeChange}
          title="Volume"
        />

        <div className="audio-label">
          <span className="audio-icon">🎵</span>
          <span className="audio-text">Background Music</span>
        </div>
      </div>
    </div>
  );
};

// Hook for programmatic audio control
export const useAudio = (
  audioSrc,
  autoPlay = true,
  loop = true,
  volume = 0.5,
) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    audioRef.current.loop = loop;
    audioRef.current.volume = volume;

    if (autoPlay) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc, autoPlay, loop]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setVolume = (vol) => {
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const mute = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const unmute = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    }
  };

  return {
    play,
    pause,
    toggle,
    setVolume,
    mute,
    unmute,
    isPlaying,
    isMuted,
    audioRef,
  };
};

export default AudioModule;
