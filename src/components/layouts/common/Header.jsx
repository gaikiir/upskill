// src/components/Hero.jsx
import { Card } from "@material-tailwind/react";

export default function HeaderCompo({ title, subtitle, image }) {
  return (
    <>
      <Card className="w-full max-w-7xl mx-auto min-h-40 hero rounded-none mt-5 p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Left: text - takes half the space */}
          <div className="flex-1 flex flex-col justify-center text-left text-black capitalize">
            {title && <h1 className="text-sm font-bold mb-1">{title}</h1>}
            {subtitle && (
              <h4 className="mt-3 text-lg max-w-lg font-bolder">{subtitle}</h4>
            )}
          </div>
          {/* Right: image - takes half the space */}
          {image && (
            <div className="flex-1 flex justify-center items-center rounded-none">
              {/* Added bg and padding for better fit */}
              <img
                src={image}
                alt="hero"
                className="max-w-full h-[160px] sm:h-[200px] md:h-[260px] lg:h-[320px] object-contain rounded-none shadow-none" // Changed to object-contain, removed w-full for more flexibility
              />
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
