import { For, batch, createEffect, createSignal, on } from "solid-js";
import { useAppContext } from "../context/AppContext";
import { createStore, unwrap } from "solid-js/store";

const DEFAULT_WEEKEVENT = {
  id: -1,
  title: '',
  eventColor: '',
  startWeek: new Date(),
  endWeek: new Date(),
}


export default function Life(){
  const [options, setOptions, lifeEvents, setLifeEvents, ] = useAppContext();
  const [weeks, setWeeks] = createStore([]);
  const [idSum, setIdSum] = createSignal();
  const expected = () => options.yearsExpected;
  const events = () => lifeEvents;

  createEffect(on(events, () => {
    console.log('Hey')
  }))


  function getDefault(start = new Date(), end = new Date){
    let newWeekEvent = structuredClone(DEFAULT_WEEKEVENT);
    newWeekEvent.id = idSum();
    newWeekEvent.startWeek = new Date(start.toDateString());
    newWeekEvent.endWeek = new Date(end.toDateString());
    setIdSum(idSum() + 1);
    return newWeekEvent;
  }

  function updateView() {
    lifeEvents.forEach((lifeEvent) => {
      console.log(options.born, lifeEvent.startWeek)
      let startWeek = calcularSemanasEntreFechas(options.born,lifeEvent.startWeek)
      let endWeek = calcularSemanasEntreFechas(options.born,lifeEvent.endWeek)
      if (startWeek < 0 || endWeek < 0 ) return;
      console.log(startWeek, endWeek, weeks.length);
      batch(() => {
        setWeeks({from: startWeek, to: endWeek }, 'eventColor', lifeEvent.eventColor)
        setWeeks({from: startWeek, to: endWeek }, 'title', lifeEvent.title)
      })
    })
  }

  function calcularSemanasEntreFechas(fechaInicio, fechaFin) {
    const milisegundosEnUnaSemana = 7 * 24 * 60 * 60 * 1000;
    const diferenciaEnMilisegundos = fechaFin - fechaInicio;
    return Math.floor(diferenciaEnMilisegundos / milisegundosEnUnaSemana);
  }

  function addWeek(date) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 7);
    return newDate;
  }


  createEffect(on(expected, () => {
    let yearsExpected = Math.round(options.yearsExpected > 100 ? 100 * 52 : options.yearsExpected * 52 )
    setIdSum(0);
    let weekArray = []
    let startDate = options.born;
    for (let i = 0; i < yearsExpected; i++){
      let aux = startDate;
      startDate = addWeek(startDate);
      weekArray.push(getDefault(aux, startDate));
    }
    setWeeks(weekArray)
    updateView();
  }))


  function Week(props){
    return (
      <div class="w-4 h-4 border-2 border-neutral-500"
      style={{
        'background-color': props.week.eventColor,
      }}
      title={props.week.startWeek.toDateString() + " - " + props.week.endWeek.toDateString()}
      >
      </div>
    )
  }
  
  
  return (
    <main class="w-full flex flex-col items-center">
      <header class="text-center my-10">
        <h1 class="text-4xl">{options.title == "Untitled" ? "" : options.title}</h1>
        <h2 class="text-2xl font-light">{options.description}</h2>
      </header>
      <section class="w-max grid gap-1 grid-cols-[repeat(53,_minmax(0,_1fr))] grid-flow-row">

        <For each={weeks}>{(week, i) =>
        <>
          {i() % 52 == 0 && 
            <div class="w-5 h-4 flex items-center justify-center">
              <p style={{'color': i() % 260 == 0 ? 'black' : 'lightgray'}}>{i() / 52}</p>
            </div>
          }
          <Week week={week}/>
        </>
        }</For>
      </section>
    </main>
  )
}