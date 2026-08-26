
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronRight ,ChevronLeft} from 'lucide-react';
import { product_images } from "../../constants";
const Product = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const slides = [
    {
      image: product_images[selectedColor].images[0],
      content:"AirPods Max are designed for an unequaled comfort that creates the optimal acoustic seal — fully immersing you in every sound."
    },
    {
      image: product_images[selectedColor].images[1],
      content:"The telescoping arms smoothly extend from the stainless steel frame — staying where you set them for a consistent fit and seal."
    },
    {
      image: product_images[selectedColor].images[2],
      content:"Press the Digital Crown to play and pause music, take a photo or video, or mute and unmute yourself on calls. Press twice to skip between tracks or end calls, or turn it to precisely control volume.4"
    },
    {
      image: product_images[selectedColor].images[3],
      content:"The canopy spanning the headband is made from a breathable knit mesh, distributing weight to reduce on‑head pressure."
    },
    {
      image: product_images[selectedColor].images[4],
      content:"The cushions are crafted with acoustically engineered memory foam and a custom-designed mesh textile — creating a fit that is the foundation of incredible sound."
    },
    {
      image: product_images[selectedColor].images[5],
      content:"The beautifully anodized aluminum cups feature a mechanism that allows each cup to rotate independently and balance pressure."
    }
  ];

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);

    if (cards.length === 0) return;

    // New color starts slightly down and invisible
    gsap.fromTo(
      cards,
      {
        filter: "blur(5px)",
        opacity: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 2,
        ease: "power3.out",
      },
    );

    // Reset slider position
    gsap.set(trackRef.current, {
      x: 0,
    });

    setActiveIndex(0);
  }, [selectedColor]);

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    const firstCard = cardRefs.current[0];
    const targetCard = cardRefs.current[index];

    if (!track || !firstCard || !targetCard) return;

    gsap.to(track, {
      x: -(targetCard.offsetLeft - firstCard.offsetLeft),
      duration: 0.8,
      ease: "power3.inOut",
      overwrite: true,
    });

    setActiveIndex(index);
  };

  const changeSlide = (direction: number) => {
    const nextIndex =
      (activeIndex + direction + slides.length) % slides.length;

    goToSlide(nextIndex);
  };

  return (
    <div className="relative">
      <div>
        <h1 className="text-6xl font-bold px-10 mt-6">Take a closer look.</h1>
      </div>

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max">
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className="w-[700px] h-full px-10 py-6"
          >
          <div>
            <img src={slide.image} alt="Image 1" className="w-full h-full" />
          </div>
          <div>
            <p className="text-lg text-gray-500 font-semibold">
              {slide.content}
            </p>
          </div>
        </div>
        ))}
        </div>
      </div>

      <div className="flex items-center justify-end px-10">
        <div className="flex items-center justify-center gap-4 py-4">
        <button
          className="apple px-4 py-2 rounded-full cursor-pointer"
          type="button"
          aria-label="Previous product card"
          onClick={() => changeSlide(-1)}
        >
          <ChevronLeft />
        </button>
        <button
          className="apple px-4 py-2 rounded-full cursor-pointer"
          type="button"
          aria-label="Next product card"
          onClick={() => changeSlide(1)}
        >
          <ChevronRight />
        </button>
      </div>
      </div>

      <div className="flex items-center justify-center absolute -bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="apple rounded-4xl gap-2 px-6 py-4 flex items-center justify-center gap-4">
          <div className={`w-6 h-6 rounded-full bg-[#22252a] border border-solid  cursor-pointer ${selectedColor === 0 ? 'border-blue' : ''}`} onClick={()=>setSelectedColor(0)}></div>
          <div className={`w-6 h-6 rounded-full bg-[#91a9b5] border border-solid  cursor-pointer ${selectedColor === 1 ? 'border-blue' : ''}`} onClick={()=>setSelectedColor(1)}></div>
          <div className={`w-6 h-6 rounded-full bg-[#e2a48d]  border border-solid  cursor-pointer ${selectedColor === 2 ? 'border-blue' : ''}`} onClick={()=>setSelectedColor(2)}></div>
          <div className={`w-6 h-6 rounded-full bg-[#afa6bb] border border-solid  cursor-pointer ${selectedColor === 3 ? 'border-blue' : ''}`} onClick={()=>setSelectedColor(3)}></div>
          <div className={`w-6 h-6 rounded-full bg-[#ccbeb1] border border-solid  cursor-pointer ${selectedColor === 4 ? 'border-blue' : ''}`} onClick={()=>setSelectedColor(4)}></div>
        </div>
      </div>
    </div>
  );
}

export default Product