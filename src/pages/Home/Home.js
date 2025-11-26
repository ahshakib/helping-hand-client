import Features from "../../components/Home/Features"
import Footer from "../../components/Home/Footer"
import HeroSection from "../../components/Home/HeroSection"
import ServicesPreview from "../../components/Home/ServicesPreview"
import Navbar from "../../components/Navbar"

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <HeroSection/>
      <Features/>
      <ServicesPreview/>
      <Footer/>
    </div>
  )
}

export default Home