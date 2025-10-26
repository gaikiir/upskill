import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function CourseCard({ course }) {
  return (
    <Card className="w-full max-w-xs">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />
      <CardBody>
        <Typography variant="h6" className="mb-2 font-bold">
          {course.title}
        </Typography>
        <Typography className="text-sm text-gray-600">
          {course.level}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <Button size="sm">Start</Button>
        <div className="text-sm text-gray-700">{course.rating} ★</div>
      </CardFooter>
    </Card>
  );
}
