import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import BtnAction from "../utilities/button";

export default function CardProducts({
  urlImage,
  itemName = "Product Name",
  price = 0,
  originalPrice,
  rating = 4.9,
  preparationTime = "15 min",
  itemDescription = "Product description available on details page.",
  premium = false,
  onAction,
}) {
  const displayOriginalPrice = originalPrice ?? Number(price) * 1.15;

  return (
    <Card className="group relative cursor-pointer overflow-hidden rounded-none bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500  ">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <CardHeader
        className="relative m-0 h-44 overflow-hidden rounded-none"
        floated={false}
        shadow={false}
      >
        <img
          src={urlImage}
          alt={itemName}
          className="w-full h-full object-cover rounded-none transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {premium && (
          <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-pink-400 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            ⭐ PREMIUM
          </div>
        )}

        <div className="absolute top-3 right-3 z-20 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-white transition-all duration-300 hover:scale-110 group/fav">
          <span className="text-red-500 text-xl group-hover/fav:text-red-600 transition-colors">
            &#x2661;
          </span>
        </div>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Quick View
          </button>
        </div>
      </CardHeader>

      <CardBody className="relative p-3">
        <div className="flex justify-between items-start mb-3">
          <Typography variant="h6" className="font-bold text-gray-700 text-lg">
            {itemName}
          </Typography>
          <div className="flex items-center bg-green-100 px-2 py-1 rounded-none">
            <span className="text-green-700 text-xs font-semibold">
              {`Rating: ${rating}`}
            </span>
            <span className="text-green-600 ml-1">&#x2661;</span>
          </div>
        </div>

        <Typography
          variant="paragraph"
          className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 text-left"
        >
          {itemDescription}
        </Typography>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <Typography
              variant="h6"
              className="font-bold text-green-600 text-xl"
            >
              ${Number(price).toFixed(2)}
            </Typography>
            <span className="text-gray-400 text-sm ml-2 line-through">
              ${Number(displayOriginalPrice).toFixed(2)}
            </span>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {preparationTime}
          </span>
        </div>
      </CardBody>

      <CardFooter className="relative p-3 pt-0">
        <BtnAction text="Add to Cart" onclick={onAction} />
      </CardFooter>
    </Card>
  );
}
