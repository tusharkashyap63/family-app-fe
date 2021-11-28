import React, { useEffect, useState } from 'react';
import './Todos.css';
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../services/taskServices';

export default function TodosContainer() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setCurrentTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addTask({ task: currentTask });
      setTasks([...tasks, data]);
      setCurrentTask('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleupadte = async (taskId) => {
    const originalTasks = [...tasks];
    try {
      const index = tasks.findIndex((task) => task._id === taskId);
      originalTasks[index].completed = !originalTasks[index].completed;
      setTasks(originalTasks);
      await updateTask(taskId, { completed: originalTasks[index].completed });
    } catch (error) {
      setTasks(originalTasks);
      console.log(error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      setTasks(tasks.filter((task) => task._id !== taskId));
      await deleteTask(taskId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='todos-container'>
      <div className='todos-heading'>To-dos</div>
      <div className='todos-main'></div>
      <form className='todos-input-container'>
        <input
          type='text'
          className='todos-input'
          onChange={handleChange}
          value={currentTask}
        />
        <button type='submit' className='add-todo'>
          Add
        </button>
      </form>
    </div>
  );
}
