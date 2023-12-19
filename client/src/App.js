
import './App.css';
import IndividualView from './views/individuals/individualView';
import React, { useState } from 'react';
import {AppBar, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography} from "@mui/material";
import Locations from "./views/location/locations";
import Team from "./views/team/teams";
import Activity from "./views/activity/activities";
import ActivityConfig from "./views/activityConfig/activityConfig";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LicenseView from './views/license/licenseView';
import PoolView from './views/pool/poolView';
import MenuIcon from "@mui/icons-material/Menu";
import IndividualIcon from "@mui/icons-material/AccountCircle";
import LicenseIcon from "@mui/icons-material/AutoStories";
import LocationIcon from "@mui/icons-material/LocationOn";
import PoolIcon from "@mui/icons-material/Groups";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TeamIcon from '@mui/icons-material/Diversity2';
import ActivityIcon from '@mui/icons-material/Stadium';
import ActivityConfigIcon from '@mui/icons-material/SportsScore';
import DatabaseTableView from "./views/database/databaseTableView";


function App() {
  const [mode, setMode] = useState("light"); 

  const themeProvider = createTheme({
    palette: {
      mode: mode,
      disableColor: {
        main: "#94a3b8",
        light: "#94a3b8",
        dark: "#94a3b8",
        contrastText: "#09090b",
      },
    },
  });

   const handleToggleMode = () => {
     setMode(mode === "light" ? "dark" : "light");
   };

  const ViewNames = {
    INDIVIDUAL: { name: "individual", icon: <IndividualIcon /> },
    LICENSE: { name: "license", icon: <LicenseIcon /> },
    LOCATIONS: { name: "locations", icon: <LocationIcon /> },
    POOL: { name: "pool", icon: <PoolIcon /> },
    TEAMS: { name: "team", icon: <TeamIcon /> },
    ACTIVITIES: { name: "activity", icon: <ActivityIcon /> },
    CONFIGURATIONS: { name: "activityConfig", icon: <ActivityConfigIcon /> },
    TABLE: { name: "table", icon: <ActivityConfigIcon /> },
  };


   const [view, setView] = useState(ViewNames.INDIVIDUAL.name);
   const [drawerOpen, setDrawerOpen] = useState(false);


   const handleDrawerToggle = () => {
     setDrawerOpen(!drawerOpen);
   };

   const handleChangeView = (newView) => {
     setView(newView);
     setDrawerOpen(false);
   };
   
   const drawer = (
     <div>
       <List sx={{minWidth:200, padding:2}}>
         {Object.entries(ViewNames).map(([key, { name, icon }]) => (
           <ListItem
             key={key}
             onClick={() => handleChangeView(name)}
             sx={{
               "&:hover": {
                 backgroundColor: "rgba(0, 0, 0, 0.04)", // Change as needed
               },
               cursor: "pointer",
             }}
           >
             <ListItemIcon>{icon}</ListItemIcon>
             <ListItemText
               primary={key.charAt(0) + key.slice(1).toLowerCase()}
             />
           </ListItem>
         ))}
       </List>
     </div>
   );
   
  return (
    <ThemeProvider theme={themeProvider}>
      <CssBaseline />
      <AppBar position="Relative">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Intramural Management</Typography>
          <IconButton
            color="inherit"
            aria-label="toggle theme"
            edge="end"
            onClick={handleToggleMode}
            sx={{ marginLeft: "auto" }}
          >
            {mode === "light" ? <LightModeIcon/> : <DarkModeIcon/>}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
      <main>
        {view === ViewNames.INDIVIDUAL.name && <IndividualView />}
        {view === ViewNames.LICENSE.name && <LicenseView />}
        {view === ViewNames.LOCATIONS.name && <Locations />}
        {view === ViewNames.TEAMS.name && <Team />}
        {view === ViewNames.TABLE.name && <DatabaseTableView />}
        {view === ViewNames.ACTIVITIES.name && <Activity/>}
        {view === ViewNames.CONFIGURATIONS.name && <ActivityConfig/>}
        {view === ViewNames.POOL.name && (
          <PoolView
            poolName={"Open Tier 2 W23/24"}
            poolTerm="Fall"
            poolTier="Beginner"
            poolGender="Male"
            poolActivityId={1}
          />
        )}
      </main>
    </ThemeProvider>
  );
}

export default App;