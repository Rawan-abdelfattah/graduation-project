import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Link,
  Menu,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import IconBox from "components/admin/icons/IconBox";
import { HorizonLogo } from "components/admin/icons/Icons";
import { SidebarResponsive } from "components/admin/sidebar/Sidebar";
import { SidebarContext } from "contexts/SidebarContext";

// Assets
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import AdminRoutes from "routes/AdminRoutes";

export default function AuthNavbar(props) {
  const { logo, logoText, secondary, sidebarWidth, ...rest } = props;
  const { colorMode } = useColorMode();
  // Menu States
  const {
    isOpen: isOpenAuth,
    onOpen: onOpenAuth,
    onClose: onCloseAuth,
  } = useDisclosure();
  const {
    isOpen: isOpenDashboards,
    onOpen: onOpenDashboards,
    onClose: onCloseDashboards,
  } = useDisclosure();
  const {
    isOpen: isOpenMain,
    onOpen: onOpenMain,
    onClose: onCloseMain,
  } = useDisclosure();
  const {
    isOpen: isOpenNft,
    onOpen: onOpenNft,
    onClose: onCloseNft,
  } = useDisclosure();
  // Menus
  function getLinks(routeName) {
    let foundRoute = AdminRoutes.filter(function (route) {
      return route.items && route.name === routeName;
    });
    console.log(foundRoute);
    return foundRoute[0].items;
  }
  function getLinksCollapse(routeName) {
    let foundRoute = AdminRoutes.filter(function (route) {
      return route.items && route.name === routeName;
    });

    let foundLinks = foundRoute[0].items.filter(function (link) {
      return link.collapse === true;
    });

    return foundLinks;
  }
  let authObject = getLinksCollapse("Authentication");
  let mainObject = getLinksCollapse("Main Pages");
  let dashboardsObject = getLinks("Dashboards");
  let nftsObject = getLinks("NFTs");
  let logoColor = useColorModeValue("white", "white");
  // Chakra color mode

  const textColor = useColorModeValue("navy.700", "white");
  let menuBg = useColorModeValue("white", "navy.900");
  let mainText = "#fff";
  let navbarBg = "none";
  let navbarShadow = "initial";
  let bgButton = "white";
  let colorButton = "brand.500";
  let navbarPosition = "absolute";

  let brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      target='_blank'
      display='flex'
      lineHeight='100%'
      fontWeight='bold'
      justifyContent='center'
      alignItems='center'
      color={mainText}>
      <Stack direction='row' spacing='12px' align='center' justify='center'>
        <HorizonLogo h='26px' w='175px' color={logoColor} />
      </Stack>
      <Text fontsize='sm' mt='3px'>
        {logoText}
      </Text>
    </Link>
  );
  if (props.secondary === true) {
    brand = (
      <Link
        minW='175px'
        href={`${process.env.PUBLIC_URL}/#/`}
        target='_blank'
        display='flex'
        lineHeight='100%'
        fontWeight='bold'
        justifyContent='center'
        alignItems='center'
        color={mainText}>
        <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} />
      </Link>
    );
    // mainText = useColorModeValue("gray.700", "gray.200");
    // navbarBg = useColorModeValue("white", "navy.800");
    // navbarShadow = useColorModeValue(
    //   "0px 7px 23px rgba(0, 0, 0, 0.05)",
    //   "none"
    // );
    // bgButton = useColorModeValue("gray.700", "white");
    // colorButton = useColorModeValue("white", "gray.700");
    // navbarPosition = "fixed";
  }
  const createNftsLinks = (AdminRoutes) => {
    return AdminRoutes.map((link, key) => {
      return (
        <NavLink
          key={key}
          className={link.className}
          to={link.layout + link.path}
          style={{ maxWidth: "max-content", marginLeft: "40px" }}>
          <Text color='gray.400' fontSize='sm' fontWeight='normal'>
            {link.name}
          </Text>
        </NavLink>
      );
    });
  };
  const createDashboardsLinks = (AdminRoutes) => {
    return AdminRoutes.map((link, key) => {
      return (
        <NavLink
          key={key}
          to={link.layout + link.path}
          style={{ maxWidth: "max-content", marginLeft: "40px" }}>
          <Text color='gray.400' fontSize='sm' fontWeight='normal'>
            {link.name}
          </Text>
        </NavLink>
      );
    });
  };
  const createMainLinks = (AdminRoutes) => {
    return AdminRoutes.map((link, key) => {
      if (link.collapse === true) {
        return (
          <Stack key={key} direction='column' maxW='max-content'>
            <Stack
              direction='row'
              spacing='0px'
              align='center'
              cursor='default'>
              <IconBox bg='brand.500' h='30px' w='30px' me='10px'>
                {link.icon}
              </IconBox>
              <Text fontWeight='bold' fontSize='md' me='auto' color={textColor}>
                {link.name}
              </Text>
              <Icon
                as={GoChevronRight}
                color={mainText}
                w='14px'
                h='14px'
                fontWeight='2000'
              />
            </Stack>
            <Stack direction='column' bg={menuBg}>
              {createMainLinks(link.items)}
            </Stack>
          </Stack>
        );
      } else {
        return (
          <NavLink
            key={key}
            to={link.layout + link.path}
            style={{ maxWidth: "max-content", marginLeft: "40px" }}>
            <Text color='gray.400' fontSize='sm' fontWeight='normal'>
              {link.name}
            </Text>
          </NavLink>
        );
      }
    });
  };
  const createAuthLinks = (AdminRoutes) => {
    return AdminRoutes.map((link, key) => {
      if (link.collapse === true) {
        return (
          <Stack key={key} direction='column' my='auto' maxW='max-content'>
            <Stack
              direction='row'
              spacing='0px'
              align='center'
              cursor='default'
              w='max-content'>
              <IconBox bg='brand.500' h='30px' w='30px' me='10px'>
                {link.icon}
              </IconBox>
              <Text fontWeight='bold' fontSize='md' me='auto' color={textColor}>
                {link.name}
              </Text>
              <Icon
                as={GoChevronRight}
                color={mainText}
                w='14px'
                h='14px'
                fontWeight='2000'
              />
            </Stack>
            <Stack direction='column' bg={menuBg}>
              {createAuthLinks(link.items)}
            </Stack>
          </Stack>
        );
      } else {
        return (
          <NavLink
            key={key}
            to={link.layout + link.path}
            style={{ maxWidth: "max-content", marginLeft: "40px" }}>
            <Text color='gray.400' fontSize='sm' fontWeight='normal'>
              {link.name}
            </Text>
          </NavLink>
        );
      }
    });
  };
  const linksAuth = (
    <HStack display={{ base: "none", md: "flex" }} spacing='12px'>
      {AdminRoutes.filter(route => !route.className).map((route, index) => (
        <NavLink
          key={index}
          to={route.layout + route.path}
          style={{ maxWidth: "max-content" }}>
          <Text color='gray.400' fontSize='sm' fontWeight='normal'>
            {route.name}
          </Text>
        </NavLink>
      ))}
    </HStack>
  );

  return (
    <SidebarContext.Provider value={{ sidebarWidth }}>
      <Flex
        position={navbarPosition}
        top='16px'
        left='50%'
        transform='translate(-50%, 0px)'
        background={navbarBg}
        boxShadow={navbarShadow}
        borderRadius='15px'
        px='16px'
        py='22px'
        mx='auto'
        width='1044px'
        maxW='90%'
        alignItems='center'
        zIndex='3'>
        <Flex w='100%' justifyContent={{ sm: "start", lg: "space-between" }}>
          {brand}
          <Box
            ms={{ base: "auto", lg: "0px" }}
            display={{ base: "flex", lg: "none" }}
            justifyContent='center'
            alignItems='center'>
            <SidebarResponsive
              logo={
                <Stack
                  direction='row'
                  spacing='12px'
                  align='center'
                  justify='center'>
                  <Box
                    w='1px'
                    h='20px'
                    bg={colorMode === "dark" ? "white" : "gray.700"}
                  />
                </Stack>
              }
              logoText={props.logoText}
              secondary={props.secondary}
              AdminRoutes={AdminRoutes}
              {...rest}
            />
          </Box>
          {linksAuth}
          <Link href='https://www.horizon-ui.com/pro'>
            <Button
              bg={bgButton}
              color={colorButton}
              fontSize='xs'
              variant='no-effects'
              borderRadius='50px'
              px='45px'
              display={{
                sm: "none",
                lg: "flex",
              }}>
              Buy Now
            </Button>
          </Link>
        </Flex>
      </Flex>
    </SidebarContext.Provider>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};
