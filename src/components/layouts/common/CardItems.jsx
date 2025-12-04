import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router";
import { UseFavorites } from "../../hooks/UseFavorite";
import HeartIcon from "../utilities/Favorite";
import StarRating from "../utilities/StarRating";
export default function CardItem({ product }) {
  const { toggleFavorite, isFavorite } = UseFavorites();
  const navigate = useNavigate();
  //handle card click 
  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-[1280px] mx-auto">
      {product.map((item) => (
        <div className=" group cursor-pointer" key={item.id} onClick={()=>handleClick(item.id)}>
          <Card className=" h-full overflow-hidden rounded-none border border-gray-200 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader
              className="rounded-none shadow-none m-0 relative h-40 overflow-hidden"
              floated={false}
              shadow={false}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </CardHeader>
            <CardBody className="p-3">
              <Typography
                className="text-left font-semibold text-sm text-gray-600 mb-2"
                variant="small"
              >
                {item.description}
              </Typography>
              <div className="absolute top-2 right-3">
                <HeartIcon
                  id={item.id}
                  filled={isFavorite(item.id)}
                  onClick={toggleFavorite}
                />
              </div>
              <div className="">
                <StarRating />
              </div>
            </CardBody>
            <CardFooter className="p-3 flex items-center justify-between">
              <Typography variant="small" className="text-gray-700 text-base">
                {item.price}
                <span className="line-through text-gray-500 ml-1">
                  {item.originalPrice}
                </span>
              </Typography>
              <span className="bg-orange-700 text-white text-sm px-2 py-1 rounded-none">
                {item.badge}
              </span>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}

{
  /* <a href="/" className="block group">
        <Card className=" group h-full overflow-hidden rounded-none border border-gray-200 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <CardHeader
            className="rounded-none shadow-none m-0 relative h-40 overflow-hidden"
            floated={false}
            shadow={false}
          >
            <img
              src="https://cdn.pixabay.com/photo/2024/12/20/16/46/baby-9280577_1280.jpg"
              alt="product logo"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </CardHeader>
          <CardBody className="p-3">
            <Typography
              className="text-left font-semibold text-sm text-gray-600 mb-2"
              variant="small"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
            </Typography>

            <div className="absolute top-2 right-3">
              <HeartIcon />
            </div>
            <StarRating />
          </CardBody>
          <CardFooter className="p-3 flex items-center justify-between">
            <Typography variant="small" className="text-gray-700 text-base">
              $9.99{" "}
              <span className="line-through text-gray-500 ml-1">$54.99</span>
            </Typography>
            <span className=" text-white text-sm px-2 py-1 rounded-none">
              Premium
            </span>
          </CardFooter>
        </Card>
      </a> */
}
