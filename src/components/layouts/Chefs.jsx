import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";

const fakeData = [
  {
    id: 1,
    name: "Maria",
    specialty: "Italian Cuisine",
    description:
      "Highly skilled chef with a passion for creating exquisite dishes.",
    image:
      "https://cdn.pixabay.com/photo/2021/01/17/15/25/woman-5925427_1280.jpg",
    experience: "15+ Years",
  },
  {
    id: 2,
    name: "David",
    specialty: "Grill Master",
    description:
      "Seasoned chef with a passion for creating bold and flavorful dishes.",
    image:
      "https://cdn.pixabay.com/photo/2015/09/29/02/19/beer-963195_1280.jpg",
    experience: "12+ Years",
  },
  {
    id: 3,
    name: "James",
    specialty: "Modern Fusion",
    description:
      "Culinary artist known for his innovative approach to traditional dishes.",
    image:
      "https://cdn.pixabay.com/photo/2024/05/02/06/55/ai-generated-8733800_1280.png",
    experience: "10+ Years",
  },
  {
    id: 4,
    name: "Sarah",
    specialty: "International",
    description: "Passionate chef with a background in international cuisine.",
    image:
      "https://cdn.pixabay.com/photo/2019/02/04/22/05/chef-3975835_1280.jpg",
    experience: "14+ Years",
  },
];

export default function Chefs() {
  const [hoveredChef, setHoveredChef] = useState(null);
  const [selectedChef, setSelectedChef] = useState(null);

  return (
    // px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-orange-50
    <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-orange-50">
      <div className="w-full">
        {/* Header */}
        <div className="mb-16 text-center uppercase animate-fade-in">
          <div className="inline-block mb-4">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 text-sm font-bold">
              Culinary Excellence
            </span>
          </div>
          <Typography
            variant="h2"
            className="text-4xl md:text-2xl font-bold text-gray-700 mb-4  uppercase"
          >
            Meet Our Master Chefs
          </Typography>
          {/* create 3 dashes  */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className={`${i === 0 ? "bg-orange-500" : "bg-orange-300"} w-12 h-1 `}
              ></div>
            ))}
          </div>
        </div>

        {/* Chefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {fakeData.map((chef, index) => (
            <div
              key={chef.id}
              className="animate-fade-in-up group"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredChef(chef.id)}
              onMouseLeave={() => setHoveredChef(null)}
            >
              <div className="h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform ">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500"></div>

                  {/* Experience Badge */}
                  <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 text-xs font-bold">
                    {chef.experience}
                  </div>

                  {/* Hover Content */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-all duration-500 ${
                      hoveredChef === chef.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Button
                      onClick={() => setSelectedChef(chef)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 transition-transform hover:scale-110"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-2">
                  <div className="mb-3">
                    <span className="inline-block bg-gradient-to-r from-orange-100 to-orange-50 text-orange-600 text-xs font-bold px-3 py-1">
                      {chef.specialty}
                    </span>
                  </div>

                  <Typography
                    variant="h6"
                    className="font-bold text-gray-900 mb-2"
                  >
                    {chef.name}
                  </Typography>

                  <Typography className="text-gray-700 text- text-xs leading-relaxed mb-4">
                    {chef.description}
                  </Typography>

                  {/* Social Icons */}
                  <div
                    className={`flex justify-center gap-2 transition-all duration-300 ${
                      hoveredChef === chef.id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <button className="w-8 h-8 bg-orange-100 hover:bg-orange-500 text-orange-600 hover:text-white flex items-center justify-center text-xs transition-all duration-300 transform hover:scale-110">
                      f
                    </button>
                    <button className="w-8 h-8 bg-orange-100 hover:bg-orange-500 text-orange-600 hover:text-white flex items-center justify-center text-xs transition-all duration-300 transform hover:scale-110">
                      𝕏
                    </button>
                    <button className="w-8 h-8 bg-orange-100 hover:bg-orange-500 text-orange-600 hover:text-white flex items-center justify-center text-xs transition-all duration-300 transform hover:scale-110">
                      📷
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 p-10 text-center shadow-2xl">
          <Typography variant="h4" className="text-white font-bold mb-3">
            Want to Experience Our Chefs' Creations?
          </Typography>
          <Typography className="text-orange-50 mb-6">
            Reserve your table today and enjoy an unforgettable culinary journey
          </Typography>
          <Button className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-2 px-8 transition-transform hover:scale-105">
            Make a Reservation
          </Button>
        </div>
      </div>
    </section>
  );
}
