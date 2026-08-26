import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { features } from "../../constants"
import { ChevronRight ,ChevronLeft} from 'lucide-react';

const Features = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const trackRef = useRef<HTMLDivElement | null>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const maxIndex = Math.max(0, features.length - 3)

    const goToSlide = (index: number) => {
        const firstCard = cardRefs.current[0]
        const targetCard = cardRefs.current[index]

        if (!trackRef.current || !firstCard || !targetCard) return

        gsap.to(trackRef.current, {
            x: -(targetCard.offsetLeft - firstCard.offsetLeft),
            duration: 0.8,
            ease: "power3.inOut",
            overwrite: true,
        })
        setActiveIndex(index)
    }

    useLayoutEffect(() => {
        if (!sectionRef.current || !trackRef.current) return

        const context = gsap.context(() => {
            gsap.fromTo(
                trackRef.current,
                { opacity: 0, y: 32 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            )
        }, sectionRef)

        return () => context.revert()
    }, [])

  return (
        <div ref={sectionRef} className="px-10 py-10 ">
        <div className="flex items-center justify-center text-center">
            <h2 className="text-5xl font-bold ">Effortless.<br/>With encore-ready power.</h2>
        </div>

                <div className="mt-10 overflow-hidden">
                    <div ref={trackRef} className="flex w-full gap-8 will-change-transform">
            {features.map((feature) => (
                                <div
                                    key={feature.id}
                                    ref={(element) => {
                                        cardRefs.current[feature.id - 1] = element
                                    }}
                                    className="mb-10 relative w-[calc((100%-4rem)/3)] shrink-0"
                                >
                    <img src={feature.image} alt="Feature" className="w-full h-auto mb-4 rounded-3xl" />
                    {feature.spaecial?(
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-4xl py-2  rounded-full">
                            {feature.spaecial}
                        </div>
                    ): null}
                    <p className="text-lg">{feature.content}</p>
                </div>
            ))}
                    </div>
                </div>

                <div className="mt-2 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        aria-label="Previous features"
                        onClick={() => goToSlide(activeIndex - 1)}
                        disabled={activeIndex === 0}
                        className="cursor-pointer rounded-full apple px-3 text-2xl disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <ChevronLeft/>
                    </button>
                    <div className="apple rounded-full px-6 py-2 flex items-center justify-center">
                        {Array.from({ length: maxIndex + 1 }, (_, index) => (
                        <button
                            key={index}
                            type="button"
                            aria-label={`Go to feature slide ${index + 1}`}
                            onClick={() => goToSlide(index)}
                            className="flex h-8 w-10 cursor-pointer items-center justify-center"
                        >
                            <span
                                className="block h-2 rounded-full bg-gray-500 transition-[width] duration-300"
                                style={{ width: index === activeIndex ? "32px" : "8px" }}
                            />
                        </button>
                    ))}
                    </div>
                    <button
                        type="button"
                        aria-label="Next features"
                        onClick={() => goToSlide(activeIndex + 1)}
                        disabled={activeIndex === maxIndex}
                        className="cursor-pointer apple rounded-full px-3 text-2xl disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <ChevronRight />
                    </button>
        </div>
    </div>
  )
}

export default Features