import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/HomeComponents/Hero'
import Intro from '../components/HomeComponents/Intro'
import Branding from '../components/HomeComponents/Branding'
import Work from '../components/HomeComponents/Work'
import Plans from '../components/HomeComponents/Plans'
import Tag from '../components/HomeComponents/Tag'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Intro />
      <Branding />
      <Work />
      <Plans />
      <Tag />
      <Footer />

    </>
  )
}

export default Home
