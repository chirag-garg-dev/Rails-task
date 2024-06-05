import React, { useState } from 'react';
import { TextField, Button, MenuItem,Typography } from '@mui/material';
import axios from 'axios';
import { Task, EditTaskFormProps } from '../types';

const EditTaskForm = ({ task, onTaskUpdated }: EditTaskFormProps) => {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [status, setStatus] = useState<Task['status']>(task.status);
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
      const response = await axios.put(`http://localhost:3000/tasks/${task.id}`, { title, description, status });
      onTaskUpdated(response.data);
    } catch (error: any) {
      setError(error?.response?.data?.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
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
        Update Task
      </Button>
    </form>
  );
};

export default EditTaskForm;
