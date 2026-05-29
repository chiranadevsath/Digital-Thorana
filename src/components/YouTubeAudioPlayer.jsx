// components/YouTubeAudioPlayer.jsx
import React, { useEffect, useRef, useState } from "react";
import "./YouTubeAudioPlayer.css";

const YouTubeAudioPlayer = ({ videoId, autoPlay = true, volume = 30 }) => {
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Load YouTube API script
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-audio-player", {
        height: "0",
        width: "0",
        videoId: videoId,
        playerVars: {
          autoplay: 0, // Don't autoplay initially
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
        },
      });
    };
  }, [videoId]);

  const onPlayerReady = (event) => {
    setIsReady(true);
    event.target.setVolume(currentVolume);

    // Try to play only after user interaction OR if on mobile with explicit permission
    if (autoPlay && !isMobileDevice()) {
      const playPromise = event.target.playVideo();
      if (playPromise) {
        playPromise.catch(() => {
          console.log("Autoplay blocked - waiting for user interaction");
          showMobileAutoplayHint();
        });
      }
    }
  };

  const onPlayerStateChange = (event) => {
    setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
  };

  const onPlayerError = (event) => {
    console.error("YouTube Player Error:", event.data);
  };

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  };

  const showMobileAutoplayHint = () => {
    // Show a subtle hint that user needs to tap
    const hint = document.createElement("div");
    hint.className = "mobile-autoplay-hint";
    hint.innerHTML = "🎵 Tap anywhere to play music";
    document.body.appendChild(hint);
    setTimeout(() => hint.remove(), 3000);
  };

  const handlePlayPause = () => {
    if (!hasUserInteracted) setHasUserInteracted(true);

    if (playerRef.current && isReady) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setCurrentVolume(newVolume);
    if (playerRef.current && isReady) {
      playerRef.current.setVolume(newVolume);
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    if (playerRef.current && isReady) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="youtube-audio-player">
      {/* Hidden YouTube player (0x0 pixels) */}
      <div
        id="youtube-audio-player"
        style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
      ></div>

      <div className="audio-controls">
        <button
          className={`control-btn play-btn ${!isReady ? "disabled" : ""}`}
          onClick={handlePlayPause}
          disabled={!isReady}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button
          className="control-btn mute-btn"
          onClick={handleMuteToggle}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        <input
          type="range"
          className="volume-slider"
          min="0"
          max="100"
          value={currentVolume}
          onChange={handleVolumeChange}
          disabled={!isReady}
        />

        <div className="audio-status">
          {!isReady && <span className="status-loading">Loading...</span>}
          {isReady && isPlaying && (
            <span className="status-playing">♪ Playing</span>
          )}
          {isReady && !isPlaying && (
            <span className="status-paused">⏸ Paused</span>
          )}
        </div>
      </div>

      {/* Mobile overlay - ensures first tap starts audio */}
      {isMobileDevice() && !hasUserInteracted && isReady && !isPlaying && (
        <div className="mobile-play-overlay" onClick={handlePlayPause}>
          <span>🎵 Tap to Play Music</span>
        </div>
      )}
    </div>
  );
};

export default YouTubeAudioPlayer;
