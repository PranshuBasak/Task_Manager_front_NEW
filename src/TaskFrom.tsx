interface TaskFormProps {
  createTask: (e: React.FormEvent) => void;
  updateTask: (e: React.FormEvent) => void;
  name: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ createTask, updateTask, name, handleInputChange, isEditing }) => {
  return (
    <form className=" py-3 flex" onSubmit={isEditing ? updateTask : createTask}>
      <input type="text" placeholder=" Add a task" name="name" value={name} onChange={handleInputChange} className="rounded p-1 shadow-md shadow-orange-500/50 hover:shadow-orange-500 mix-blend-normal grow"/>
      <button type="submit" 
      className={` ml-10 py-1 ring-2 ring-red-500 outline outline-offset-1 outline-red-500 ${isEditing ? 'text-sky-100 bg-indigo-700  hover:bg-indigo-500' : 'text-orange-100 bg-orange-700  hover:bg-orange-500'}`}
      >{isEditing ? 'Edit' : 'Add' }</button>
    </form>
  );
};

export default TaskForm;
