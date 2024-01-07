import { createEffect, on, onMount } from "solid-js";
import { useAppContext } from "../context/AppContext";
import { unwrap } from "solid-js/store";



export default function LifeGrid(){
  const [options, setOptions, lifeEvents, setLifeEvents, ] = useAppContext();

  
  let years = () => options.yearsExpected;
  let canvas;

  function calcWeeksBetweenDates(fechaInicio, fechaFin) {
    const milisegundosEnUnaSemana = 7 * 24 * 60 * 60 * 1000;
    const diferenciaEnMilisegundos = fechaFin - fechaInicio;
    return Math.floor(diferenciaEnMilisegundos / milisegundosEnUnaSemana);
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
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
      if (yBlockLocation <= 0  || yBlockLocation <= 0) return
      
      if (xBlockLocation <= 15 && yBlockLocation <= 15){
        console.log("En bloque n°", xMouseBlockLocation, yMouseBlockLocation);
      }
    })

    createEffect(on(years, () => {
      console.log("Updating canvas...")
      // Clean canvas
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height); 
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
          ctx.fillStyle = i % 5 == 0 ? "black": "lightgray" ;
          ctx.strokeRect(
            canvasPadding.x + (size.width + margin.x) * j,
            canvasPadding.y + (size.height + margin.y) * i,
            size.width,
            size.height,
          );
          ctx.fillText(
            i.toString(),
            canvasPadding.x - 10, 
            ((size.height + margin.y) * i + 14) + canvasPadding.y,
          );
        }

      }
    }

    function drawEvents(lifeEvents) {
      ctx.lineWidth = "1";
      lifeEvents.forEach(lifeEvent => {
        console.log(lifeEvent.startWeek, lifeEvent.endWeek);
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

  return <canvas ref={canvas} id="life-grid"  width="1350" class="border border-black"></canvas>
}