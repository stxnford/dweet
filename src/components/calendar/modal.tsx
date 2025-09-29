import React from 'react';

import {
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import Calendar from '@/components/calendar';
import { MdCalendarMonth } from 'react-icons/md';

const CalendarInModal = ({ tasks }: CalendarInModalProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bg = useColorModeValue('#EEEEEE', '#121212');
  return (
    <>
      <IconButton
        size={'sm'}
        onClick={onOpen}
        aria-label={'edit-task'}
        variant={'outline'}
      >
        <MdCalendarMonth />
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter={'blur(5px)'} />
        <ModalCloseButton />
        <ModalContent bg={bg}>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalBody>
            <Flex direction={'column'}>
              <Calendar tasks={tasks} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CalendarInModal;
