"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface CinematicVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
}

export function CinematicVideoPlayer({
  src,
  poster,
  title = "Founder Film",
}: CinematicVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  const toggleMute = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }, []);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration) setProgress(v.currentTime / v.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = e.currentTarget;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      data-cursor="video"
      className={`relative w-full mx-auto overflow-hidden bg-cinema-black group ${
        isFullscreen ? "max-w-none aspect-auto rounded-none" : "max-w-sm aspect-[9/16] rounded-2xl"
      } ${hovered ? "red-glow" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full cursor-pointer ${
          isFullscreen ? "object-contain" : "object-cover"
        }`}
        playsInline
        onClick={togglePlay}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() =>
          setDuration(videoRef.current?.duration ?? 0)
        }
        onEnded={() => setPlaying(false)}
      >
        <source src={src} />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/80 via-transparent to-cinema-black/30 pointer-events-none" />

      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          data-cursor="magnetic"
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-cinema-black/40 backdrop-blur-[2px] transition-opacity z-10"
          aria-label={`Play ${title}`}
        >
          <span className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-cinema-red flex items-center justify-center red-glow group-hover:scale-105 transition-transform duration-500">
            <span className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-pure-white border-b-[10px] border-b-transparent ml-1" />
          </span>
          <span className="text-label text-pure-white">Press to Play</span>
        </button>
      )}

      <div
        className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-cinema-black to-transparent transition-opacity z-20 ${
          playing || hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-4 mb-3">
          <button
            type="button"
            onClick={togglePlay}
            data-cursor="magnetic"
            className="text-label text-pure-white hover:text-cinema-red transition-colors"
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            data-cursor="magnetic"
            className="text-label text-pure-white hover:text-cinema-red transition-colors"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            data-cursor="magnetic"
            className="text-label text-warm-muted hover:text-pure-white transition-colors ml-auto"
          >
            Fullscreen
          </button>
        </div>
        <div
          className="h-px bg-cinema-charcoal cursor-pointer relative group/bar"
          onClick={handleSeek}
          role="slider"
          aria-valuenow={progress * 100}
        >
          <div
            className="absolute inset-y-0 left-0 bg-cinema-red"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-warm-muted">
          <span>{formatTime(progress * duration)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
