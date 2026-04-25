import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";

export default function ActaBoxSection() {
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-12 text-center text-white shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-10"></div>
      <div className="relative z-10">
        <Typography variant="h3" className="mb-3 font-bold">
          Ready to Experience Excellence?
        </Typography>
        <Typography className="mb-8 text-gray-300">
          Join us for an unforgettable culinary journey.
        </Typography>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/menu")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transform hover:scale-105 transition-transform"
          >
            Explore Menu
          </Button>
          <Button
            onClick={() => navigate("/contact")}
            className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transform hover:scale-105 transition-transform"
          >
            Make a Reservation
          </Button>
        </div>
      </div>
    </section>
  );
}
