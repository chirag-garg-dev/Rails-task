import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import EditTaskForm from './components/EditTaskForm';
import { Task } from './types';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3000/tasks');
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditingTask(null);
  };

  return (
    <Container>
      <h1>Task Management Application</h1>
      <NewTaskForm onTaskCreated={handleTaskCreated} />
      {editingTask && (
        <EditTaskForm task={editingTask} onTaskUpdated={handleTaskUpdated} />
      )}
      <TaskList tasks={tasks} fetchTasks={fetchTasks} setEditingTask={setEditingTask} />
    </Container>
  );
};

export default App;























// npm install --save-dev @testing-library/react @testing-library/jest-dom jest

// Filter.test.js
// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import Filter from './Filter';

// test('renders Filter and allows selection change', () => {
//   const mockSetFilter = jest.fn();
//   render(<Filter filter="All" setFilter={mockSetFilter} />);

//   fireEvent.change(screen.getByLabelText(/Filter/i), { target: { value: 'To Do' } });
//   expect(mockSetFilter).toHaveBeenCalledWith('To Do');
// });

// -------------------------
// TaskList.test.js
// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import TaskList from './TaskList';

// const tasks = [
//   { id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do' },
//   { id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress' },
// ];

// test('renders TaskList and allows status update', () => {
//   const mockOnTaskUpdated = jest.fn();
//   const mockOnTaskDeleted = jest.fn();
//   render(<TaskList tasks={tasks} onTaskUpdated={mockOnTaskUpdated} onTaskDeleted={mockOnTaskDeleted} />);

//   fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'Done' } });
//   expect(mockOnTaskUpdated).toHaveBeenCalled();
// });

// test('allows task deletion', () => {
//   const mockOnTaskUpdated = jest.fn();
//   const mockOnTaskDeleted = jest.fn();
//   render(<TaskList tasks={tasks} onTaskUpdated={mockOnTaskUpdated} onTaskDeleted={mockOnTaskDeleted} />);

//   fireEvent.click(screen.getByText(/Delete/i));
//   expect(mockOnTaskDeleted).toHaveBeenCalled();
// });



// -----------------------

// TaskForm.test.js
// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import TaskForm from './TaskForm';

// test('renders TaskForm and submits a new task', () => {
//   const mockOnTaskCreated = jest.fn();
//   render(<TaskForm onTaskCreated={mockOnTaskCreated} totalTasks={0} todoTasks={0} />);

//   fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Task' } });
//   fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Task Description' } });
//   fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'To Do' } });
//   fireEvent.click(screen.getByText(/Create Task/i));

//   expect(mockOnTaskCreated).toHaveBeenCalled();
// });

// test('does not allow submission without a title', () => {
//   const mockOnTaskCreated = jest.fn();
//   render(<TaskForm onTaskCreated={mockOnTaskCreated} totalTasks={0} todoTasks={0} />);

//   fireEvent.click(screen.getByText(/Create Task/i));
//   expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
// });

// test('does not allow creating more "To Do" tasks if limit is reached', () => {
//   const mockOnTaskCreated = jest.fn();
//   render(<TaskForm onTaskCreated={mockOnTaskCreated} totalTasks={10} todoTasks={5} />);

//   fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Task' } });
//   fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: 'To Do' } });
//   fireEvent.click(screen.getByText(/Create Task/i));

//   expect(screen.getByText(/Cannot create more "To Do" tasks/i)).toBeInTheDocument();
// });
