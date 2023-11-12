"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IconButton, ListItemText, Toolbar, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import { paths } from "@/utils/paths";

const drawerWidth = 240;

const Sidebar = () => {
  const [active, setActive] = React.useState<string>("Dashboard");

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        disablePortal
      >
        <Toolbar className="mb-6">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Github"
            href="https://github.com/lohargaurav00/assiduus-react"
            target="_blank"
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Gaurav
          </Typography>
        </Toolbar>
        <List>
          {paths.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => setActive(() => item.name)}
                sx={{
                  backgroundColor:
                    active === item.name
                      ? "var(--green-primary)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor:
                      active === item.name
                        ? "var(--green-primary)"
                        : "transparent",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    paddingLeft: "20px",

                    "& .MuiSvgIcon-root": {
                      color:
                        active === item.name ? "white" : "var(--text-primary)",
                      width: "18px",
                      height: "18px",
                    },
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    "& .MuiListItemText-primary": {
                      color:
                        active === item.name ? "white" : "var(--text-primary)",
                      fontWeight: "bold",
                      fontSize: "14px",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
