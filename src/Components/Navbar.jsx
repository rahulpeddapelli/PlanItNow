import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Select,
  FormControl,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore,
  AccountCircle,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const [city, setCity] = useState('Pune');
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      {/* Top AppBar */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', color: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && (
              <IconButton onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontFamily: 'monospace',
                color: '#601d71e9',
              }}
            >
              PlanItNow
            </Typography>

            {!isMobile && (
              <>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: '#ccc', height: 30 }} />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    px: 2,
                    py: 0.5,
                  }}
                >
                  <SearchIcon sx={{ color: '#888' }} />
                  <InputBase
                    placeholder="Search for Concerts, Events and Plays"
                    sx={{ ml: 1, width: 250 }}
                  />
                </Box>
              </>
            )}
          </Box>

          {/* Right side */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#451b4f' }}>
              <FormControl variant="standard">
                <Select
                  value={city}
                  onChange={handleCityChange}
                  disableUnderline
                  sx={{ fontWeight: 'bold' }}
                  IconComponent={ExpandMore}
                >
                  <MenuItem value="Mumbai">Mumbai</MenuItem>
                  <MenuItem value="Pune">Pune</MenuItem>
                  <MenuItem value="Sambhajinagar">Sambhajinagar</MenuItem>
                  <MenuItem value="Delhi">Delhi</MenuItem>
                </Select>
              </FormControl>

              <IconButton onClick={handleMenuOpen}>
                <AccountCircle sx={{ fontSize: 32, color: '#451b4f' }} />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Sign In</MenuItem>
                <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            <ListItem>
              <InputBase
                placeholder="Search concerts..."
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                  width: '100%',
                }}
              />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Events" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Plays" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Concerts" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Sub Navigation */}
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: '#f5f5f5',
            px: 4,
            py: 1,
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, color: '#451b4f', alignItems: 'center' }}>
            <Typography>Events</Typography>
            <Typography>Plays</Typography>
            <Typography>Concerts</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
