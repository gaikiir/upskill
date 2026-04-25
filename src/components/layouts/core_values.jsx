import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import BtnAction from "../utilities/button";

const values = [
  {
    id: 1,
    urlImage: "images/cake.jpg",
    title: "Quality First",
    description:
      "We source only the freshest, locally-sourced ingredients for every dish",
  },
  {
    id: 2,
    urlImage: "images/friedfish.jpg",
    title: "Customer Focused",
    description:
      "Your satisfaction is our priority, with exceptional service every visit",
  },
  {
    id: 3,
    urlImage: "images/shixugang-coffee-bg.jpg",
    title: "Sustainability",
    description:
      "Committed to eco-friendly practices and supporting local farmers",
  },
  {
    id: 4,
    urlImage: "images/fried-chicken.jpg",
    title: "Passion",
    description: "Every meal is crafted with love and attention to detail",
  },
];

export default function CoreValues() {
  return (
    <section className="space-y-12">
      <Typography
        variant="h3"
        className="mb-12 text-center font-bold text-gray-700"
      >
        What We Stand For
      </Typography>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((item, index) => (
          <Card
            key={item.id}
            style={{ animationDelay: `${index * 150}ms` }}
            className="animate-fade-in-up overflow-hidden group rounded-none bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={item.urlImage}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
            </div>

            {/* Body */}
            <CardBody className="text-center px-4 py-3">
              <Typography variant="h6" className="font-bold text-gray-700">
                {item.title}
              </Typography>
              <Typography className="text-sm text-gray-600 leading-relaxed mt-1">
                {item.description}
              </Typography>
            </CardBody>

            <CardFooter className="pt-0 flex justify-center">
              <BtnAction
                text="Learn more"
                onclick={() => console.log("learn more click")}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

/*


<Typography
        variant="h3"
        className="mb-12 text-center font-bold text-gray-700"
      >
        What We Stand For
      </Typography>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => (
          <div
            key={index}
            className="group rounded-2xl bg-white border border-gray-200 p-8 shadow-md hover:shadow-xl hover:border-orange-500 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="mb-4 block text-5xl group-hover:scale-110 transition-transform duration-300">
              {value.icon}
            </span>
            <Typography variant="h6" className="mb-2 font-bold text-gray-900">
              {value.title}
            </Typography>
            <Typography className="text-sm text-gray-600 leading-relaxed">
              {value.description}
            </Typography>
          </div>
        ))}
      </div>



*/
