/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import {
  Box,
  Divider,
  Flex,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';

import { MdFirstPage, MdLastPage } from 'react-icons/md';

interface Tags {
  id: number;
  theme: string;
  title: string;
  slug: string;
}

interface SidebarComponentProps {
  tags: Tags[];
  setTagValue: (value: string) => void;
}

const SidebarComponent = ({
  tags,
  setTagValue,
}: SidebarComponentProps): JSX.Element => {
  const [tagFilter, setTagFilter] = useState('all');
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const { colorMode } = useColorMode();

  const toggleSidebar = () => {
    setCollapsedSidebar(!collapsedSidebar);
  };

  useEffect(() => {
    setTagValue(tagFilter);
  }, [tagFilter]);

  return (
    <Flex
      w={collapsedSidebar ? '4%' : '15%'}
      transition={'width 0.3s ease-in-out'}
      direction={'column'}
    >
      <Flex mb={8} align={'center'} justify={'space-between'}>
        <Image
          minW={10}
          maxW={10}
          aspectRatio={1}
          src={
            colorMode === 'light' ? '/logo/icon.png' : '/logo/icon-white.png'
          }
        />
      </Flex>
      <Flex justify={collapsedSidebar ? 'flex-start' : 'flex-end'}>
        <IconButton
          onClick={toggleSidebar}
          aria-label={'collapse-sidebar'}
          variant={'outline'}
        >
          {collapsedSidebar ? <MdLastPage /> : <MdFirstPage />}
        </IconButton>
      </Flex>
      <Divider my={4} />
      <Box pb={4}>
        <Text
          display={collapsedSidebar || isMobile ? 'none' : 'block'}
          mb={2}
          fontSize={16}
          fontWeight={'semi-bold'}
        >
          Your Tags
        </Text>
        <Box>
          {tags &&
            tags.map((tag) => {
              return (
                <Flex
                  key={tag.id}
                  p={2}
                  align={'center'}
                  justify={collapsedSidebar || isMobile ? 'center' : ''}
                  color={tagFilter === tag.slug ? '#F68A1E' : ''}
                  my={0.5}
                  bg={tagFilter === tag.slug ? '#FFF' : 'transparent'}
                  cursor={'pointer'}
                  fontWeight={tagFilter === tag.slug ? 'bold' : 'semi-bold'}
                  rounded={'lg'}
                  _hover={{
                    color: '#F68A1E',
                    fontWeight: 'bold',
                    bg: '#FFF',
                    transition: 'all .4s ease',
                  }}
                  onClick={() => setTagFilter(tag.slug)}
                >
                  {collapsedSidebar || isMobile ? (
                    <Flex fontSize={14} align={'center'}>
                      <Text>{tag.theme}</Text>
                    </Flex>
                  ) : (
                    <Flex fontSize={14} align={'center'} gap={2}>
                      <Text>{tag.theme}</Text>
                      <Text>{tag.title}</Text>
                    </Flex>
                  )}
                </Flex>
              );
            })}
        </Box>
      </Box>
    </Flex>
  );
};

export default SidebarComponent;
