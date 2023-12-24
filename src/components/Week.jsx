import { createEffect } from "solid-js";
import { useOptions } from "../context/OptionsContext"

export default function Week(){
  const [option, setOptions] = useOptions({
    title: 'Title',
    description: '',
    
  });

  return (
    <div class="rounded-full w-4 h-4 border-2 border-neutral-500" />
  )
}