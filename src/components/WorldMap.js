"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet"
import { Box, Typography, Paper } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { styled } from "@mui/system"
import { Business, Public, Work, People } from "@mui/icons-material"
import { collection, doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default marker icons in Leaflet
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
})

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "150px",
  minHeight: "80px",
}))

const MapContainerWrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  "& .leaflet-container": {
    height: "100%",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
  },
}))

export default function WorldMap() {
  const [markers, setMarkers] = useState([])
  const [stats, setStats] = useState([])
  const [isClient, setIsClient] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(2.2)

  useEffect(() => {
    setIsClient(true)

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setZoomLevel(1)
      } else {
        setZoomLevel(2)
      }
    }

    // Set initial zoom level on mount
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const fetchWorldMapData = async () => {
      try {
        const markersDoc = await getDoc(doc(collection(db, "worldMap"), "markers"))
        const statsDoc = await getDoc(doc(collection(db, "worldMap"), "stats"))

        if (markersDoc.exists()) {
          setMarkers(markersDoc.data().markers)
        } else {
          console.log("No markers data found!")
        }

        if (statsDoc.exists()) {
          setStats(statsDoc.data().stats)
        } else {
          console.log("No stats data found!")
        }
      } catch (error) {
        console.error("Error fetching world map data: ", error)
      }
    }

    fetchWorldMapData()
  }, [])

  const getIcon = (label) => {
    switch (label) {
      case "Clients":
        return <Business fontSize="large" />
      case "Countries":
        return <Public fontSize="large" />
      case "Projects":
        return <Work fontSize="large" />
      case "People":
        return <People fontSize="large" />
      default:
        return null
    }
  }

  if (!isClient) {
    return <Box height={400} bgcolor="grey.100" borderRadius={2} />
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Paper elevation={1} sx={{ overflow: "hidden", bgcolor: "grey.50", p: 2, margin: "auto", maxWidth: "90%", minWidth: { xs: '90%', sm: '85%', md: '65%' }, height: { xs: '400px', sm: '400px', md: '600px' } }}>
        <MapContainerWrapper>
          <MapContainer
            center={[20, 0]}
            zoom={zoomLevel}
            minZoom={zoomLevel === 1 ? 1 : 2}
            maxZoom={10}
            maxBounds={[
              [-90, -180],
              [90, 180],
            ]}
            maxBoundsViscosity={1.0}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              noWrap={true}
            />
            {markers.map((marker) => (
              <Marker key={marker.name} position={[marker.coordinates[1], marker.coordinates[0]]} icon={customIcon}>
                <Tooltip 
                  permanent={false}
                  className="custom-tooltip"
                  direction="top"
                  offset={[0, -10]}
                  opacity={1}
                >
                  <Box sx={{ 
                    p: 1,
                    minWidth: '150px',
                    background: 'linear-gradient(135deg, #0066FF 0%, #00A3FF 100%)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 102, 255, 0.2)',
                    color: 'white',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: '8px solid #0066FF'
                    }
                  }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: "bold",
                        fontSize: '1rem',
                        mb: 0.5,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                        pb: 0.5
                      }}
                    >
                      {marker.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        opacity: 0.9,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      Projects: {marker.count || 0}
                    </Typography>
                  </Box>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </MapContainerWrapper>
      </Paper>

      <Grid container spacing={2} sx={{ m: 1 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <StyledPaper elevation={1}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ fontSize: "3rem", display: "flex", alignItems: "center" }}>{getIcon(stat.label)}</Box>
                <Box>
                  <Typography variant="h4" component="h4" color="primary">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2">{stat.label}</Typography>
                </Box>
              </Box>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
























// import { useState, useEffect } from "react"
// import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
// import { Box, Typography, Paper, Tooltip } from "@mui/material"
// import { styled } from "@mui/system"
// import { People, Public, Work, Business } from "@mui/icons-material"
// import React from "react"
// import { collection, doc, getDoc } from "firebase/firestore"
// import { db } from "./firebase"

// const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// const countryNameMap = {
//   "United States of America": "USA",
//   "United Kingdom": "UK",
//   "United Arab Emirates": "UAE",

// };

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   minWidth: "150px",
//   minHeight: "80px",
// }))

// export default function WorldMap() {
//   const [windowLoaded, setWindowLoaded] = useState(false)
//   const [markers, setMarkers] = useState([])
//   const [stats, setStats] = useState([])

//   useEffect(() => {
//     setWindowLoaded(true)

//     const fetchWorldMapData = async () => {
//       try {
//         const markersDoc = await getDoc(doc(collection(db, "worldMap"), "markers"))
//         const statsDoc = await getDoc(doc(collection(db, "worldMap"), "stats"))

//         if (markersDoc.exists()) {
//           setMarkers(markersDoc.data().markers)
//         } else {
//           console.log("No markers data found!")
//         }

//         if (statsDoc.exists()) {
//           setStats(statsDoc.data().stats)
//         } else {
//           console.log("No stats data found!")
//         }
//       } catch (error) {
//         console.error("Error fetching world map data: ", error)
//       }
//     }

//     fetchWorldMapData()
//   }, [])

//   const getIcon = (label) => {
//     switch (label) {
//       case "Clients":
//         return <Business />
//       case "Countries":
//         return <Public />
//       case "Projects":
//         return <Work />
//       case "People":
//         return <People />
//       default:
//         return null
//     }
//   }

//   // Function to find marker data for a country
//   const getMarkerData = (countryName) => {
//     const markerName = countryNameMap[countryName] || countryName;
//     return markers.find(marker => marker.name === markerName);
//   }

//   // Function to render tooltip content
//   const renderTooltipContent = (name, markerData) => {
//     return markerData ? (
//       <Box>
//         <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{name}</Typography>
//         <Typography variant="body2">Count: {markerData.count || 0}</Typography>
//       </Box>
//     ) : (
//       <Typography variant="subtitle1">{name}</Typography>
//     );
//   };

//   if (!windowLoaded) {
//     return <Box height={400} bgcolor="grey.100" borderRadius={2} />
//   }

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
//       <Paper elevation={1} sx={{ overflow: "hidden", bgcolor: "grey.50", p: 2, margin: "auto", width: "90%" }}>
//         <ComposableMap
//           projection="geoEqualEarth"
//           projectionConfig={{
//             scale: 160,
//           }}
//           width={800}
//           height={400}
//           style={{
//             width: "100%",
//             height: "auto",
//           }}
//         >
//           <Geographies geography={geoUrl}>
//             {({ geographies }) =>
//               geographies.map((geo) => {
//                 const markerData = getMarkerData(geo.properties.name)
//                 return (
//                   <Tooltip
//                     key={geo.rsmKey}
//                     title={renderTooltipContent(geo.properties.name, markerData)}
//                     arrow
//                     placement="top"
//                   >
//                     <Geography
//                       geography={geo}
//                       fill="#D6D6DA"
//                       stroke="#FFFFFF"
//                       strokeWidth={0.5}
//                       style={{
//                         default: { outline: "none" },
//                         hover: { fill: "#A0A0A5", outline: "none" },
//                         pressed: { fill: "#808089", outline: "none" },
//                       }}
//                     />
//                   </Tooltip>
//                 )
//               })
//             }
//           </Geographies>
//           {markers.map(({ name, coordinates, markerOffset, count }) => (
//             <Tooltip
//               key={name}
//               title={renderTooltipContent(name, { name, count })}
//               arrow
//               placement="top"
//             >
//               <Marker coordinates={coordinates}>
//                 <path
//                   d="M12 2C8.13 2 5 5.13 5 9c0 3.25 2.5 6.75 6.5 11.54.3.36.84.36 1.14 0C16.5 15.75 19 12.25 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
//                   fill="rgb(0, 108, 250)"
//                   transform="translate(-12, -24) scale(1)"
//                 />
//                 <text
//                   textAnchor="middle"
//                   y={markerOffset + 20}
//                   style={{
//                     fontFamily: "Roboto, sans-serif",
//                     fill: "rgb(3, 35, 76)",
//                     fontSize: "10px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {name}
//                 </text>
//               </Marker>
//             </Tooltip>
//           ))}
//         </ComposableMap>
//       </Paper>

//       <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 1, m: 3 }}>
//         {stats.map((stat, index) => (
//           <StyledPaper elevation={1} key={index}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Box sx={{ fontSize: '3rem', display: 'flex', alignItems: 'center' }}>
//                 {React.cloneElement(getIcon(stat.label), { fontSize: 'inherit' })}
//               </Box>
//               <Box>
//                 <Typography variant="h4" component="h4" color="primary">
//                   {stat.value}
//                 </Typography>
//                 <Typography variant="body2">{stat.label}</Typography>
//               </Box>
//             </Box>
//           </StyledPaper>
//         ))}
//       </Box>
//     </Box>
//   )
// }

