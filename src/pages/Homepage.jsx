import React from 'react'
import PromoCarousel from '../Components/PromoCarousel'
import Plays from '../Components/Plays'
import StandUp from '../Components/StandUp'
import Concerts from '../Components/Concerts'
const Homepage = () => {
  return (
    <div>
      <PromoCarousel />
      <Plays />
      <StandUp />
      <Concerts />
    </div>
  )
}

export default Homepage