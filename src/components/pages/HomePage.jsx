import HeaderCompo from "../layouts/common/Header";
import HeroFlexContent from "../layouts/common/Hero_flex";
import ProgramGrid from "../layouts/common/ProgramGrid";
import UpSkillCompo from "../layouts/common/Upskills";

export default function HomePage() {
  return (
    <div className="py-12 w-full max-w-7xl mx-auto">
      <HeaderCompo
        title="home | bootcamp"
        subtitle="bootcamp Program"
        image="/images/student.png"
      />

      <HeroFlexContent />
      <UpSkillCompo />
      <ProgramGrid />

    </div>
  );
}
