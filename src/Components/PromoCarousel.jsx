// src/Components/PromoCarousel.jsx
import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';

const PromoCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const images = [
    'https://i.pinimg.com/1200x/f5/30/81/f530818a9e467a9f36181f0615d97943.jpg',
    'https://i.pinimg.com/1200x/c6/64/da/c664dac91a1ff377726da9bb16b78322.jpg',
    'https://i.pinimg.com/1200x/71/52/fd/7152fd6b190784f3c09f24328119531b.jpg',
  ];

  return (
    <Box sx={{ maxWidth: '100%', overflow: 'hidden', px: 2,marginTop:4 }}>
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box key={index} sx={{ px: 0 }}>
            <img
              src={img}
              alt={`slide-${index}`}
              style={{
                width: '100%',
                height: '50vh',
                borderRadius: 0,
                objectFit :'cover',
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default PromoCarousel;
