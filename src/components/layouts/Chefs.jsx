import { Typography } from "@material-tailwind/react";
import ChiefItems from "../common/ChefsContent";

export default function ChiefsSection() {
  return (
    <>
      <div className="bg-gray-100 w-full mt-3 ">
        <Typography
          variant="h4"
          className="text-gray-700 text-3xl font-bold text-center p-5 "
        >
          Meet Our Chefs
        </Typography>
        <ChiefItems />
      </div>
    </>
  );
}
