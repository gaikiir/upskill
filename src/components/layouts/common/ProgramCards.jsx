import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
} from "@material-tailwind/react";

export default function ProgramCards({ image, title }) {
    console.log(image, title)
  return (
    <>
      <div className="w-full h-full">
        <Card className="w-full h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="m-0 rounded-none h-36 flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </CardHeader>

          <CardBody className="p-2 pb-1 flex-grow text-left">
            <Typography className="text-gray-600 text-sm mb-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </Typography>
            <div className="block">
              <h4 className="text-sm text-gray-700 mb-2">By : chris</h4>
              <span className="text-yellow-500">⭐️⭐️⭐️⭐️⭐️</span>
            </div>
          </CardBody>
          <CardFooter className="p-4 pt-2">
            <Button className="w-full  border border-blue-gray-200 text-gray-100 hover:bg-blue-gray-800 transition-colors duration-300">
              start learning
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
