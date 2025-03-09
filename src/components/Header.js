"use client"

import React, { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Groups as GroupsIcon,
  LocationCity as LocationCityIcon,
  VolunteerActivism as VolunteerActivismIcon,
  PermMedia as PermMediaIcon,
  PermContactCalendar as PermContactCalendarIcon,
  Work as WorkIcon,
} from "@mui/icons-material"
import { Link as RouterLink, useLocation } from "react-router-dom"
import logo from "../images/LOGO.png"

const Header = () => {
  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon /> },
    { name: "Services", path: "/services", icon: <GroupsIcon /> },
    { name: "Projects", path: "/projects", icon: <LocationCityIcon /> },
    { name: "Social Service", path: "/social-service", icon: <VolunteerActivismIcon /> },
    { name: "Media", path: "/media", icon: <PermMediaIcon /> },
    { name: "Careers", path: "/careers", icon: <WorkIcon /> },
    { name: "Contact", path: "/contact", icon: <PermContactCalendarIcon /> },
  ]

  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(navItems.findIndex(item => item.path === location.pathname))
  const [underlineStyle, setUnderlineStyle] = useState({})
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const activeItem = document.getElementById(`nav-item-${activeIndex}`)
    if (activeItem) {
      setUnderlineStyle({
        left: activeItem.offsetLeft,
        width: activeItem.clientWidth,
      })
    }
  }, [activeIndex])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleNavItemClick = (index) => {
    setActiveIndex(index)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const drawer = (
    <Box 
      onClick={handleDrawerToggle} 
      sx={{ 
        textAlign: "center", 
        bgcolor: "black",
        height: "100%",
        color: "white"
      }}
    >
      <Box sx={{ py: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Box component="img" src={logo} alt="NEW FACT ENGINEERING" sx={{ height: 40, mb: 1 }} />
        <Typography variant="h6" sx={{ color: "white", fontSize: "1rem" }}>
          NEW FACT ENGINEERING
        </Typography>
      </Box>
      <List>
        {navItems.map((item, index) => (
          <ListItem
            key={item.name}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={() => handleNavItemClick(index)}
            sx={{
              color: location.pathname === item.path ? "#03cffd" : "white",
              "&.Mui-selected": {
                bgcolor: "rgba(3, 207, 253, 0.1)",
              },
              display: "flex",
              alignItems: "center",
              padding: "12px 20px",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(3, 207, 253, 0.1)",
                color: "#03cffd",
              },
            }}
          >
            <Box sx={{ minWidth: 40, color: "inherit" }}>
              {item.icon}
            </Box>
            <ListItemText primary={item.name} sx={{ color: "inherit" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: scrolled ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "white",
              mr: isMobile ? 2 : 0,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <Box 
              component="img" 
              src={logo} 
              alt="NEW FACT ENGINEERING" 
              sx={{ 
                height: 40, 
                mr: 1,
                filter: "brightness(1.2)",
              }} 
            />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: "bold", 
                color: "white",
                display: { xs: "none", sm: "block" },
                fontSize: { sm: "1rem", md: "1.25rem" },
              }}
            >
              NEW FACT ENGINEERING
            </Typography>
          </Box>
        </Box>

        {isMobile ? (
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              color: "#03cffd",
              border: "1px solid rgba(3, 207, 253, 0.3)",
              borderRadius: "8px",
              padding: "8px",
              ml: 'auto',
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(3, 207, 253, 0.1)",
                borderColor: "#03cffd",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', gap: 3, position: 'relative' }}>
            {navItems.map((item, index) => (
              <IconButton
                key={item.name}
                id={`nav-item-${index}`}
                component={RouterLink}
                to={item.path}
                onClick={() => handleNavItemClick(index)}
                sx={{
                  color: activeIndex === index ? "#03cffd" : "rgba(255, 255, 255, 0.7)",
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  "&:hover": {
                    color: "#03cffd",
                    transform: "translateY(-2px)",
                  },
                }}
                title={item.name}
              >
                {item.icon}
              </IconButton>
            ))}
            <Box
              sx={{
                position: 'absolute',
                bottom: -5,
                height: 3,
                bgcolor: '#03cffd',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                boxShadow: '0 0 10px rgba(3, 207, 253, 0.5)',
                ...underlineStyle,
              }}
            />
          </Box>
        )}
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { 
            boxSizing: "border-box", 
            width: 280,
            bgcolor: "black",
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  )
}

export default Header
