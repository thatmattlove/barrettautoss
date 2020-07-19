import * as React from 'react';
import { Box, CSSReset, Flex, Link, Stack, ThemeProvider, Text } from '@chakra-ui/core';
import { makeTheme } from '../util/theme';

const modifiedTheme = makeTheme({
  colors: {
    blue: '#284ba4',
    teal: '#1EFFBC',
    red: '#ED474A',
    green: '#659B5E',
    yellow: '#E7E247',
    orange: '#FF8C42',
  },
  fonts: {
    body: 'Inter',
    headings: 'Inter',
    mono: 'Fira Code',
  },
});

const SiteContainer = props => {
  return <Box className="site-container" minH="100vh" h="100%" {...props} />;
};

const Header = ({ children, props }) => (
  <Box
    top={0}
    left={0}
    right={0}
    zIndex={4}
    pos="fixed"
    as="header"
    width="full"
    bg="white"
    textAlign="center"
    height={[32, 32, 24]}
    {...props}>
    <Link href="/" _hover={{ textDecoration: 'none' }}>
      <Text as="h1" fontSize={{ _: '3xl', lg: '5xl' }} fontWeight="bold" marginTop={4}>
        {children}
      </Text>
    </Link>
  </Box>
);

const Main = props => (
  <Box
    as="main"
    mx={{ sm: 2, md: 2, lg: 20, xl: 32 }}
    px={[2, 2, 5]}
    overflowX="hidden"
    {...props}
  />
);

const Content = props => <Box mt={48} minH="70vh" {...props} />;

const Footer = props => {
  return (
    <Box as="footer" mb={12} pt={12} pb={4} {...props}>
      <Stack
        flexDir={{ sm: 'column-reverse', md: 'column-reverse', lg: 'row', xl: 'row' }}
        fontSize="xs"
        justify="center"
        alignItems="center"
        flex="1 0 100%">
        <Flex justifyItems="center" my={{ sm: 6, md: 6, lg: 0, xl: 0 }}>
          <Stack>
            <Stack justifyContent="center" isInline></Stack>
            <Text fontWeight="medium" color="gray.400" whiteSpace="nowrap">
              {`Copyright © ${new Date().getFullYear()} `}
              <Text as="span">Barrett Automotive Speed Shop</Text>
            </Text>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
};

export const Layout = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={modifiedTheme}>
      <CSSReset />
      <SiteContainer>
        <Header>Barrett Automotive Speed Shop</Header>
        <Main>
          <Content>{children}</Content>
        </Main>
        <Footer />
      </SiteContainer>
    </ThemeProvider>
  );
};
