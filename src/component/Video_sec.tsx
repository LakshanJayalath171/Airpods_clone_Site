import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animated_video } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const Video_sec = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

        const itemDuration = 1 / animated_video.length;
        const fadeDuration = itemDuration * 0.22;

        itemRefs.current.forEach((item, index) => {
          if (!item) return;

          const start = index * itemDuration;
          gsap.set(item, { opacity: 0, y: 40 });

          timeline
            .to(
              item,
              { opacity: 1, y: 0, duration: fadeDuration, ease: "power2.out" },
              start,
            )
            .to(
              item,
              { opacity: 0, y: -24, duration: fadeDuration, ease: "power2.in" },
              start + itemDuration - fadeDuration,
            );
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
    <div>
      <div className="flex items-center justify-center w-full h-full px-10 py-4">
        <div><h1 className="text-6xl font-bold text-white text-center">
          Superior sound down to a science.
        </h1>
        <p className="text-white text-center font-semibold">
          Transformed by the H2 chip, AirPods Max 2 deliver more stunningly detailed, high‑fidelity audio. A new high dynamic range amplifier<br/> adds even more headroom used by the custom‑built driver to reveal richer bass, more natural vocals, and precise instrument <br/>localization across a wider soundstage.</p></div>
      </div>
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
          {animated_video.map((item, index) => (
            <div
              key={item.content}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              className={`absolute ${item.position} z-10 w-96 opacity-0`}
            >
              <img src={item.icon.replace("/public", "")} alt="" className="h-12 w-14" />
              <h2 className="text-white text-2xl font-bold">{item.content}</h2>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Video_sec;