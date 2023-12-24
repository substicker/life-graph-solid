import { useContext, createContext, createEffect } from "solid-js";
import { createStore, unwrap } from "solid-js/store";

const OptionContext = createContext();

export function OptionProvider(props){
  const [options, setOptions] = createStore({
    title: 'Untitled',
    description: '',
    yearsExpected: 80,
  }),
   option = [
    options,
    setOptions
  ]
  createEffect(() => {
    console.log(unwrap(options))
  })

   return (
    <OptionContext.Provider value={option}>
      {props.children}
    </OptionContext.Provider>
   )
}

export function useOptions(){ return useContext(OptionContext);}