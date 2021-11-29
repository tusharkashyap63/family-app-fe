import React, { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import './Todos.css';
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from '../services/taskServices';
import { useChannelStateContext } from 'stream-chat-react';

export default function TodosContainer() {
  const { channel } = useChannelStateContext();
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTasks(channel.id);
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [channel.id]);

  const handleChange = (e) => {
    setCurrentTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addTask({
        task: currentTask,
        channelId: channel.id,
      });
      setTasks([...tasks, data]);
      setCurrentTask('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (taskId) => {
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
      <div className='todos-main'>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div className='task'>
              <div>
                <input
                  id={task._id}
                  name={task._id}
                  type='checkbox'
                  checked={task.completed}
                  onChange={() => handleUpdate(task._id)}
                />
                <label
                  htmlFor={task._id}
                  className={task.completed ? 'line-through' : ''}
                >
                  {task.task}
                </label>
              </div>
              <button onClick={() => handleDelete(task._id)}>
                <BiTrash />
              </button>
            </div>
          ))
        ) : (
          <p>Add tasks to get started</p>
        )}
      </div>
      <form className='todos-input-container' onSubmit={handleSubmit}>
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
