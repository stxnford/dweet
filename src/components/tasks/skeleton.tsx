import React from 'react';

import { Flex, Grid, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const SkeletonComponent = () => {
  return (
    <Grid mt={6} templateColumns={'3fr 1fr 1fr 1fr'}>
      <Flex align={'center'} gap={2}>
        <SkeletonCircle size={'4'} />
        <Flex direction={'column'} w={'full'} gap={2}>
          <Skeleton width={'20%'} height={2} />
          <Skeleton width={'15%'} height={2} />
          <Flex align={'center'} gap={4}>
            <Skeleton width={'35%'} height={2} />
            <Skeleton width={'25%'} height={2} />
          </Flex>
          <Skeleton width={'45%'} height={2} />
        </Flex>
      </Flex>
      <Skeleton width={'60%'} height={2} />
      <Skeleton width={'60%'} height={2} />
      <Flex align={'center'} gap={2}>
        <SkeletonCircle size={'6'} />
        <SkeletonCircle size={'6'} />
      </Flex>
    </Grid>
  );
};

export default SkeletonComponent;
