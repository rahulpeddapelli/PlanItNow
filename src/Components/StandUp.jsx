import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, useTheme, useMediaQuery } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const standup = [
  {
    image: 'https://m.media-amazon.com/images/M/MV5BMTg1MTg0MGUtYmE3NC00YjgzLWEwNDItYzU1MDQ5MmFiZmMwXkEyXkFqcGc@._V1_.jpg',
    date: '26 Jul, 8:30PM',
    title: 'Soulitude Experience',
    location: 'AUDA AUDITORIUM Shela, Ahmedabad',
    price: '₹1500 onwards',
  },
  {
    image: 'https://engage4more.com/blog/wp-content/uploads/2022/03/Anirban-Dasgupta-Take-It-Easy-1.jpeg',
    date: '20 Aug - 22 Aug, 10AM',
    title: 'All About Music 2025',
    location: 'Grand Hyatt Mumbai Hotel & Residences',
    price: '₹3000 onwards',
  },
  {
    image: 'https://m.media-amazon.com/images/M/MV5BYjQwOWVjZWQtZjFiOC00MWIwLWFiNjAtOTI3YzM4MTU2ZWRkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    date: '3 Aug, 5PM',
    title: 'FAST & FABULOUS',
    location: 'Dome SVP Stadium, Mumbai',
    price: '₹3499 onwards',
  },
  {
    image: 'https://i.ytimg.com/vi/SZfuYsXW_HI/maxresdefault.jpg',
    date: '20 Sep, 2PM',
    title: 'Road to Sounds Good Festival | Mumbai',
    location: 'Mukesh Mills, Mumbai',
    price: '₹2799',
  },
];

const TopStandUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
        <Typography variant="body2" color="textSecondary">
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
    <Box sx={{ px: 5, py: 4, bgcolor: '#f6f4ff' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, fontFamily: 'serif', color: '#601d71' }}>
        India’s Top Stand-Up Comedy Shows
      </Typography>

      {isMobile ? (
        <Slider {...settings}>
          {standup.map((item, index) => (
            <Box key={index} sx={{ px: 2 }}>{renderCard(item, index)}</Box>
          ))}
        </Slider>
      ) : (
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          {standup.map((item, index) => renderCard(item, index))}
        </Box>
      )}
    </Box>
  );
};

export default TopStandUp;
