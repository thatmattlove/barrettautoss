import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Grid,
  Flex,
  Badge,
  Link,
  Text,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Skeleton,
  useDisclosure,
} from '@chakra-ui/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import lf from 'dayjs/plugin/localizedFormat';
import { getCar, getAllVins } from '../util';

dayjs.extend(utc);
dayjs.extend(lf);

const NotFound = ({ query, ...props }) => {
  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      mx="auto"
      textAlign="center"
      bg="original.red"
      {...props}>
      <Box p={6}>
        <Box mt={1} fontWeight="semibold" as="h2" fontSize="3xl" color="white">
          {`/${query} is not a thing.`}
        </Box>
      </Box>
    </Box>
  );
};

const CarPhoto = ({ photo, vin, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const { title, url, fileSize, width, height, updatedAt, fileName } = photo;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imageLoad = () => {
    setLoaded(true);
  };
  let now = new Date();
  let time = dayjs(updatedAt).utc();
  time = time.subtract(now.getTimezoneOffset(), 'minute').format('LLLL');
  return (
    <>
      <Flex
        maxW="xl"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        mx="auto"
        textAlign="center"
        alignItems="center"
        pos="relative"
        {...props}>
        <Box p={6}>
          <Link onClick={onOpen}>
            {!loaded && <Skeleton w="250px" h="200px" />}
            <Image src={url} alt={title} objectFit="contain" onLoad={imageLoad} />
          </Link>
          <Box mt={2}>
            <Text color="gray.400" fontSize="xs">
              {time.toString()}
            </Text>
          </Box>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent maxW={{ _: 'unset', lg: '80%' }} overflowX="auto" rounded="lg">
          <ModalHeader>
            <Text>{title}</Text>
            <Badge
              fontWeight="medium"
              fontFamily="mono"
              letterSpacing="0.15rem"
              variantColor="teal">
              {vin}
            </Badge>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Image src={url} alt={title} />
          </ModalBody>
          <ModalFooter>
            <IconButton
              as="a"
              href={url}
              download={fileName}
              variantColor="blue"
              mx={4}
              aria-label="Download"
              icon="arrow-down"
              target="_blank"
              rel="noopener noreferer"
            />
            <Button variant="outline" variantColor="gray" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const CarInfo = ({ owner, vin, notes, ...props }) => {
  return (
    <Box borderWidth="1px" rounded="lg" overflow="hidden" mx="auto" textAlign="center" {...props}>
      <Box p={6}>
        <Box
          mt={1}
          fontWeight="semibold"
          as="h2"
          fontSize={{ _: '2xl', lg: '3xl' }}
          fontFamily="mono"
          color="blue.500"
          letterSpacing="0.15rem">
          {vin}
        </Box>

        <Text as="h3" fontWeight="light" fontSize="2xl">
          {owner}
        </Text>

        <Box mt={2}>
          <Text color="gray.500" fontSize="sm">
            {notes}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const Car = ({ data, ...props }) => {
  const { isFallback, query } = useRouter();
  if (isFallback || data === null) {
    return <NotFound query={query.vin} />;
  }
  const { owner, vin, notes, photos } = data;
  return (
    <Box {...props}>
      <CarInfo owner={owner} vin={vin} notes={notes} />
      <Box mt={8}>
        <Grid templateColumns={{ _: 'repeat(1, 1fr)', lg: 'repeat(4, 1fr)' }} gridGap={4}>
          {photos.map(p => (
            <CarPhoto photo={p} vin={vin} key={p.title} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export const getStaticPaths = async () => {
  const allVins = await getAllVins();
  return {
    paths: allVins?.map(vin => `/${vin}`) ?? [],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const data = await getCar(params.vin);
  if (data === false) {
    return { props: { data: null } };
  }
  return { props: { data: data ?? null } };
};

export default Car;
