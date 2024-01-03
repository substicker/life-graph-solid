import { useAppContext } from "../context/AppContext";

export default function Life(props){
  const [options] = useAppContext();
  
  return (
    <main class="w-full flex flex-col items-center">
      <header class="text-center my-10">
        <h1 class="text-4xl">{options.title == "Untitled" ? "" : options.title}</h1>
        <h2 class="text-2xl font-light">{options.description}</h2>
      </header>
      <section>
        {props.children}
      </section>
    </main>
  )
}