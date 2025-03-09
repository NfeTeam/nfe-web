import { useState, useEffect } from "react"
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
import { Box, Typography, Paper } from "@mui/material"
import { styled } from "@mui/system"
import { People, Public, Work, Business } from "@mui/icons-material"
import React from "react"
import { collection, doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "150px",
  minHeight: "80px",
}))

export default function WorldMap() {
  const [windowLoaded, setWindowLoaded] = useState(false)
  const [markers, setMarkers] = useState([])
  const [stats, setStats] = useState([])

  useEffect(() => {
    setWindowLoaded(true)

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
        return <Business />
      case "Countries":
        return <Public />
      case "Projects":
        return <Work />
      case "People":
        return <People />
      default:
        return null
    }
  }

  if (!windowLoaded) {
    return <Box height={400} bgcolor="grey.100" borderRadius={2} />
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Paper elevation={1} sx={{ overflow: "hidden", bgcolor: "grey.50", p: 2,margin: "auto",width:"90%" }}>
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 160,
          }}
          width={800}
          height={400}
          style={{
            width: "100%",
            height: "auto",
            
          }}
        >
          
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#D6D6DA"
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#A0A0A5", outline: "none" },
                      pressed: { fill: "#808089", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
              <Marker key={name} coordinates={coordinates}>
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 3.25 2.5 6.75 6.5 11.54.3.36.84.36 1.14 0C16.5 15.75 19 12.25 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
                  fill="rgb(0, 108, 250)"
                  transform="translate(-12, -24) scale(1)"
                />
                <text
                  textAnchor="middle"
                  y={markerOffset + 20}
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fill: "rgb(3, 35, 76)",
                    fontSize: "10px",
                    fontWeight: "bold",
                    
                  }}
                >
                  {name}
                </text>
              </Marker>
            ))}
          
        </ComposableMap>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 1, m: 3 }}>
        {stats.map((stat, index) => (
          <StyledPaper elevation={1} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ fontSize: '3rem', display: 'flex', alignItems: 'center' }}>
                {React.cloneElement(getIcon(stat.label), { fontSize: 'inherit' })}
              </Box>
              <Box>
                <Typography variant="h4" component="h4" color="primary">
                  {stat.value}
                </Typography>
                <Typography variant="body2">{stat.label}</Typography>
              </Box>
            </Box>
          </StyledPaper>
        ))}
      </Box>
    </Box>
  )
}

