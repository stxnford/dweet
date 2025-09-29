/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Input,
  Text,
  Wrap,
  defineStyle,
  useColorMode,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

import Sidebar from '@/components/layouts/sidebar';
import AddTask from '@/components/tasks/add-task';
import Task from '@/components/tasks/task';
import Skeleton from '@/components/tasks/skeleton';
import Calendar from '@/components/calendar';
import CalendarInModal from '@/components/calendar/modal';

import { delay, paginate } from '@/helpers';

import { tasks } from '@/data/tasks';
import { tags } from '@/data/tags';

const Tasks: React.FC = () => {
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const [searched, setSearched] = useState<Task[]>([]);
  const [searching, setSearching] = useState('');
  const [tagFilterValue, setTagFilterValue] = useState<string>('all');
  const [tagsFilters] = useState(tags);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);

  const toast = useToast();

  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log({ tasksData }, 'tasksData');
    if (tasksData.length) {
      const filtering = tasksData.filter((task) => {
        const searchedTasks =
          !searching ||
          task.title.toLowerCase().includes(searching.toLowerCase()) ||
          task.description.toLowerCase().includes(searching.toLowerCase());

        const taskTags =
          tagFilterValue.toLowerCase() === 'all' ||
          task.tag.toLowerCase().includes(tagFilterValue.toLowerCase());

        return searchedTasks && taskTags;
      });

      setSearched(filtering);
    }
  }, [isLoading, searching, tagFilterValue]);

  const fetchTasks = async () => {
    setIsLoading(true);
    await delay(2000);
    setTasksData(tasks);
    setIsLoading(false);
  };

  const handleTaskCompletion = async (taskId: number, completed: boolean) => {
    setIsLoading(true);
    if (tasksData) {
      const newestTasks = tasksData.map((tsk) => {
        if (tsk.id === taskId) {
          return { ...tsk, isCompleted: completed };
        }
        return tsk;
      });
      setTasksData(newestTasks);
      await delay(2000);
    }
    setIsLoading(false);
  };

  const handleTaskUpdate = async (updatedTask: Task) => {
    setIsLoading(true);
    if (tasksData) {
      const newestTasks = tasksData.map((tsk) => {
        if (tsk.id === updatedTask.id) {
          return updatedTask;
        }
        return tsk;
      });
      setTasksData(newestTasks);
      await delay(2000);
    }
    setIsLoading(false);
  };

  const handleTaskDeletion = async (rejectedId: number) => {
    setIsLoading(true);
    if (tasksData) {
      const newestTasks = tasksData.filter((tsk) => tsk.id !== rejectedId);
      setTasksData(newestTasks);
      await delay(2000);
      toast({
        title: 'Success.',
        description: 'Successfully deleted the task.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  const handleCreateTask = async (newTask: Task) => {
    console.log({ newTask });
    setIsLoading(true);
    if (tasksData) {
      const newestTask = {
        ...newTask,
        id: tasksData.length + 1,
      };
      console.log({ newestTask });
      setTasksData([...tasksData, newestTask]);
      await delay(2000);
    }
    setIsLoading(false);
  };

  const handleSearching = (e: ChangeEvent<HTMLInputElement>) => {
    setSearching(e.target.value);
    setPage(1);
  };

  const onTagsFilter = (value: string) => {
    setTagFilterValue(value);
  };

  const paginated = paginate(searched, page, perPage);

  const bg = useColorModeValue('#EEEEEE', '#121212');
  const secBg = useColorModeValue('#FFF', '#3B3B3B');
  const trim = useColorModeValue('#D3D3D3', '#2D2D2D');

  const avatarRing = defineStyle({
    outlineWidth: '2px',
    outlineColor: '#F68A1E',
    outlineOffset: '2px',
    outlineStyle: 'solid',
  });

  return (
    <Flex
      px={{ base: 2, md: 8 }}
      bg={bg}
      minH={'100vh'}
      direction={'column'}
      w={'full'}
    >
      <Flex mt={8} gap={4}>
        <Sidebar tags={tagsFilters} setTagValue={onTagsFilter} />
        <Flex flexGrow={1} direction={'column'} w={'full'}>
          <Flex w={'full'} mb={8} align={'center'} justify={'space-between'}>
            <Flex align={'center'} flex={{ base: 0.65, md: '0.3' }} gap={2}>
              <Input
                variant={'subtle'}
                placeholder={'Search tasks'}
                fontSize={14}
                onChange={handleSearching}
                value={searching}
              />
            </Flex>
            <Flex align={'center'} gap={{ base: 2, md: 4 }}>
              <IconButton
                aria-label={'color-mode-switch'}
                onClick={toggleColorMode}
                variant={'outline'}
              >
                {colorMode === 'light' ? (
                  <MdDarkMode />
                ) : (
                  <MdOutlineLightMode />
                )}
              </IconButton>
              <Flex display={{ base: 'flex', md: 'none' }}>
                <CalendarInModal tasks={tasksData} />
              </Flex>
              <Flex align={'center'}>
                <Avatar
                  width={10}
                  height={10}
                  css={avatarRing}
                  name={'stxnford'}
                  variant={'outline'}
                />
              </Flex>
            </Flex>
          </Flex>
          <Grid templateColumns={'4fr 1fr'} gap={4}>
            <GridItem>
              <Box
                p={4}
                rounded={'xl'}
                border={'1px solid'}
                borderColor={trim}
                minH={'75vh'}
                bg={secBg}
              >
                <Flex align={'center'} justify={'space-between'}>
                  <Text fontSize={18} fontWeight={'bold'}>
                    All Tasks
                  </Text>
                  <AddTask createTask={handleCreateTask} />
                </Flex>
                <Grid
                  mt={4}
                  flexGrow={1}
                  fontSize={14}
                  fontWeight={'bold'}
                  templateColumns={'3fr 1fr 1fr 1fr'}
                  gap={2}
                >
                  <GridItem>
                    <Text>Task Name</Text>
                  </GridItem>
                  <GridItem>
                    <Text>Status</Text>
                  </GridItem>
                  <GridItem>
                    <Text>Priority</Text>
                  </GridItem>
                  <GridItem>
                    <Text>Actions</Text>
                  </GridItem>
                </Grid>

                {isLoading && !tasksData.length ? (
                  <Box>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Box>
                ) : (
                  <Flex direction={'column'}>
                    {tasks &&
                      paginated.map((task: Task) => {
                        return (
                          <Task
                            key={task.id}
                            task={task}
                            whenCompleted={handleTaskCompletion}
                            whenUpdated={handleTaskUpdate}
                            whenDeleted={handleTaskDeletion}
                          />
                        );
                      })}
                  </Flex>
                )}
              </Box>
              <Box mt={4}>
                <Wrap justify={'center'} spacing={2}>
                  {[...Array(Math.ceil(searched.length / perPage)).keys()].map(
                    (pg: number) => (
                      <Flex
                        bg={page === pg + 1 ? '#F68A1E' : 'transparent'}
                        w={10}
                        align={'center'}
                        justify={'center'}
                        aspectRatio={1}
                        rounded={'md'}
                        transition={'all .4s ease'}
                        key={pg}
                      >
                        <Text
                          onClick={() => setPage(pg + 1)}
                          px={4}
                          py={2}
                          cursor={'pointer'}
                          fontSize={14}
                          fontWeight={page === pg + 1 ? 'bold' : 'normal'}
                          color={page === pg + 1 ? '#FFF' : ''}
                        >
                          {pg + 1}
                        </Text>
                      </Flex>
                    ),
                  )}
                </Wrap>
              </Box>
            </GridItem>
            <GridItem>
              <Box display={{ base: 'none', md: 'block' }}>
                <Calendar tasks={tasksData} />
              </Box>
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Tasks;
