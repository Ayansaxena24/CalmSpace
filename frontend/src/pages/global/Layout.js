import { Box } from "@mui/material";
import React from "react";
import HeaderTop from "./HeaderTop";
import SidebarAdm from "./Sidebar";

const Layout =
  (Component) =>
  ({ ...props }) => {
    return (
      <>
        <div style={{ display: 'flex', minHeight: "100vh", overflow: "auto" }}>
          <SidebarAdm />
          <Box className = "bg-gradient-to-r from-gray-700 via-gray-900 to-black" sx={{ width: "100%" }}>
            <HeaderTop />
            <Box sx={{ p: 0, m: 0}}>
              <Component {...props} />
            </Box>
          </Box>
        </div>
      </>
    );
  };

  export default Layout;
