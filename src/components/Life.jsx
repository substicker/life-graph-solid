import { For, createEffect, createSignal, on } from "solid-js";
import { useAppContext } from "../context/AppContext";
import { createStore, unwrap } from "solid-js/store";

const DEFAULT_WEEKEVENT = {
  id: -1,
  title: '',
  eventColor: '',
}


export default function Life(){
  const [options, setOptions, lifeEvents, setLifeEvents, ] = useAppContext();
  const [weeks, setWeeks] = createStore([]);
  const [idSum, setIdSum] = createSignal();
  const expected = () => options.yearsExpected;


  function getDefault(){
    let newWeekEvent = structuredClone(DEFAULT_WEEKEVENT);
    newWeekEvent.id = idSum();
    setIdSum(idSum() + 1);
    return newWeekEvent;
  }

  function updateView() {
    lifeEvents.forEach((lifeEvent) => {
      console.log(options.born, lifeEvent.startWeek)
      let startWeek = calcularSemanasEntreFechas(options.born,lifeEvent.startWeek)
      let endWeek = calcularSemanasEntreFechas(options.born,lifeEvent.endWeek)
      if (startWeek < 0 && endWeek < 0 ) return;
      console.log(startWeek, endWeek, weeks.length);
      setWeeks({from: startWeek, to: endWeek }, 'eventColor', lifeEvent.eventColor)

    })
  }

  function calcularSemanasEntreFechas(fechaInicio, fechaFin) {
    const milisegundosEnUnaSemana = 7 * 24 * 60 * 60 * 1000;
    const diferenciaEnMilisegundos = fechaFin - fechaInicio;
    return Math.floor(diferenciaEnMilisegundos / milisegundosEnUnaSemana);
  }



  createEffect(on(expected, () => {
    setIdSum(0);
    setWeeks(Array.from({length: Math.round(options.yearsExpected >= 100 ? 100 * 52 : options.yearsExpected * 52 )}, () => getDefault()))
    updateView();
  }))


  function Week(props){
    return (
      <div class="w-4 h-4 border-2 border-neutral-500"
      style={{
        'background-color': props.week.eventColor,
      }}
      />
    )
  }
  
  
  return (
    <main class="w-full flex flex-col items-center">
      <header class="text-center my-10">
        <h1 class="text-4xl">{options.born.toString()}</h1>
        <h2 class="text-2xl font-light">{options.description}</h2>
      </header>
      <section class="w-max grid gap-1 grid-cols-[repeat(52,_minmax(0,_1fr))] grid-flow-row">
        <For each={weeks}>{(week) =>
          <Week week={week}/>
        }</For>
      </section>
    </main>
  )
}