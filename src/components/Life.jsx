import { For } from "solid-js";
import { useOptions } from "../context/OptionsContext";
import Week from './Week'

export default function Life(){
  const [options] = useOptions();
  const totalWeeks = () => Array.from(Array(Math.round(options.yearsExpected >= 100 ? 100 * 52 : options.yearsExpected * 52 )).keys());
  return (
    <main class="w-full flex flex-col items-center">
      <header class="text-center my-10">
        <h1 class="text-4xl">{options.born.toString()}</h1>
        <h2 class="text-2xl font-light">{options.description}</h2>
      </header>
      <section class="w-max grid gap-1 grid-cols-[repeat(52,_minmax(0,_1fr))] grid-flow-row">
        <For each={totalWeeks()}>{(week) =>
          <Week />
        }</For>
      </section>
    </main>
  )
}