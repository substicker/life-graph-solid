import { useOptions } from "../context/OptionsContext";

export default function Aside(){
  const [option, setOptions] = useOptions();

  return (
    <aside class="p-6 h-screen border-r border-neutral-400 w-2/12 [&_label]:inline-block [&_label]:w-full [&_input]:border-2 [&_input]:border-neutral-400">
      <div>
        <label for="title">Título</label>
        <input name="title" type="text" value={option.title} onInput={(e) => {setOptions('title', e.target.value)}}/>
        <label for="description">Descripción</label>
        <input name="description" type="text" value={option.description} onInput={(e) => {setOptions('description', e.target.value)}}/>
        <label for="yearsExpected">Expectativa de años de vida</label>
        <input name="yearsExpected" type="number" max={100} value={option.yearsExpected} onInput={(e) => {setOptions('yearsExpected', Number(e.target.value))}}/>
      </div>
    </aside>
  )
}