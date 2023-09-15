import {useState, useEffect, useRef} from "react"

function App() {

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isBarMoving, setIsBarMoving] = useState();
  const [isMouseDown, setIsMouseDown] = useState();
  const [barPos,setBarPos] = useState({x:0,y:0})
  const [brushProperties, setBrushProperties] = useState({
    size: 5,
    shape: "square",
    color: "black"
  })

  //FUNCIONES DEL MOVIMIENTO DE LA BROCHA
function handleStrokeDown (e) {
  if(isBarMoving){
    return
  }
  const x = e.nativeEvent.offsetX;
  const y = e.nativeEvent.offsetY;
  ctxRef.current.beginPath();
  ctxRef.current.moveTo(x,y)
  ctxRef.current.lineTo(x,y)
  ctxRef.current.stroke();
  setIsMouseDown(true)
}

function handleStrokeMove(e) {
  if (!isMouseDown) {
    return
  }
  const x = e.nativeEvent.offsetX;
  const y = e.nativeEvent.offsetY;
  ctxRef.current.lineTo(x,y)
  ctxRef.current.stroke();
}

function handleStrokeUp () {
  ctxRef.current.closePath();
  setIsMouseDown(false)
}

//FUNCIONES DEL MOVIMIENTO DE LA BARRA
function handleMoveBarDown() {
setIsBarMoving(!isBarMoving)
}

function moveBarMouseMove(e) {
const x = e.clientX;
const y = e.clientY;
if(e.buttons === 1){
  setBarPos({x,y}) 
}
}

function moveBarMouseUp(){
setIsBarMoving(false)
}

//function to change properties of brush
function changeBrushProperties (e) {  
setBrushProperties ( {...brushProperties, [e.target.name]:+e.target.value})
}

//function to select color
function handleSelectColor (e) {
  setBrushProperties({...brushProperties, color: e.target.style.background})
}

//function to restart 
function handleRestart () {
  ctxRef.current.reset()
}


useEffect (() => {
//effect to move the bar
if(!isBarMoving){
  return
}
const $container = document.getElementById("container")
$container.addEventListener ("mouseup", moveBarMouseUp)
$container.addEventListener ("mousemove", moveBarMouseMove)

return () => {
              $container.removeEventListener("mousemove",moveBarMouseMove), 
              $container.removeEventListener("mouseup", moveBarMouseUp)
            }

},[isBarMoving])


//USE EFFECT DE INICIO
useEffect ( ()=> {
  //set canvas properties
  const canvas = canvasRef.current
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  //create context and set initial values
  const ctx = canvas.getContext("2d");
  ctxRef.current = ctx;
},[])

useEffect ( ( ) => {
  const {size, shape, color} = brushProperties;
  ctxRef.current.lineCap = shape;
  ctxRef.current.strokeStyle = color;
  ctxRef.current.lineWidth = size;
  },[brushProperties])



  return (
    <div id="container">

        <aside 
          id="bar"
          style={{top:`${barPos.y}px`, left:`${barPos.x}px`}}>
          
          <button onMouseDown={handleMoveBarDown}>MOVE</button>
          <label>Brush Size</label>
          <input
            name="size"
            type="range"
            min={1} 
            max={20}
            step={1}
            value={brushProperties.size}
            onChange={ e => changeBrushProperties(e) }
          />
        <div className="color-btn-container">
          <button
            onClick={handleSelectColor}
            className="color-btn"
            style={{ background: "black" }}></button>
          <button
            onClick={handleSelectColor}
            className="color-btn"
            style={{ background: "white" }}></button>
          <button
            onClick={handleSelectColor}
            className="color-btn"
            style={{ background: "red" }}></button>
          <button
            onClick={handleSelectColor}
            className="color-btn"
            style={{ background: "orange" }}></button>
          <button
            onClick={handleSelectColor}
            className="color-btn"
            style={{ background: "green" }}></button>
          <button
            onClick={handleSelectColor}
            className="color-btn"
            style={{ background: "teal" }}></button>
          <button
            onClick={handleSelectColor}
            className="color-btn"
            style={{ background: "blue" }}></button>
          <button
            onClick={handleSelectColor}
            className="color-btn"
            style={{ background: "aqua" }}></button>
          <button
            onClick={handleSelectColor}
            className="color-btn"
            style={{ background: "purple" }}></button>
          <button
            onClick={handleSelectColor}
            className="color-btn"
            style={{ background: "pink" }}></button>
          <button
            onClick={handleSelectColor}
            className="color-btn"
            style={{ background: "magenta" }}></button>
          <button
            onClick={handleSelectColor}
            className="color-btn"
            style={{ background: "gray" }}></button>
        </div>

        <button onClick={handleRestart}>RESTART</button>
          

        </aside>

        <canvas id="myCanvas" 
          ref={canvasRef}
          onMouseDown={handleStrokeDown}
          onMouseMove={handleStrokeMove}
          onMouseUp={handleStrokeUp}
        ></canvas>

    </div>
  )
}

export default App
