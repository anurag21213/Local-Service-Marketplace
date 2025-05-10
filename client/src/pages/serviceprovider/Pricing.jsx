import React, { useState, useEffect } from 'react'
import Plans from '../../components/HomeComponents/Plans'
import ProviderNavbar from '../../components/ProviderComponents/ProviderNavbar'
import Loader from '../../components/Loader'

const Pricing = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for plans
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <ProviderNavbar />
      {isLoading ? (
        <Loader message="Loading Pricing Plans..." />
      ) : (
        <Plans />
      )}
    </div>
  )
}

export default Pricing
