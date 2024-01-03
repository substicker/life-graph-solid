import { createEffect, on, onMount } from "solid-js";
import { useAppContext } from "../context/AppContext";
import { unwrap } from "solid-js/store";



export default function LifeGrid(){
  // Cómo hago que no se vea borroso maldito canvas!
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

    createEffect(on(years, () => {
      console.log("Updating canvas...")
      ctx.clearRect(0, 0, canvas.width, canvas.height);        
      drawGrid();
      drawEvents(lifeEvents);
    }))

    function drawGrid() {
      ctx.font = "15px mono";
      ctx.textAlign = "right";
      ctx.lineWidth = "1";
      let size = {height: 15, width: 15};
      let canvasPadding = {x: 100, y: 20};
      let margin = {x: 10, y: 10};
      
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
            (size.height + margin.y) * i + 32,
          );
        }

      }
    }

    function drawEvents(lifeEvents) {
      ctx.lineWidth = "1";
      let size = {height: 15, width: 15};
      let canvasPadding = {x: 100, y: 20};
      let margin = {x: 10, y: 10};
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

  return <canvas ref={canvas} id="life-grid" height="2500" width="1500"></canvas>
}