import { createEffect, createSignal, on, onMount } from "solid-js";
import { useAppContext } from "../context/AppContext";
import { unwrap } from "solid-js/store";



export default function LifeGrid(){
  const [options, setOptions, lifeEvents, setLifeEvents, ] = useAppContext();
  const [hoverText, setHoverText] = createSignal("");
  
  let years = () => options.yearsExpected;
  let canvas;
  let hover;

  function calcWeeksBetweenDates(fechaInicio, fechaFin) {
    const milisegundosEnUnaSemana = 7 * 24 * 60 * 60 * 1000;
    const diferenciaEnMilisegundos = fechaFin - fechaInicio;
    return Math.floor(diferenciaEnMilisegundos / milisegundosEnUnaSemana);
  }

  function addWeeksToDate(date, weeks) {
    return new Date(date.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-over'
    const size = {height: 15, width: 15};

    let canvasPadding = {x: 40, y: 15};
    const margin = {x: 10, y: 10};


    canvas.addEventListener('mousemove', (e) => {
      var rect = canvas.getBoundingClientRect();
      let mousePos = {
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top)
      };
      let xBlockLocation = (mousePos.x - canvasPadding.x) % (size.width + margin.x);
      let yBlockLocation = (mousePos.y - canvasPadding.y) % (size.height + margin.y);
      let xMouseBlockLocation = Math.round((mousePos.x - canvasPadding.x) / (size.width + margin.x));
      let yMouseBlockLocation = Math.round((mousePos.y - canvasPadding.y) / (size.height + margin.y));
      if ((xMouseBlockLocation < 0 && xMouseBlockLocation >= 52)  || yMouseBlockLocation < 0) return
      
      if (xBlockLocation <= 15 && yBlockLocation <= 15){
        console.log(canvas.getBoundingClientRect().x)
        ctx.fillStyle = "#00ff00"
        console.log("En bloque n°", xMouseBlockLocation, yMouseBlockLocation);
        console.warn(canvas.getBoundingClientRect().x)
        let top = canvas.getBoundingClientRect().y + canvasPadding.y + yMouseBlockLocation * (margin.y + size.height);
        let left = canvas.getBoundingClientRect().x + canvasPadding.x + xMouseBlockLocation * (margin.x + size.width);
        console.log(top, left)
        hover.style.left =  left + "px"
        hover.style.top = (size.height) + top + "px"

        let hoveredDate = structuredClone(options.born);
        hoveredDate.setFullYear(hoveredDate.getFullYear() + yMouseBlockLocation);
        console.log(addWeeksToDate(hoveredDate, xMouseBlockLocation * (yMouseBlockLocation == 0 ? 1 : xMouseBlockLocation)))
        let hoverStart = addWeeksToDate(hoveredDate, xMouseBlockLocation * (yMouseBlockLocation == 0 ? 1 : xMouseBlockLocation))
        let hoverEnd = addWeeksToDate(hoverStart, -1)
        console.log(hoverStart, hoverEnd)
        setHoverText(
          hoverEnd.toLocaleString() + ' - ' + hoverStart.toLocaleString() 
        )

      }
    })

    createEffect(on(years, () => {
      console.log("Updating canvas...")
      if (options.title !== ""){
        canvasPadding.y = 150; 
      }
      else {
        canvasPadding.y = 15;
      }
      canvas.height = canvasPadding.y + (years() * (size.height + margin.y) );
      // Draw content
      drawGrid();
      drawEvents(lifeEvents);
    }))

    function drawGrid() {
      
      ctx.font = "15px mono";
      ctx.textAlign = "right";
      ctx.lineWidth = "1";
      
      for (let i = 0; i < years(); i++){
        
        for (let j = 0; j < 52; j++) {
          if (options.darkMode){
            ctx.fillStyle = i % 5 == 0 ? "white": "#a0a0a0" ;
          }
          else {
            ctx.fillStyle = i % 5 == 0 ? "black": "lightgray" ;
            
          }
          ctx.fillText(
            i.toString(),
            canvasPadding.x - 10, 
            ((size.height + margin.y) * i + 14) + canvasPadding.y,
            );
          ctx.fillStyle = options.darkMode ? "black" : "white";
          ctx.strokeRect(
            canvasPadding.x + (size.width + margin.x) * j,
            canvasPadding.y + (size.height + margin.y) * i,
            size.width,
            size.height,
          );
        }

      }
    }

    function drawEvents(lifeEvents) {
      ctx.lineWidth = "1";
      lifeEvents.forEach(lifeEvent => {
        let start = calcWeeksBetweenDates(options.born, lifeEvent.startWeek);
        let end = calcWeeksBetweenDates(options.born, lifeEvent.endWeek);
        console.warn(start,end);
        for (let i = start; i <= end; i++){
          let j = Math.floor(i / 52);
          ctx.fillStyle = lifeEvent.eventColor;

          ctx.fillRect(
            canvasPadding.x + (size.width + margin.x) * (i % 52),
            (canvasPadding.y + (size.height + margin.y) * j ),
            size.width,
            size.height,
          );
          ctx.strokeRect(
            canvasPadding.x + (size.width + margin.x) * (i % 52),
            (canvasPadding.y + (size.height + margin.y) * j ),
            size.width,
            size.height,
          );
        }
      });
    }
  })

  return (
    <div>
      <Portal>
        <div ref={hover} class="fixed top-0 left-0 z-10 ">
        <div class="w-0 h-0 
          border-l-[5px] border-l-transparent
          border-b-[10px] border-b-black
          border-r-[5px] border-r-transparent">
        </div>
        <div class="bg-white w-56 h-16 border-black border">
          <h1>{hoverText()}</h1>
        </div>



        </div>
      </Portal>
      <canvas ref={canvas} id="life-grid"  width="1350" class="border border-black"></canvas>

    </div>
  )
}