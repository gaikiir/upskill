import ProgramCards from "./ProgramCards";

const HeroFlexImages = [
  { imagePath: "/images/child-studying.jpg", imageDescription: "Business" },
  { imagePath: "/images/to-learn-coding.jpg", imageDescription: "Development" },
  { imagePath: "/images/notes.jpg", imageDescription: "Language" },
  { imagePath: "/images/homework.jpg", imageDescription: "Meeting" },
  { imagePath: "/images/computer-learning.jpg", imageDescription: "Finance" },
  { imagePath: "/images/discussion.jpg", imageDescription: "Design" },
  { imagePath: "/images/book-reading.jpg", imageDescription: "Photography" },
  { imagePath: "/images/creative.jpg", imageDescription: "Office" },
];

export default function ProgramGrid() {
  return (
    <section className="bg-gray-50 mt-4">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="font-bold text-3xl text-gray-800 mb-8 text-center md:text-center">
          BootCamp Program
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-2">
          {HeroFlexImages.map((item, index) => (
            <ProgramCards
              key={index}
              image={item.imagePath}
              title={item.imageDescription}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
