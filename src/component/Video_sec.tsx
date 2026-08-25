import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Video_sec = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let animationContext: gsap.Context | undefined;

    const createTimeline = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      video.pause();
      animationContext?.revert();

      animationContext = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        });

        timeline.to(video, {
          currentTime: video.duration,
          duration: 1,
          ease: "none",
        });
      }, section);
    };

    createTimeline();
    video.addEventListener("loadedmetadata", createTimeline);

    return () => {
      video.removeEventListener("loadedmetadata", createTimeline);
      animationContext?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src="/Videos/Feature.mp4"
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </section>
  );
};

export default Video_sec;