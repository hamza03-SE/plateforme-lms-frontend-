import CoopLayout from "../layouts/CoopLayout";
import CoopHero from "../components/CoopHero";
import CoopFeatures from "../components/CoopFeatures";
import CoopContact from "../components/CoopContact";

const LandingCoop = () => (
  <CoopLayout>
    <CoopHero />
    <CoopFeatures />
    <CoopContact />
  </CoopLayout>
);

export default LandingCoop;
