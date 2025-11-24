import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CollegeBannerCarousel({ slides = [] }) {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-100 overflow-hidden bg-black rounded-xl shadow-lg ">
      {/* Slide Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Banner Text */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4 backdrop-blur-xs">
            <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg text-center">
              {slide.title}
            </h2>
            <p className="text-sm md:text-lg mt-2 text-center max-w-2xl opacity-90">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md p-2 rounded-full"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md p-2 rounded-full"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-white scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


