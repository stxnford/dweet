import React from 'react';

import { Flex } from '@chakra-ui/react';

import TasksComponent from '@/components/tasks';

export default function Home() {
  return (
    <Flex direction={'column'}>
      <TasksComponent />
    </Flex>
  );
}
