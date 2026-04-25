import { Typography } from "@material-tailwind/react";
import Model from "../utilities/Model";

export default function FeaturesIcons({
  title,
  size = 56,
  color = "currentColor",
}) {
  const icons = [
    {
      name: "Coffee",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-coffee"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />
          <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
          <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
          <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5" />
          <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
        </svg>
      ),
    },
    {
      name: "Hot Coffee",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-cup"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 11h14v-3h-14l0 3" />
          <path d="M17.5 11l-1.5 10h-8l-1.5 -10" />
          <path d="M6 8v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1" />
          <path d="M15 5v-2" />
        </svg>
      ),
    },
    {
      name: "Champagne",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-glass-champagne"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 21h6" />
          <path d="M12 16v5" />
          <path d="M8 5a4 2 0 1 0 8 0a4 2 0 1 0 -8 0" />
          <path d="M8 5c0 6.075 1.79 11 4 11s4 -4.925 4 -11" />
        </svg>
      ),
    },
    {
      name: "Pizza",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-pizza"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 21.5c-3.04 0 -5.952 -.714 -8.5 -1.983l8.5 -16.517l8.5 16.517a19.09 19.09 0 0 1 -8.5 1.983" />
          <path d="M5.38 15.866a14.94 14.94 0 0 0 6.815 1.634a14.944 14.944 0 0 0 6.502 -1.479" />
          <path d="M13 11.01v-.01" />
          <path d="M11 14v-.01" />
        </svg>
      ),
    },
  ];

  return (
    <Model>
      <div className="feature-icons">
        {title && (
          <Typography
            variant="h2"
            className="text-2xl text-white font-semibold text-center mb-8"
          >
            {title}
          </Typography>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {icons.map((icon, index) => (
            <div
              key={index}
              className="animate-fade-in-up group flex flex-col items-center justify-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
                {icon.svg}
              </div>
              <span className="text-sm font-medium text-white group-hover:text-orange-200 transition-colors duration-300">
                {icon.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      < style jsx="true">{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </Model>
  );
}
