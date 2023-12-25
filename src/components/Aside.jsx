import { createStore } from "solid-js/store";
import { useAppContext } from "../context/AppContext";

const DEFAULT_LIFEEVENT = {
  id: -1,
  title: 'Untitled',
  description: '',
  startWeek: new Date(),
  endWeek: new Date(),
}

export default function Aside(){
  const [option, setOptions] = useAppContext();
  const [lifeEvents, setLifeEvents] = createStore([]);
  
  function addLifeEvent() {
    let newLifeEvent = structuredClone(DEFAULT_LIFEEVENT);
    newLifeEvent.id = lifeEvents.length;
    setLifeEvents(lifeEvents.length, newLifeEvent)
  }
  function modifyLifeEvent(id,key, value){
    console.log("Modificado", id, key, value)
    setLifeEvents(id, key, value)
  }

  return (
    <aside class="p-6 h-screen border-r border-neutral-400 w-2/12 [&_label]:inline-block [&_label]:w-full [&_input]:border-2 [&_input]:border-neutral-400">
      <div>
        <label for="title">Título</label>
        <input name="title" type="text" value={option.title} onInput={(e) => {setOptions('title', e.target.value)}}/>
        <label for="description">Descripción</label>
        <input name="description" type="text" value={option.description} onInput={(e) => {setOptions('description', e.target.value)}}/>
        <label for="born">Año de nacimiento</label>
        <input name="born" type="date" value={option.born.toISOString().slice(0,-14)} onInput={(e) => {setOptions('born', new Date(e.target.value))}}/>
        <label for="yearsExpected">Expectativa de años de vida</label>
        <input name="yearsExpected" type="number" max={100} value={option.yearsExpected} onChange={(e) => {setOptions('yearsExpected', Number(e.target.value))}}/>
        <section class="mt-4 border border-nuetral-400">
          <header>
            <button class="flex justify-between w-full" onClick={() => (addLifeEvent())}>Añadir contexto <img src="add.svg"/></button>
          </header>
          <For each={lifeEvents}>{(lifeEvent) => 
            <div>
              <input value={lifeEvent.title} type="text" onChange={(e) => {modifyLifeEvent(lifeEvent.id, 'title', e.target.value)}}/>
              <input value={lifeEvent.startWeek.toISOString().slice(0,-14)} type="date" onChange={(e) => {modifyLifeEvent(lifeEvent.id, 'startWeek', new Date(e.target.value))}} />
              <input value={lifeEvent.endWeek.toISOString().slice(0,-14)} type="date" onChange={(e) => {modifyLifeEvent(lifeEvent.id, 'endWeek', new Date(e.target.value))}} />

            </div>
          }</For>
        </section>
      </div>
    </aside>
  )
}