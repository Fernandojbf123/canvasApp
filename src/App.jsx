import {useState, useEffect, useRef} from "react"

function App() {

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false)


  function handleDown (e) {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x,y)
    ctxRef.current.lineTo(x,y)
    ctxRef.current.stroke();
    setIsMouseDown(true)
  }

  function handleMove(e) {
    if (!isMouseDown) {
      return
    }

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    ctxRef.current.moveTo(x,y)
    ctxRef.current.lineTo(x,y)
    ctxRef.current.stroke();
  }

  function handleUp () {
    ctxRef.current.closePath();
    setIsMouseDown(false)
  }


  useEffect ( ()=> {
    
    //set canvas properties
    const canvas = canvasRef.current
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    //create context
    const ctx = canvas.getContext("2d");
    ctx.lineCap="round"
    ctx.strokeStyle="blue"
    ctx.lineWidth = 5;
    ctxRef.current = ctx;


  },[])


  return (
    <div id="container">

        <aside id="bar">
          <meter value={5} min={1} max={20}></meter>

        </aside>

        <canvas id="myCanvas" 
          ref={canvasRef}
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
        ></canvas>

    </div>
  )
}

export default App
