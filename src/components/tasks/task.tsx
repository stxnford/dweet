import React, { useEffect, useState } from 'react';

import moment from 'moment';

import {
  Badge,
  Box,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Text,
} from '@chakra-ui/react';

import { MdDelete } from 'react-icons/md';

import EditTask from '@/components/tasks/edit-task';

const TaskComponent = ({
  task,
  whenCompleted,
  whenUpdated,
  whenDeleted,
}: TaskComponentProps): JSX.Element => {
  const [completed, setCompleted] = useState(task.isCompleted);
  const getDateRef = (date: string) => {
    moment.locale('en', {
      calendar: {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        sameElse: 'D MMM YYYY',
      },
    });
    return moment(date).calendar();
  };

  useEffect(() => {
    setCompleted(task.isCompleted);
  }, [task]);

  const handleTaskUpdate = (newTask: Task) => {
    whenUpdated(newTask);
  };

  const handleDeletion = () => {
    whenDeleted(task.id);
  };

  const handleCompletion = (event: React.ChangeEvent<HTMLInputElement>) => {
    whenCompleted(task.id, event.target.checked);
  };

  return (
    <Flex mt={4} w={'full'} key={task.id}>
      <Grid py={0.5} flexGrow={1} templateColumns={'3fr 1fr 1fr 1fr'} gap={2}>
        <GridItem>
          <Flex align={'center'} gap={2}>
            <Checkbox
              colorScheme={'orange'}
              isChecked={completed}
              onChange={handleCompletion}
            />
            <Box>
              <Flex align={'center'} gap={1}>
                <Text fontSize={14} fontWeight={'bold'}>
                  {task.title}
                </Text>
                <Badge>{task.tag}</Badge>
              </Flex>
              <Text fontSize={10} color={'#F68A1E'} fontWeight={'bold'}>
                {getDateRef(task.deadline)}
              </Text>
              <Text fontSize={12}>{task.description}</Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem>
          <Badge colorScheme={task.isCompleted ? 'green' : 'gray'}>
            {task.isCompleted ? 'Completed' : 'Pending'}
          </Badge>
        </GridItem>
        <GridItem>
          <Badge
            colorScheme={
              task.priority === 'high'
                ? 'red'
                : task.priority === 'medium'
                  ? 'orange'
                  : 'blue'
            }
          >
            {task.priority}
          </Badge>
        </GridItem>
        <GridItem>
          <Flex align={'center'} gap={2}>
            <EditTask task={task} editTask={handleTaskUpdate} />
            <IconButton
              size={'sm'}
              colorScheme={'red'}
              onClick={handleDeletion}
              aria-label={'delete-task'}
              variant={'outline'}
            >
              <MdDelete />
            </IconButton>
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default TaskComponent;
