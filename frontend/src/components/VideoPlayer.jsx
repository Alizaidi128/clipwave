import { useRef, useEffect } from "react";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.75 }
    );

    if (videoEl) observer.observe(videoEl);

    return () => {
      if (videoEl) observer.unobserve(videoEl);
    };
  }, []);

  return (
    <div className="relative w-full h-full pb-16"> 
      <video
        ref={videoRef}
        src={src}
        className="h-full w-full object-cover"
        loop
        muted
        playsInline
        controls
      />
    </div>
  );
};

export default VideoPlayer;
