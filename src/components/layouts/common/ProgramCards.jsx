import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export default function ProgramCards({
  image,
  title,
  instructor,
  rating,
  reviewCount,
  currentPrice = "$49",
  originalPrice = "",
  isPremium = false,
  isBestseller = false,
}) {
  
  const renderStars = (ratingValue) => {
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    if (hasHalfStar) {
      stars.push("☆"); // Half star approximation; use a half-star icon for better UX
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push("☆");
    }

    return stars.join("");
  };

  const stars = renderStars(rating);

  return (
    <>
      <div className="w-full h-full">
        <Card className="w-full h-full rounded-none flex flex-col overflow-hidden shadow-none hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="m-0 rounded-none h-36 flex-shrink-0 relative">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </CardHeader>

          <CardBody className="p-2 pb-2 flex-grow text-left flex flex-col justify-between">
            <div>
              <Typography
                variant="h5"
                className="text-gray-800 text-1xl mb-2 font-semibold "
              >
                {title}
              </Typography>
              <Typography className="text-gray-600 text-sm mb-2">
                {instructor}
              </Typography>
            </div>
            <div className="block mt-auto">
              <div className="flex items-center justify-between mb-2">
                <Typography className="text-sm text-yellow-900 font-medium">
                  {stars} {rating} ({reviewCount})
                </Typography>
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  {originalPrice && (
                    <Typography className="text-sm text-gray-500 line-through">
                      {originalPrice}
                    </Typography>
                  )}
                  <Typography className="text-lg font-bold text-gray-900">
                    {currentPrice}
                  </Typography>
                </div>
              </div>

              <div className="flex gap-2">
                {isBestseller && (
                  <span className="bg-green-900 text-white px-2 py-1 rounded text-xs font-semibold">
                    Bestseller
                  </span>
                )}
                {isPremium && (
                  <span className="bg-purple-900 text-white px-2 py-1 rounded text-xs font-semibold">
                    Premium
                  </span>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
