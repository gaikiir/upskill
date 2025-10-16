// import { courses, faqs, features } from "../../data/mockData";
// import CourseGrid from "../CourseGrid";
// import FAQ from "../FAQ";
// import Features from "../Features";
import studentImg from "../../../src/assets/images/student.png";
import Hero from "../Hero";

export default function HomePage() {
  return (
    <div className="py-12">
      <Hero
        title="home | bootcamp"
        subtitle="bootcamp Program"
        image={studentImg}
      />
      {/* <Features items={features} />

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Bootcamp Program</h2>
      </div>

      <CourseGrid courses={courses} />

      <FAQ faqs={faqs} /> */}
    </div>
  );
}
