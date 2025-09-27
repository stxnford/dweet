import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { CalendarViewType, useCalendar } from '@h6s/calendar';
import { format, getDate, isToday } from 'date-fns';

import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

const Calendar = ({ tasks }: CalendarComponentProps): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTasks, setCurrentTasks] = useState<Task[]>();
  const { headers, body, month, year, navigation } = useCalendar({
    defaultViewType: CalendarViewType.Month,
  });

  const GetTasks = () => {
    if (tasks && selectedDate) {
      setCurrentTasks(
        tasks.filter((task) => moment(selectedDate).isSame(task.deadline)),
      );
    }
  };

  useEffect(() => {
    GetTasks();
  }, [selectedDate]);

  return (
    <Flex direction={'column'}>
      <Flex mb={4} justify={'space-between'} align={'center'} gap={1}>
        <Text fontWeight={'bold'}>
          {format(new Date(year, month), 'MMM yyyy')}
        </Text>
        <Flex align={'center'} gap={2}>
          <IconButton
            size={'sm'}
            onClick={navigation.toPrev}
            aria-label={'navigate-calendar-backwards'}
            variant={'outline'}
          >
            <MdArrowBackIosNew />
          </IconButton>
          <IconButton
            size={'sm'}
            onClick={navigation.toNext}
            aria-label={'navigate-calendar-forward'}
            variant={'outline'}
          >
            <MdArrowForwardIos />
          </IconButton>
        </Flex>
      </Flex>
      <Grid mb={4} templateColumns={'repeat(7, 1fr)'}>
        {headers.weekDays.map(({ key, value }) => {
          return (
            <GridItem key={key}>
              <Text fontSize={12} textAlign={'center'}>
                {format(value, 'EEEEE')}
              </Text>
            </GridItem>
          );
        })}
      </Grid>
      {body.value.map(({ key, value: days }) => {
        return (
          <Grid key={key} templateColumns={'repeat(7, 1fr)'}>
            {days.map(({ key, value }) => {
              return (
                <Flex align={'center'} justify={'center'} key={key}>
                  <CalendarDay
                    value={value}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    GetTasks={GetTasks}
                  />
                </Flex>
              );
            })}
          </Grid>
        );
      })}
      <Box>
        <Divider my={4} />
        {currentTasks &&
          currentTasks.map((ctsk) => {
            return (
              <Text mb={1} key={ctsk.id} fontSize={12}>
                {ctsk.title}
              </Text>
            );
          })}
      </Box>
    </Flex>
  );
};

export default Calendar;

const CalendarDay = ({
  value,
  selectedDate,
  setSelectedDate,
  GetTasks,
}: CalendarDayProps): JSX.Element => {
  const color = useColorModeValue('#000', '#FFF');
  const dayBorderColor = useColorModeValue('#EEEEEE', '#121212');

  return (
    <GridItem
      onClick={() => {
        setSelectedDate(value);
        GetTasks();
      }}
      cursor={'pointer'}
      fontSize={12}
      fontWeight={isToday(value) ? 'bold' : 'normal'}
    >
      <Flex
        align={'center'}
        justify={'center'}
        w={6}
        bg={isToday(value) ? '#F68A1E' : 'none'}
        border={'1px solid'}
        borderColor={
          moment(value).isSame(selectedDate, 'day') ? '#F68A1E' : dayBorderColor
        }
        _hover={{
          borderColor: '#F68A1E',
        }}
        aspectRatio={1}
        rounded={'full'}
      >
        <Text color={color}>{getDate(value)}</Text>
      </Flex>
    </GridItem>
  );
};
