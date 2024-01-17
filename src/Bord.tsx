import './App.css'
import TaskList from './TaskList'


const Bord = () => {
  return (
    <div className="relative z-10 ">
      <div className="flex overflow-y-auto">
        <TaskList />
      </div>
    </div>
  )
}

export default Bord