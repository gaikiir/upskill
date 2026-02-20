const fakeData = [
  {
    id: 1,
    name: "Maria",
    description: " Maria is a highly skilled chef with a passion for creating exquisite dishes.",
    image:
      "https://cdn.pixabay.com/photo/2021/01/17/15/25/woman-5925427_1280.jpg",
  },
  {
    id: 2,
    name: "David",
    description: " David is a seasoned chef with a passion for creating bold and flavorful dishes.",
    image:
      "https://cdn.pixabay.com/photo/2015/09/29/02/19/beer-963195_1280.jpg",
  },
  {
    id: 3,
    name: "James",
    description: " James is a culinary artist known for his innovative approach to traditional dishes.",
    image:
      "https://cdn.pixabay.com/photo/2024/05/02/06/55/ai-generated-8733800_1280.png",
  },
  {
    id: 4,
    name: "Sarah",
    description: "Sarah is a passionate chef with a background in international cuisine.",
    image:
      "https://cdn.pixabay.com/photo/2019/02/04/22/05/chef-3975835_1280.jpg",
  },
];

export default function ChiefItems() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5">
      {fakeData.map((chef) => (
        <div
          key={chef.id}
          className="group cursor-pointer bg-white rounded-none shadow-md p-6 flex flex-col items-center justify-start min-h-0 h-auto" // Changed to natural height
        >
          <div className="mb-4 flex-shrink-0">
            {" "}
            {/* Prevent image stretching */}
            <img
              src={chef.image}
              alt={chef.name}
              className="w-32 h-32 rounded-full transition-transform group-hover:scale-110 duration-500 object-cover"
            />
          </div>
          <div className="text-center flex-grow-0">
            {" "}
            {/* Prevent text stretching */}
            <h3 className="text-gray-700 text-xl font-semibold mb-2 uppercase">
              Chef: {chef.name}
            </h3>
            <p className="text-gray-700 font-light">{chef.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/*

 <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        <img
          src="/images/chef1.jpg"
          alt="Chef 1"
          className="w-32 h-32 rounded-full mb-4 object-cover"
        />
        <h3 className="text-xl font-semibold mb-2">Chef Maria</h3>
        <p className="text-gray-600 text-center">
          With over 15 years of experience, Chef Maria brings a unique blend of
          traditional and modern culinary techniques to our kitchen.
        </p>
      </div>


*/
