import React, { useState } from 'react';
import { Grid, Card,Box, CardContent, Typography, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { Task,TaskListProps } from '../types';

const TaskList = ({ tasks, fetchTasks, setEditingTask }: TaskListProps) => {
  const [filter, setFilter] = useState<'all' | 'todo' | 'in_progress' | 'done'>('all');

  const handleStatusChange = async (task: Task, status: Task['status']) => {
    try {
      await axios.put(`http://localhost:3000/tasks/${task.id}`, { ...task, status });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  return (
     <>
      <Box sx={{ mb: 2 }}>
    <Select value={filter} onChange={(e: SelectChangeEvent<typeof filter>) => setFilter(e.target.value as typeof filter)}>
      <MenuItem value="all">All</MenuItem>
      <MenuItem value="todo">To Do</MenuItem>
      <MenuItem value="in_progress">In Progress</MenuItem>
      <MenuItem value="done">Done</MenuItem>
    </Select>
     </Box>
    <Grid container spacing={2}>
      {filteredTasks.map(task => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2" color="textSecondary">{task.description}</Typography>
              <Select
                value={task.status}
                onChange={(e: SelectChangeEvent<typeof task.status>) => handleStatusChange(task, e.target.value as typeof task.status)}
                fullWidth
                sx={{ my: 2 }} // Add margin to the Select element for spacing
              >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="contained" color="primary" onClick={() => setEditingTask(task)}>
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(task.id)}>
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
  );
};

export default TaskList;