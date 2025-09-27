/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import {
  Box,
  Divider,
  Flex,
  IconButton,
  Image,
  Text,
  useColorMode,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';

import { MdFirstPage, MdLastPage } from 'react-icons/md';

interface Tags {
  id: number;
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
  const [collapsedSidebar, setCollapsedSidebar] = useState(false);

  const { colorMode } = useColorMode();

  const toggleSidebar = () => {
    setCollapsedSidebar(!collapsedSidebar);
  };
  return (
    <Flex
      w={collapsedSidebar ? '4%' : '15%'}
      transition={'width 0.3s ease-in-out'}
      direction={'column'}
    >
      <Flex mb={8} align={'center'} justify={'space-between'}>
        <Image
          w={10}
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
        <Text mb={2} fontSize={16} fontWeight={'semi-bold'}>
          Your Tags
        </Text>
        <TagFilters tags={tags} setTagValue={setTagValue} />
      </Box>
    </Flex>
  );
};

export default SidebarComponent;

function TagFilters({ tags, setTagValue }: SidebarComponentProps) {
  const { getRootProps, getRadioProps, value } = useRadioGroup({
    name: 'tagFilters',
    defaultValue: 'all',
  });

  const allTag = { id: 0, slug: 'all', title: '📌 All' };

  const allTags = [allTag, ...tags];

  useEffect(() => {
    setTagValue(`${value}`);
  }, [value]);

  const group = getRootProps();
  return (
    <Box {...group}>
      {allTags?.map((tag) => {
        const radio = getRadioProps({ value: `${tag.slug}` });

        return (
          <TagFilter
            value={`${value}`}
            setTagValue={setTagValue}
            key={tag.id}
            {...radio}
          >
            {tag}
          </TagFilter>
        );
      })}
    </Box>
  );
}

function TagFilter(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const select = getRadioProps();

  const { children, setTagValue } = props;
  const { slug, title } = children;

  const handleTagSelect = () => {
    setTagValue(slug);
  };

  return (
    <Box as={'label'}>
      <input {...input} />
      <Flex
        {...select}
        p={2}
        my={0.5}
        bg={'transparent'}
        cursor={'pointer'}
        fontSize={14}
        fontWeight={'semi-bold'}
        rounded={'lg'}
        _checked={{
          color: '#F68A1E',
          fontWeight: 'bold',
          bg: '#FFF',
          transition: 'all .4s ease',
        }}
        _hover={{
          color: '#F68A1E',
          fontWeight: 'bold',
          bg: '#FFF',
          transition: 'all .4s ease',
        }}
        onClick={handleTagSelect}
      >
        {title}
      </Flex>
    </Box>
  );
}
