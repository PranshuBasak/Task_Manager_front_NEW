import React, { useEffect, useState } from 'react';
import Task from './Task';
import { toast } from 'react-toastify';
import axios from 'axios';
import loadingImg from "./assets/loader.gif";
import TaskForm from './TaskFrom';

interface TaskListProps {}

interface TaskData {
  _id: string;
  name: string;
  completed: boolean;
}

const TaskList: React.FC<TaskListProps> = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [completedTask, setCompletedTask] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string; completed: boolean }>({
    name: '',
    completed: false,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [taskID, setTaskID] = useState<string | null>(null);

  const { name } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const URL = "https://taskmanager-api-cg5w.onrender.com"
  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input form cannot be empty");
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      toast.success("Task added successfully");
      setFormData({ name: "", completed: false });
      getTasks();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<TaskData[]>(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      toast.warn("Task deleted");
      getTasks();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const editTask = async (task: TaskData) => {
    setFormData({ name: task.name, completed: false });
    setTaskID(task._id);
    setIsEdit(true);
  };

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Empty Task cannot be added");
    }
    try {
      await axios.put(`${URL}/api/tasks/${taskID}`, formData);
      toast.info("Task Edited");
      setFormData({ name: "", completed: false });
      setIsEdit(false);
      getTasks();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const setComplete = async (task: TaskData) => {
    const newData = {
      name: task.name,
      completed: true,
    };

    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newData);
      getTasks();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTask(cTask);
  }, [tasks]);

  return (
    <div className='bg-slate-950 rounded-xl p-10 flex-auto'>
      <h2 className='text-3xl'>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEdit}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
        <div className='flex space-x-4'>
          <p className='grow'>
            <b>Total Tasks: </b> {tasks.length}
          </p>
          <p className='grow'>
            <b>Completed Task: </b> {completedTask.length}
          </p>
        </div>
      )}
      <hr />
      {isLoading && (
        <div className='.--flex-center'>
          <img src={loadingImg} alt="loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className='--py'>No Task Found, Add a Task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                editTask={editTask}
                setComplete={setComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
