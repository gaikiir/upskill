import { Card } from "@material-tailwind/react";

export default function HeaderComp() {
  return (
    <div className="py-8">
      <Card className="w-full max-w-6xl mx-auto min-h-80 hero rounded-lg shadow-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-left flex flex-col justify-center">
            <h4 className="text-2xl md:text-2xl capitalize text-gray-800 mb-2">
              home | bootcamp
            </h4>
            <p className="text-lg text-gray-800 md:text-3xl font-bold capitalize">
              bootcamp program.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src="/src/assets/images/student.png"
              alt="Discussion"
              className="w-full h-auto max-h-64 object-fill rounded-xl shadow"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
