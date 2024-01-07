import { useContext, createContext } from "solid-js";
import { createStore } from "solid-js/store";

const AppContext = createContext();

export function AppProvider(props){
  const [lifeEvents, setLifeEvents] = createStore([])
  const [options, setOptions] = createStore({
    title: '',
    description: '',
    born: new Date(),
    yearsExpected: 150,
    darkMode: false,
  }),
   app = [
    options,
    setOptions,
    lifeEvents,
    setLifeEvents
  ]

   return (
    <AppContext.Provider value={app}>
      {props.children}
    </AppContext.Provider>
   )
}

export function useAppContext(){ return useContext(AppContext);}