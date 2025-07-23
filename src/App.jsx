import React from 'react';
import Navbar from './Components/Navbar';
import PromoCarousel from './Components/PromoCarousel';
import Plays from './Components/Plays';
import StandUp from './Components/StandUp';
import Concerts from './Components/Concerts';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <PromoCarousel />
      <Plays />
      <StandUp />
      <Concerts />
      <Footer />

    </div>
  )
}

export default App
