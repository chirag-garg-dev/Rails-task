export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
}

export interface TaskListProps {
  tasks: Task[];
  fetchTasks: () => void;
  setEditingTask: (task: Task) => void;
}
 
export interface NewTaskFormProps {
  onTaskCreated: (task: Task) => void;
}

export interface EditTaskFormProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
}
