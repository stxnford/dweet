import React, { useRef, useState } from 'react';
import { Formik, Form, FormikProps, FormikTouched } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { MdAdd } from 'react-icons/md';

import { delay } from '@/helpers';

import { priorities } from '@/data/priorities';
import { tags } from '@/data/tags';

interface AddTaskFormValues {
  title: string;
  description: string;
  deadline: string;
}

const AddTaskComponent = ({
  createTask,
}: AddTaskComponentProps): JSX.Element => {
  const [priority, setPriority] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const formRef = useRef<FormikProps<AddTaskFormValues>>(null);

  const bg = useColorModeValue('#EEEEEE', '#121212');

  const taskSchema = Yup.object().shape({
    title: Yup.string().required('Task title is required.'),
    description: Yup.string().required('Task description is required.'),
    deadline: Yup.date().required(
      'Provide a due date in the format YYYY-MM-DD.',
    ),
  });

  const handlePrioritySetting = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPriority(event.target.value);
  };

  const handleTagSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTag(event.target.value);
  };

  const onCreateTask = async () => {
    setIsLoading(true);
    if (formRef.current) {
      const tsk = formRef.current;
      const errors = await tsk.validateForm();
      const touchedAsErrors = errors as FormikTouched<AddTaskFormValues>;
      await tsk.setTouched(touchedAsErrors);

      if (Object.values(errors).length) {
        tsk.setFieldError(
          'createTaskError',
          'Please confirm all fields before submitting.',
        );
        toast({
          title: 'Create Task Error.',
          description: 'Confirm all fields before submitting.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      createTask({
        ...tsk.values,
        isCompleted: false,
        priority: priority,
        tag: selectedTag,
        id: 0,
      });
      await delay(2000);
      toast({
        title: 'Success.',
        description: 'Successfully created new task.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      await tsk.resetForm();
      setIsLoading(false);
      onClose();
    }
  };
  return (
    <>
      <Button
        bg={'#F68A1E'}
        border={'1px solid'}
        _hover={{ bg: 'transparent', color: '#F68A1E' }}
        borderColor={'#F68A1E'}
        size={'sm'}
        onClick={onOpen}
      >
        New Task <MdAdd />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter={'blur(5px)'} />
        <ModalCloseButton />
        <ModalContent bg={bg}>
          <ModalHeader>New Task</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                title: '',
                description: '',
                deadline: '',
              }}
              onSubmit={(values, actions) => {
                console.log({ values, actions });
              }}
              validationSchema={taskSchema}
              innerRef={formRef}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <FormControl mb={4}>
                    <FormLabel fontWeight={'bold'} fontSize={12}>
                      Title
                    </FormLabel>
                    <Input
                      type={'text'}
                      variant={'subtle'}
                      fontSize={14}
                      name={'title'}
                      value={values.title}
                      placeholder={'Task title...'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.title && errors.title ? (
                      <Text textAlign={'left'} color={'red'} fontSize={12}>
                        {errors.title}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel fontWeight={'bold'} fontSize={12}>
                      Description
                    </FormLabel>
                    <Input
                      type={'text'}
                      variant={'subtle'}
                      fontSize={14}
                      name={'description'}
                      value={values.description}
                      placeholder={'Description...'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.description && errors.description ? (
                      <Text textAlign={'left'} color={'red'} fontSize={12}>
                        {errors.description}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel fontWeight={'bold'} fontSize={12}>
                      Date Due
                    </FormLabel>
                    <Input
                      type={'text'}
                      variant={'subtle'}
                      fontSize={14}
                      name={'deadline'}
                      value={values.deadline}
                      placeholder={'YYYY-MM-DD'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.deadline && errors.deadline ? (
                      <Text textAlign={'left'} color={'red'} fontSize={12}>
                        {errors.deadline}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel fontWeight={'bold'} fontSize={12}>
                      Priority
                    </FormLabel>
                    <RadioGroup variant={'subtle'} name={'tags'}>
                      <Stack direction={'row'}>
                        {priorities &&
                          priorities.map((priority: PrioritiesProps) => {
                            return (
                              <Radio
                                key={priority.id}
                                onChange={handlePrioritySetting}
                                fontSize={14}
                                value={priority.slug}
                              >
                                {priority.title}
                              </Radio>
                            );
                          })}
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel fontWeight={'bold'} fontSize={12}>
                      Tag
                    </FormLabel>
                    <RadioGroup variant={'subtle'} name={'tag'}>
                      <Stack direction={'row'}>
                        {tags &&
                          tags.map((tag) => {
                            return (
                              <Radio
                                key={tag.id}
                                onChange={handleTagSelect}
                                fontSize={14}
                                value={tag.slug}
                              >
                                {tag.title}
                              </Radio>
                            );
                          })}
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  <Button
                    bg={'#F68A1E'}
                    mb={4}
                    isLoading={isLoading}
                    loadingText={'Saving...'}
                    border={'1px solid'}
                    _hover={{ bg: 'transparent', color: '#F68A1E' }}
                    borderColor={'#F68A1E'}
                    size={'sm'}
                    onClick={onCreateTask}
                  >
                    Add Task
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTaskComponent;
