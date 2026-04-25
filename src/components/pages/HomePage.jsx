import Chefs from "../layouts/Chefs";
import { Container } from "../layouts/Container";
import FeaturesIcons from "../layouts/FeatureIcons";
import { HeroCarousel } from "../layouts/HeroCarousel";
import PopularProducts from "../layouts/popular";
import Testimonial from "../layouts/Testimonial";

export default function HomePage() {
  return (
    <Container>
      <HeroCarousel />
      <FeaturesIcons />
      <PopularProducts />
      <Chefs />
      <Testimonial />
    </Container>
  );
}
