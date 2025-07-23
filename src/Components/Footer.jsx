import React from 'react';
import {
  Box,
  Typography,
  Link,
  IconButton,
  Button // ✅ IMPORTED Button
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#451b4f', color: 'white', px: 5, py: 6, mt: 0 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          rowGap: 4,
        }}
      >
        {/* Show Listing Section */}
        <Box sx={{ flex: '1 1 100%', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            List your Show
          </Typography>
          <Typography sx={{ mt: 1 }}>
             Partner with us & get listed on PlanItNow
          </Typography>
          <Button variant="contained" sx={{ bgcolor: '#EC4C63', mt: 2 }}>
            Contact today!
          </Button>
        </Box>

        {/* About Section */}
        <Box sx={{ flex: '1 1 200px', mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontFamily: 'monospace',
              color: '#fff',
            }}
          >
            PlanItNow
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Book your favorite Plays, concerts, and experiences with ease. Discover what's happening near you and be part of it.
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box sx={{ flex: '1 1 150px', mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Quick Links
          </Typography>
          {['Home', 'Plays', 'Stand Up', 'Concerts'].map((text) => (
            <Link href="#" color="inherit" underline="hover" display="block" key={text}>
              {text}
            </Link>
          ))}
        </Box>

        {/* Support */}
        <Box sx={{ flex: '1 1 150px', mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Support
          </Typography>
          {['Help Center', 'Terms of Use', 'Privacy Policy', 'Cancellation Policy'].map((text) => (
            <Link href="#" color="inherit" underline="hover" display="block" key={text}>
              {text}
            </Link>
          ))}
        </Box>

        {/* Social Media */}
        <Box sx={{ flex: '1 1 150px', mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton sx={{ color: 'white' }} href="#">
              <Facebook />
            </IconButton>
            <IconButton sx={{ color: 'white' }} href="#">
              <Instagram />
            </IconButton>
            <IconButton sx={{ color: 'white' }} href="#">
              <Twitter />
            </IconButton>
            <IconButton sx={{ color: 'white' }} href="#">
              <YouTube />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Bottom Copyright */}
      <Box sx={{ mt: 4, borderTop: '1px solid #444', pt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="gray">
          © {new Date().getFullYear()} PlanItNow. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
