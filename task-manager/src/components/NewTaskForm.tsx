import React, { useState } from 'react';
import { TextField, Button, MenuItem ,Typography} from '@mui/material';
import axios from 'axios';
import { Task,NewTaskFormProps } from '../types';


const NewTaskForm = ({ onTaskCreated }: NewTaskFormProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<Task['status']>('todo');

  const [error, setError] = useState(null)
    const errorDiv = error 
        ? <Typography sx={{color: 'red'}}>
            
            {error}
          </Typography> 
        : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
 
    try {
      const response = await axios.post('http://localhost:3000/tasks', { title, description, status });
      onTaskCreated(response.data);
      setTitle('');
      setDescription('');
      setStatus('todo');
    } catch (error: any) {
    	setError(error.response.data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value as Task['status'])}
      >
        <MenuItem value="todo">To Do</MenuItem>
        <MenuItem value="in_progress">In Progress</MenuItem>
        <MenuItem value="done">Done</MenuItem>
      </TextField>
      {errorDiv}
      <Button type="submit" variant="contained" color="primary">
        Create Task
      </Button>
    </form>
  );
};

export default NewTaskForm;