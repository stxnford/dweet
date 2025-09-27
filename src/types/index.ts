type Priority = 'high' | 'medium' | 'low';

type Tag = 'work' | 'learning' | 'hobbies';

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  isCompleted: boolean;
  priority: string | Priority;
  tag: string | Tag;
}

interface CalendarComponentProps {
  tasks: Task[];
}

interface TaskComponentProps {
  task: Task;
  whenCompleted: (id: number, isCompleted: boolean) => void;
  whenUpdated: (updatedTask: Task) => void;
  whenDeleted: (rejectedId: number) => void;
}

interface EditTaskComponentProps {
  task: Task;
  editTask: (task: Task) => void;
}

interface AddTaskComponentProps {
  createTask: (task: Task) => void;
}

interface PrioritiesProps {
  id: number;
  title: string;
  slug: string;
}

interface CalendarDayProps {
  value: Date;
  selectedDate: Date;
  setSelectedDate: (value: Date) => void;
  GetTasks: () => void;
}
