import FeaturesIcons from "../common/FeatureIcons";
import HeroCarousel from "../layouts/Carousel";
import ChiefsSection from "../layouts/Chefs";
import { Container } from "../layouts/Container";
import Products from "../layouts/Products";
import Testimonial from "../layouts/Testimonial";

export default function HomePageComponent() {
  return (
    <Container>
      <HeroCarousel />
      <Products />
      <ChiefsSection/>
      <FeaturesIcons />
      <Testimonial/>
    </Container>
  );
}
