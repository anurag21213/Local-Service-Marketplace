import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Branding from '../components/Branding'
import Work from '../components/Work'
import Plans from '../components/Plans'
import Tag from '../components/Tag'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
        <Navbar/>
        <Hero/>
        <Intro/>
        <Branding/>
        <Work/>
        <Plans/>
        <Tag/>
        <Footer/>
      
    </>
  )
}

export default Home
