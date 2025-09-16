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
      className={cn('relative mx-auto rounded-lg bg-blue-950', className)}
      onMouseOver={() => {
        setShowPlayButton(true);
      }}
      onMouseLeave={() => {
        if (isPlaying) {
          setShowPlayButton(false);
        }
      }}
    >
      <video ref={videoRef} className="w-full rounded-lg" src={src}></video>
      {poster && (
        <img
          src={poster}
          className="w-full h-auto object-cover"
          alt="Video poster"
        />
      )}

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
    </div>
  );
};

export default VideoPlayer;
