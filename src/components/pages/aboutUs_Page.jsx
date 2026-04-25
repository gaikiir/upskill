import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Container } from "../layouts/Container";
import CoreValues from "../layouts/core_values";
import ActaBoxSection from "../layouts/cta_box_section";
import Story from "../layouts/story";
import Tabs from "../layouts/tabs";
import TimeLineCard from "../layouts/timeLine";
export default function AboutUsPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="w-full space-y-20">
        {/* Hero Section */}
        <section className=" flex  items-center">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center w-full">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
                Welcome to Ubarn Utopia
              </div>
              <Typography className="text-lg text-gray-600 leading-relaxed text-left">
                A culinary haven where tradition meets innovation. We're
                dedicated to delivering unforgettable dining experiences through
                quality, passion, and excellence.
              </Typography>
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => navigate("/menu")}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-all"
                >
                  Explore Menu
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/contact")}
                  className="border-2 border-gray-300 text-gray-700 hover:border-orange-500 font-bold py-3 px-8 rounded-lg transition-all"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="relative h-96 animate-slide-in-right">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400 to-green-600 opacity-10 blur-3xl"></div>
              <div className="relative rounded-3xl bg-gradient-to-br from-green-200 to-green-50 h-96 flex items-center justify-center hover:shadow-3xl transition-shadow duration-500">
                {/* <span className="">🍽️</span> */}

                <img
                  className="animate-bounce-slow object-cover w-52 h-52"
                  src="images/french_fries.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        {/* Mission & Vision Tab Section */}
        <Tabs />
        {/* Core Values */}
        <CoreValues />
        {/* Timeline */}
        <TimeLineCard />
        {/* Story & Why Choose Us */}
        <Story />
        {/* CTA Section */}
        <ActaBoxSection />
      </div>
    </Container>
  );
}
