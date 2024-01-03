import { useAppContext } from "../context/AppContext";

const DEFAULT_LIFEEVENT = {
  id: -1,
  title: 'Evento',
  description: '',
  eventColor: '#000000',
  startWeek: new Date(),
  endWeek: new Date(),
}

function clickOutside(el, accessor) {
  const onClick = (e) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}

export default function Aside(){
  const [options, setOptions, lifeEvents, setLifeEvents] = useAppContext();
  function addLifeEvent() {
    let newLifeEvent = structuredClone(DEFAULT_LIFEEVENT);
    newLifeEvent.id = lifeEvents.length;
    setLifeEvents(lifeEvents.length, newLifeEvent)
  }
  function modifyLifeEvent(id,key, value){
    console.log("Modificado", id, key, value)
    setLifeEvents(id, key, value)
  }

  function updateView(){
    setOptions('yearsExpected', options.yearsExpected + 1)
    setOptions('yearsExpected', options.yearsExpected - 1)
  }

  return (
    <aside class="p-6 h-screen border-r border-neutral-400 w-2/12 [&_label]:inline-block [&_label]:w-full [&_input]:border-2 [&_input]:border-neutral-400">
      <div>
        <header>
          <div>
            <details>
              <summary class="list-none overflow-hidden transition-all">
              <img src="info.svg" class="cursor-pointer" />
              </summary>
              <section class="text-center overflow-hidden transition-all">
                <h1 class="text-2xl pt-4">Life Graph v1.0.4</h1>
                <h2 class="pb-4">Hecho para un regalo</h2>
              </section>
            </details>
          </div>
          <p><b>Importante:</b> esta aplicación <span class="text-red-500">NO ALMACENA NADA</span>. Eventualmente será agregado.</p>
        </header>
        <hr class="my-4" />
        <label for="title">Título</label>
        <input name="title" type="text" value={options.title} onInput={(e) => {setOptions('title', e.target.value)}}/>
        <label for="description">Descripción</label>
        <input name="description" type="text" value={options.description} onInput={(e) => {setOptions('description', e.target.value)}}/>
        <label for="born">Año de nacimiento</label>
        <input name="born" type="date" onInput={(e) => {  setOptions('born', new Date(e.target.value))}}/>
        <p class="text-red-500">{options.born instanceof Date && !isNaN(options.born) ? "" : 'Fecha es inválida'}</p>
        <label for="yearsExpected">Expectativa de años de vida</label>
        <input name="yearsExpected" type="number" max={100} value={options.yearsExpected} onChange={(e) => {setOptions('yearsExpected', Number(e.target.value))}}/>
        <section class="mt-4 border border-nuetral-400">
          <button onClick={() => updateView()} class="bg-gray-200 border w-full border-gray-500 rounded-md my-2 p-3">Actualizar</button>
          <header>
            <button class="flex justify-between w-full" onClick={() => (addLifeEvent())}>Añadir evento de vida <img src="add.svg"/></button>
          </header>
          <div class="block ">
            <For each={lifeEvents}>{(lifeEvent) => 
              <div class="border mb-2 border-gray-500 rounded-lg">
                <input value={lifeEvent.title} type="text" onChange={(e) => {modifyLifeEvent(lifeEvent.id, 'title', e.target.value)}}/>
                <input type="date" onChange={(e) => {modifyLifeEvent(lifeEvent.id, 'startWeek', new Date(e.target.value))}} />
                <input type="date" onChange={(e) => {modifyLifeEvent(lifeEvent.id, 'endWeek', new Date(e.target.value))}} />
                <input value={lifeEvent.eventColor} type="color" onInput={(e) => {modifyLifeEvent(lifeEvent.id, 'eventColor', e.target.value)}}/>
              </div>
            }</For>
          </div>
        </section>
      </div>
    </aside>
  )
}