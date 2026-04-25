import { Typography } from "@material-tailwind/react";
const timeline = [
  { year: "2015", event: "Founded with passion" },
  { year: "2018", event: "Expanded to new location" },
  { year: "2021", event: "Became community favorite" },
  { year: "2024", event: "Awarded Best Restaurant" },
];

export default function TimeLineCard() {
  return (
    <section>
      <Typography
        variant="h3"
        className="mb-12 text-center font-bold text-gray-900"
      >
        Our Journey
      </Typography>
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-orange-200 hidden lg:block"></div>
        <div className="grid gap-8 lg:grid-cols-2">
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`animate-fade-in-up ${index % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12"}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="rounded-xl bg-orange-50 p-6 hover:shadow-lg transition-shadow duration-300">
                <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-3">
                  {item.year}
                </span>
                <Typography className="text-gray-700 font-semibold">
                  {item.event}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

