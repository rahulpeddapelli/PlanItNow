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

const plays = [
  {
    image: 'https://in.bmscdn.com/events/moviecard/ET00437976.jpg',
    date: '26 Jul, 8:30PM',
    title: 'Soulitude Experience',
    location: 'AUDA AUDITORIUM Shela, Ahmedabad',
    price: '₹1500 onwards',
  },
  {
    image: 'https://in.bmscdn.com/events/moviecard/ET00439656.jpg',
    date: '20 Aug - 22 Aug, 10AM',
    title: 'All About Music 2025',
    location: 'Grand Hyatt Mumbai Hotel & Residences',
    price: '₹3000 onwards',
  },
  {
    image: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U2F0LCA5IEF1ZyBvbndhcmRz,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00428632-meugksdqxh-portrait.jpg',
    date: '3 Aug, 5PM',
    title: 'FAST & FABULOUS',
    location: 'Dome SVP Stadium, Mumbai',
    price: '₹3499 onwards',
  },
  {
    image: 'https://assets-in.bmscdn.com/discovery-catalog/events/et00323772-eenknmdchv-landscape.jpg',
    date: '20 Sep, 2PM',
    title: 'Road to Sounds Good Festival | Mumbai',
    location: 'Mukesh Mills, Mumbai',
    price: '₹2799',
  },
];

const TopPlays = () => {
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
            {plays.map((item, index) => (
              <Box key={index} sx={{ px: 1 }}>{renderCard(item, index)}</Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          {plays.map((item, index) => renderCard(item, index))}
        </Box>
      )}
    </Box>
  );
};

export default TopPlays;
