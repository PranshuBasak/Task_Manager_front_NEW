// import { ToastContainer } from 'react-toastify';
import './App.css'
import Bord from './Bord';

function App() {
  function lines() {
    let sizeW = Math.random() * 22;
    let duration = Math.random() * 3;
    let e = document.createElement("div");
    e.setAttribute("class", "circle");
    document.body.appendChild(e);
    e.style.width = 12 + sizeW + "px";
    e.style.left = Math.random() * +innerWidth + "px";
    e.style.animationDuration = 2 + duration + "s";
  
    setTimeout(function () {
      document.body.removeChild(e);
    }, 5000);
  }
  setInterval(function () {
    lines();
  }, 200);

  return (
    <>
      <div className="relative z-10 app">
        <Bord></Bord>
      </div>
      
    </>
  )
}

export default App
