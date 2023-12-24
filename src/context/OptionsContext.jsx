import { useContext, createContext } from "solid-js";
import { createStore } from "solid-js/store";

const OptionContext = createContext();

export function OptionProvider(props){
  const [options, setOptions] = createStore({}),
   option = [
    options,
    setOptions
  ]

   return (
    <OptionContext.Provider value={option}>
      {props.children}
    </OptionContext.Provider>
   )
}

export function useOptions(){ return useContext(OptionContext);}