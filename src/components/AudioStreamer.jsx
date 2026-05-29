// components/AudioStreamer.jsx
import React, { useState, useEffect } from "react";
import { useYTAudio } from "use-ytaudio";
import "./AudioStreamer.css";

const AudioStreamer = ({
  videoUrl,
  autoPlay = true,
  initialVolume = 30,
  showControls = true,
  onPlay = null,
  onPause = null,
  onEnd = null,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    containerRef,
    play,
    pause,
    stop,
    isReady,
    isPlaying,
    currentTime,
    duration,
    volume,
    setVolume,
    isError,
  } = useYTAudio({
    url: videoUrl,
    autoplay: autoPlay,
    initialVolume: initialVolume,
    loop: false,
  });

  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle play/pause
  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
      if (onPause) onPause();
    } else {
      play();
      if (onPlay) onPlay();
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
  };

  // Handle end of track
  useEffect(() => {
    if (
      isReady &&
      !isPlaying &&
      currentTime > 0 &&
      currentTime >= duration - 0.5
    ) {
      if (onEnd) onEnd();
    }
  }, [isPlaying, currentTime, duration, isReady, onEnd]);

  if (!showControls) {
    return (
      <>
        <div ref={containerRef} style={{ display: "none" }} />
        {isError && (
          <div className="audio-error-toast">
            ⚠️ Unable to load audio. Please check the URL.
          </div>
        )}
      </>
    );
  }

  return (
    <div className={`audio-streamer ${isExpanded ? "expanded" : ""}`}>
      {/* Hidden YouTube container */}
      <div
        ref={containerRef}
        style={{ width: 0, height: 0, overflow: "hidden" }}
      />

      <div className="audio-streamer-content">
        {/* Toggle expand button */}
        <button
          className="streamer-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? "Minimize" : "Expand"}
        >
          {isExpanded ? "▼" : "▲"}
        </button>

        {/* Main controls */}
        <div className="streamer-controls">
          <button
            className="control-btn play-pause"
            onClick={handlePlayPause}
            disabled={!isReady || isError}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button
            className="control-btn stop"
            onClick={stop}
            disabled={!isReady || isError}
            title="Stop"
          >
            ⏹
          </button>

          <div className="time-display">
            <span className="current-time">{formatTime(currentTime)}</span>
            <span className="time-separator">/</span>
            <span className="duration">{formatTime(duration)}</span>
          </div>

          <div className="volume-control">
            <span className="volume-icon">🔊</span>
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              disabled={!isReady}
            />
          </div>
        </div>

        {/* Status indicators */}
        <div className="streamer-status">
          {!isReady && !isError && (
            <span className="status-loading">Loading...</span>
          )}
          {isError && (
            <span className="status-error">⚠️ Error loading audio</span>
          )}
          {isReady && isPlaying && (
            <span className="status-playing">🎵 Playing</span>
          )}
          {isReady && !isPlaying && currentTime === 0 && (
            <span className="status-ready">Ready</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioStreamer;
