import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const concerts = [
  {
    image: 'https://www.tottenhamhotspurstadium.com/media/mzrftp3l/arijit-singh-venue-900-x-800.jpg',
    date: '26 Jul, 8:30PM',
    title: 'Soulitude Experience',
    location: 'AUDA AUDITORIUM Shela, Ahmedabad',
    price: '₹1500 onwards',
  },
  {
    image: 'https://in.bmscdn.com/events/moviecard/ET00421212.jpg',
    date: '20 Aug - 22 Aug, 10AM',
    title: 'All About Music 2025',
    location: 'Grand Hyatt Mumbai Hotel & Residences',
    price: '₹3000 onwards',
  },
  {
    image: 'https://in.bmscdn.com/events/moviecard/ET00438011.jpg',
    date: '3 Aug, 5PM',
    title: 'FAST & FABULOUS',
    location: 'Dome SVP Stadium, Mumbai',
    price: '₹3499 onwards',
  },
  {
    image: 'https://mumbai.mallsmarket.com/sites/default/files/photos/events/phoenixmarketcity-mumbai-awestrung-amit-trivedi-live-concert-26aug2022-1.jpg',
    date: '20 Sep, 2PM',
    title: 'Road to Sounds Good Festival | Mumbai',
    location: 'Mukesh Mills, Mumbai',
    price: '₹2799',
  },
];
const TopConcerts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const renderCard = (item, index) => (
    <Card key={index} sx={{ width: 300, borderRadius: 3, boxShadow: 3, mx: 'auto' }}>
      <CardMedia
        component="img"
        height="350"
        image={item.image}
        alt={item.title}
        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.date}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1 }}>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {item.location}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          {item.price}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ px: 3, py: 4, bgcolor: '#f6f4ff' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, fontFamily: 'serif', color: '#601d71' }}>
        India’s Top Stand-Up Comedy Shows
      </Typography>

      {isMobile ? (
        <Box sx={{ maxWidth: 340, mx: 'auto' }}>
          <Slider {...settings}>
            {concerts.map((item, index) => (
              <Box key={index} sx={{ px: 1 }}>{renderCard(item, index)}</Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          {concerts.map((item, index) => renderCard(item, index))}
        </Box>
      )}
    </Box>
  );
};

export default TopConcerts;
