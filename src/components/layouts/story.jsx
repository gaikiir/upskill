import { Typography } from "@material-tailwind/react";


export default function Story() {
  return (
    <section className="grid gap-12 lg:grid-cols-3 items-center">
      <div className="lg:col-span-2 space-y-4">
        <Typography variant="h3" className="font-bold text-gray-700">
          The Heart of Ubarn Utopia
        </Typography>
        <Typography className="text-gray-700 leading-relaxed text-left">
          Ubarn Utopia was born from a simple belief: great food brings people
          together. What started as a dream in a small kitchen has grown into a
          thriving restaurant beloved by our community.
        </Typography>
        <Typography className="text-gray-700 leading-relaxed text-left">
          Every day, our team works tirelessly to ensure that each dish served
          reflects our commitment to quality and care. We partner with local
          farmers and suppliers who share our values, ensuring that every
          ingredient tells a story.
        </Typography>
      </div>
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
        <Typography variant="h6" className="mb-6 font-bold text-gray-700">
          Why Choose Us?
        </Typography>
        <ul className="space-y-3">
          {[
            "Locally-sourced, fresh ingredients",
            "Exceptional customer service",
            "Sustainable practices",
            "Crafted with passion",
          ].map((item, index) => (
            <li key={index} className="flex gap-3 items-start group">
              <span className="text-orange-500 font-bold text-lg flex-shrink-0 group-hover:scale-125 transition-transform">
                ✓
              </span>
              <span className="text-gray-700 group-hover:text-orange-600 transition-colors">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
