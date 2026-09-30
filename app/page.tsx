import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Promotion } from "@/components/sections/Promotion";
import { About } from "@/components/sections/About";
import { Doctors } from "@/components/sections/Doctors";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PatientJourney } from "@/components/sections/PatientJourney";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Reviews } from "@/components/sections/Reviews";
import { Gallery } from "@/components/sections/Gallery";
import { Appointment } from "@/components/sections/Appointment";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Promotion />
        <About />
        <Doctors />
        <WhyChooseUs />
        <PatientJourney />
        <Pricing />
        <FAQ />
        <Reviews />
        <Gallery />
        <Appointment />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
