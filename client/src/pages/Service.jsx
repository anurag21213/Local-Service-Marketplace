import React from 'react'
import Navbar from '../components/Navbar'
import Search from '../components/ServiceComponents/Search'
import ServiceCategories from '../components/ServiceComponents/ServiceCategories'
import AboutSeo from '../components/ServiceComponents/AboutSeo'
import Faq from '../components/ServiceComponents/Faq'
import Demo from '../components/ServiceComponents/Demo'
import Footer from '../components/Footer'

const Service = () => {
  return (
    <div>
      <Navbar />
      <ServiceCategories />
      
      <Faq />
      <Demo />
      <Footer />
    </div>
  )
}

export default Service
