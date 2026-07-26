
import Hero from "../components/hero"
import FeaturesSection from "../components/features"

import Footer from "../components/footer"
import { useRef } from "react"

export default function Home(){
  const sectionRef =  useRef(null)
  return(
    <>
    <Hero sectionRef={sectionRef}/>
    <FeaturesSection/>
   
    <Footer/>
    </>   
  )
}