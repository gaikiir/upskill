
import HeroCompo from "../layouts/common/Hero";
import HeroFlexContent from "../layouts/common/Hero_flex";

export default function HomePage() {
  return (
    <div className="py-12 w-full max-w-7xl mx-auto">
      <HeroCompo
        title="home | bootcamp"
        subtitle="bootcamp Program"
        image="/images/student.png"
      />

      <HeroFlexContent/>

      {/* <Features items={features} />

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Bootcamp Program</h2>
      </div>

      <CourseGrid courses={courses} />

      <FAQ faqs={faqs} /> */}
    </div>
  );
}
