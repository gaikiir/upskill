// src/components/Hero.jsx
import { Card } from "@material-tailwind/react";

export default function HeroCompo({ title, subtitle, image }) {
  return (
    <>
      <Card className="w-full max-w-6xl mx-auto min-h-80 hero rounded-lg shadow-xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Left: text - takes half the space */}
          <div className="flex-1 flex flex-col justify-center  text-left text-black capitalize ">
            {title && <h1 className="text-sm font-bold  mb-1">{title}</h1>}
            {subtitle && (
              <h4 className="mt-3 text-lg max-w-lg font-bolder">{subtitle}</h4>
            )}
          </div>
          {/* Right: image - takes half the space */}
          {image && (
            <div className="flex-1 flex justify-center items-center">
              {/* responsive heights per breakpoint for stable layout */}
              <img
                src={image}
                alt="hero"
                className="w-full object-cover rounded-xl shadow-lg h-[160px] sm:h-[200px] md:h-[260px] lg:h-[320px]"
              />
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
