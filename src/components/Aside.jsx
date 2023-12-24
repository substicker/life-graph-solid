import { useOptions } from "../context/OptionsContext";

export default function Aside(){
  const [option, setOptions] = useOptions();

  return (
    <aside class="p-6 h-screen border-r border-neutral-400 w-2/12 [&_label]:inline-block [&_label]:w-full [&_input]:border-2 [&_input]:border-neutral-400">
      <div>
        <label for="title">Título</label>
        <input name="title" onInput={(e) => {setOptions('title', e.target.value)}}/>
        <label for="title">Título</label>
        <input name="title" onInput={(e) => {setOptions('title', e.target.value)}}/>
      </div>
    </aside>
  )
}