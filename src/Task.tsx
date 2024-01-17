import React from 'react';
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from 'react-icons/fa';

interface TaskProps {
  task: { _id: string; name: string; completed: boolean };
  index: number;
  deleteTask: (id: string) => void;
  editTask: (task: { _id: string; name: string; completed: boolean }) => void;
  setComplete: (task: { _id: string; name: string; completed: boolean }) => void;
}

const Task: React.FC<TaskProps> = ({ task, index, deleteTask, editTask, setComplete }) => {
  return (
    <div className={`p-2 task ${task.completed ? 'text-green-400' : 'text-orange-400'} flex space-x-4 `}>
      <p className='mx-10'>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      <p className='grow'></p>
      <div className="flex space-x-1">
        <FaCheckDouble
          color="green"
          onClick={() => {
            setComplete(task);
          }}
        />
        <FaEdit
          color="purple"
          onClick={() => {
            editTask(task);
          }}
        />
        <FaRegTrashAlt
          color="red"
          onClick={() => {
            deleteTask(task._id);
          }}
        />
      </div>
    </div>
  );
};

export default Task;
