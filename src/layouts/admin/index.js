// Chakra imports
import { Portal, Box, useDisclosure, ChakraProvider } from '@chakra-ui/react';
// Layout components
import Navbar from 'components/admin/navbar/NavbarAdmin.js';
import Sidebar from 'components/admin/sidebar/Sidebar.js';
import { SidebarContext } from 'contexts/SidebarContext';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AdminRoutes from 'routes/AdminRoutes';
import currentTheme from "../../theme/theme"
import Footer from 'components/admin/footer/FooterAdmin';
import NotFound from 'components/admin/NotFound';

// Custom Chakra theme
export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [activeRoute , setActiveRoute] = useState();
  let currentPath =useLocation().pathname;

  useEffect(() => {
    setActiveRoute(getActiveRoute(AdminRoutes));
  },[currentPath])
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };

  const getActiveRoute = (AdminRoutes) => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < AdminRoutes.length; i++) {
      if (AdminRoutes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(AdminRoutes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (AdminRoutes[i].category) {
        let categoryActiveRoute = getActiveRoute(AdminRoutes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(AdminRoutes[i].layout + AdminRoutes[i].path) !== -1
        ) {
          return AdminRoutes[i].name;
        }
      }
    }
    console.log("🚀 ~ getActiveRoute ~ activeRoute:", activeRoute)
    return activeRoute;
  };

  const getActiveNavbar = (AdminRoutes) => {
    let activeNavbar = false;
    for (let i = 0; i < AdminRoutes.length; i++) {
      if (AdminRoutes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(AdminRoutes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (AdminRoutes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(AdminRoutes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(AdminRoutes[i].layout + AdminRoutes[i].path) !== -1
        ) {
          return AdminRoutes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };

  const getActiveNavbarText = (AdminRoutes) => {
    let activeNavbar = false;
    for (let i = 0; i < AdminRoutes.length; i++) {
      if (AdminRoutes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(AdminRoutes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (AdminRoutes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(AdminRoutes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(AdminRoutes[i].layout + AdminRoutes[i].path) !== -1
        ) {
          return AdminRoutes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };

  const getRoutes = (AdminRoutes) => {
    return AdminRoutes.map((route, key) => {
      if (route.layout === '/admin') {
        return (
          <Route path={`${route.path}`} element={route.component} key={key} />
        );
      }
      if (route.collapse) {
        return getRoutes(route.items);
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = 'ltr';
  const { onOpen } = useDisclosure();
  document.documentElement.dir = 'ltr';
  return (
    <ChakraProvider theme={currentTheme}>
      <Box>
        <Box>
          <SidebarContext.Provider
            value={{
              toggleSidebar,
              setToggleSidebar,
            }}
          >
            <Sidebar AdminRoutes={AdminRoutes} display="none" {...rest} />
            <Box
              float="right"
              minHeight="100vh"
              height="100%"
              overflow="auto"
              position="relative"
              maxHeight="100%"
              w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
              maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
              transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
              transitionDuration=".2s, .2s, .35s"
              transitionProperty="top, bottom, width"
              transitionTimingFunction="linear, linear, ease"
            >
              <Portal>
                <Box>
                  <Navbar
                    onOpen={onOpen}
                    logoText={'Horizon UI Dashboard PRO'}
                    brandText={activeRoute}
                    secondary={getActiveNavbar(AdminRoutes)}
                    message={getActiveNavbarText(AdminRoutes)}
                    fixed={fixed}
                    {...rest}
                  />
                </Box>
              </Portal>

              {getRoute() ? (
                <Box
                  mx="auto"
                  p={{ base: '20px', md: '30px' }}
                  pe="20px"
                  minH="100vh"
                  pt="50px"
                  mt={{ base: "7rem" }}
                >
                  <Routes>
                    {getRoutes(AdminRoutes)}
                    <Route
                      path="/"
                      element={<Navigate to="/admin/default" replace />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Box>
              ) : null}
              <Box>
                <Footer />
              </Box>
            </Box>
          </SidebarContext.Provider>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
