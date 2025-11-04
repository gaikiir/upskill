import ProgramCards from "./ProgramCards";

const ProgramData = [
  {
    id: 1,
    imagePath: "/images/man-doing-homework.jpg", 
    title: "100 Days of Code: Complete Python Pro...",
    instructor: "Dr. Angela Yu, Developer and Lead...",
    rating: 4.7,
    reviewCount: "98,024",
    currentPrice: "$9.99",
    originalPrice: "$64.99",
    isPremium: true,
    isBestseller: true,
  },
  {
    id: 2,
    imagePath: "/images/to-learn-coding.jpg",
    title: "AI Engineer Agent Track: Complete Agent & MCP Course",
    instructor: "Ed Donner, Lignancy",
    rating: 4.7,
    reviewCount: "19,365",
    currentPrice: "$9.99",
    originalPrice: "$49.99",
    isPremium: true,
    isBestseller: true,
  },
  {
    id: 3,
    imagePath: "/images/book-reading.jpg",
    title: "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02",
    instructor: "Stephane Maarek | AWS Certified Cloud...",
    rating: 4.7,
    reviewCount: "269,084",
    currentPrice: "$12.99",
    originalPrice: "$99.99",
    isPremium: true,
    isBestseller: true,
  },
  {
    id: 4,
    imagePath: "/images/child-studying.jpg",
    title: "Ultimate AWS Certified Solutions Architect Associate",
    instructor: "Stephane Maarek | AWS Certified Cloud...",
    rating: 4.7,
    reviewCount: "272,716",
    currentPrice: "$12.99",
    originalPrice: "$99.99",
    isPremium: true,
    isBestseller: true,
  },
  {
    id: 5,
    imagePath: "/images/computer-learning.jpg",
    title: "AI Engineer Core Track: LLM Engineering, RAG, LoRA...",
    instructor: "Lignancy, Ed Donner",
    rating: 4.7,
    reviewCount: "20,661",
    currentPrice: "$9.99",
    originalPrice: "$64.99",
    isPremium: true,
    isBestseller: true,
  },
  {
    id: 6,
    imagePath: "/images/creative.jpg",
    title: "Advanced Flutter: Build Enterprise-Ready Apps",
    instructor: "Kal, Tnsil-Fikady, Nathan's WRLD",
    rating: 4.4,
    reviewCount: "116",
    currentPrice: "$9.99",
    originalPrice: "$44.99",
    isPremium: true,
    isBestseller: false,
  },
  {
    id: 7,
    imagePath: "/images/homework.jpg",
    title: "The AI Engineer Courses 2025: 365 Careers AI Engineer...",
    instructor: "365 Careers",
    rating: 4.6,
    reviewCount: "10,865",
    currentPrice: "$9.99",
    originalPrice: "$59.99",
    isPremium: true,
    isBestseller: true,
  },
  {
    id: 8,
    imagePath: "/images/discussion.jpg",
    title: "React Native - The Practical Guide [2024] - The Complete",
    instructor: "Academind by Maximilian Schwarzmüller...",
    rating: 4.7,
    reviewCount: "44,939",
    currentPrice: "$9.99",
    originalPrice: "$64.99",
    isPremium: true,
    isBestseller: true,
  },
  // Add more items as needed for pagination/backend integration
];

export default function ProgramGrid() {
  return (
    <section className="bg-gray-50 mt-4">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="font-bold text-3xl text-gray-800 mb-8 text-center md:text-center">
          Recommended to you based on ratings
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2">
          {ProgramData.map((item) => (
            <ProgramCards
              key={item.id}
              image={item.imagePath}
              title={item.title}
              instructor={item.instructor}
              rating={item.rating}
              reviewCount={item.reviewCount}
              currentPrice={item.currentPrice}
              originalPrice={item.originalPrice}
              isPremium={item.isPremium}
              isBestseller={item.isBestseller}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
