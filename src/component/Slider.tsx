import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { imageslider } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

export default function ImageSlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const indicatorRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const goToSlide = (index: number) => {
    if (!sliderRef.current) return;

    const cards = sliderRef.current.children;

    const targetCard = cards[index] as HTMLElement;
    const firstCard = cards[0] as HTMLElement;

    if (!targetCard || !firstCard) return;

    // Calculate exact target position
    const targetX = -(targetCard.offsetLeft - firstCard.offsetLeft);

    // Kill previous animations
    gsap.killTweensOf(sliderRef.current);
    gsap.killTweensOf(cardRefs.current);
    gsap.killTweensOf(indicatorRefs.current);

    // -----------------------------------------
    // Smooth slider movement
    // -----------------------------------------

    gsap.to(sliderRef.current, {
      x: targetX,
      duration: 1.3,
      ease: "power4.inOut",
      overwrite: true,
    });

    // -----------------------------------------
    // Card animation
    // -----------------------------------------

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      const distance = Math.abs(i - index);

      gsap.to(card, {
        scale: i === index ? 1 : 0.94,
        opacity: distance > 1 ? 0.65 : 1,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });
    });

    // -----------------------------------------
    // Indicator animation
    // -----------------------------------------

    indicatorRefs.current.forEach((indicator, i) => {
      if (!indicator) return;

      gsap.to(indicator, {
        width: i === index ? 48 : 16,
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      });
    });

    setActiveIndex(index);
  };

  useLayoutEffect(() => {
    if (!sectionRef.current || !sliderRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(sliderRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.96,
      });

      gsap.to(sliderRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });

      const indicator = document.getElementById("indicator-container");
      if (!indicator) return;

      gsap.set(indicator, {
        autoAlpha: 0,
        y: 24,
        position: "fixed",
        left: "50%",
        bottom: 24,
        xPercent: -50,
        zIndex: 50,
      });

      const showIndicator = () => {
        gsap.to(indicator, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const hideIndicator = () => {
        gsap.to(indicator, {
          autoAlpha: 0,
          y: 24,
          duration: 0.35,
          ease: "power3.in",
          overwrite: true,
        });
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: showIndicator,
        onLeave: hideIndicator,
        onEnterBack: showIndicator,
        onLeaveBack: hideIndicator,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-20">

      <div className="flex items-center justify-start w-full h-full px-10 py-4">
        <h1 className="text-6xl font-bold text-center">Take a closer look.</h1>
      </div>
      <div
        ref={sliderRef}
        className="
          flex
          w-max
          gap-6
          px-6
          will-change-transform
        "
      >
        {imageslider.map((image, index) => (
          <div
            key={index}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className="
              h-[800px]
              w-[1000px]
              shrink-0
              relative
              overflow-hidden
              rounded-3xl
              will-change-transform
            "
          >
            <img
              src={image.image}
              alt={`Slide ${index + 1}`}
              draggable={false}
              className="
                h-full
                w-full
                select-none
                object-cover
              "
            />

            <div className={image.position + " px-6 py-4 max-w-md"}>
              <h2 className="text-4xl text-black/80 font-semibold">
                {image.content}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center w-full" id="indicator-container">
        <div
          className="
            apple
            border-2
            border-blue-500
            flex
            h-16
            w-72
            items-center
            justify-center
            rounded-full
            px-4
          "
        >
          {imageslider.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
              className="
                flex
                w-12
                cursor-pointer
                items-center
                justify-center
                rounded-full
              "
            >
              <span
                ref={(element) => {
                  indicatorRefs.current[index] = element;
                }}
                className="
                  block
                  h-[16px]
                  rounded-full
                  bg-gray-500
                  hover:size-4
                "
                style={{
                  width: index === activeIndex ? "48px" : "8px",
                  transition: "width 0.5s ease-in-out",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
