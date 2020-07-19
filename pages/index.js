import * as React from 'react';
import { useState } from 'react';
import Router from 'next/router';
import { Flex, Input, IconButton, Stack, Text } from '@chakra-ui/core';

const Home = props => {
  const [search, setSearch] = useState('');
  const handleChange = e => {
    setSearch(e.target.value);
  };
  const handleSearch = () => {
    Router.push(`/${search}`);
  };
  return (
    <Flex w="100%" justifyContent="center">
      <Flex
        flex="1 0 auto"
        flexDir="column"
        textAlign="center"
        {...props}
        py={8}
        maxW={{ _: '95%', lg: '80%' }}>
        <Text as="h1" fontSize="3xl" mt={4} mb={8}>
          Find Your Progress Photos
        </Text>
        <Stack flexDir="row" spacing={4}>
          <Input
            value={search}
            onChange={handleChange}
            size="lg"
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Enter VIN Number..."
          />
          <IconButton
            ml={4}
            size="lg"
            icon="search"
            variantColor="blue"
            onClick={handleSearch}
            type="submit"
          />
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Home;
