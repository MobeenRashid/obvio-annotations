/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import cn from 'clsx';
import Button from './button';

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  className?: string;
}

const VideoPlayer = ({
  src = 'https://www.w3schools.com/html/mov_bbb.mp4',
  poster,
  className,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    setIsPlaying(false);
    setShowPlayButton(true);
  }, [src]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setTimeout(() => setShowPlayButton(false), 2000);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={cn(
        'relative w-full h-fit max-h-[400px] md:max-h-[600px] rounded-lg',
        className,
        {
          'bg-blue-950': isLoading,
        }
      )}
      onMouseOver={() => {
        setShowPlayButton(true);
      }}
      onMouseLeave={() => {
        if (isPlaying) {
          setShowPlayButton(false);
        }
      }}
    >
      <video
        ref={videoRef}
        className="w-fit h-fit rounded-lg"
        src={src}
        preload="auto"
        onLoadStart={() => {
          setIsLoading(true);
          setCanPlay(false);
        }}
        onWaiting={() => {
          setIsLoading(true);
          setCanPlay(false);
        }}
        onCanPlay={() => {
          setIsLoading(false);
          setCanPlay(true);
        }}
        onError={() => {
          setIsLoading(false);
          setError(true);
          setCanPlay(false);
        }}
      />
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-xl">Loading...</span>
        </div>
      ) : null}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-xl">Error loading video</span>
        </div>
      ) : null}
      {poster ? (
        <img
          src={poster}
          className="w-full h-auto object-cover"
          alt="Video poster"
        />
      ) : null}

      {canPlay ? (
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center transition-all ease-in-out duration-200',
            {
              'opacity-0': !showPlayButton,
              'opacity-100': showPlayButton,
            }
          )}
        >
          <Button
            onClick={togglePlay}
            className="!bg-white hover:!bg-gray-200 !text-gray-900 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" /> Play
              </>
            )}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default VideoPlayer;
