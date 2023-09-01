import {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Store from './store/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { ModalState } from './http/ModalContext.tsx';

interface State {
    store: Store,
}
const store = new Store();

export const Context = createContext<State>({
    store,
})


const root = ReactDOM.createRoot(
  document.getElementById('root')! as HTMLElement
)
root.render(
  <BrowserRouter>
    <ModalState>
      <Context.Provider value={{
        store
        }}>
        <App />
  </Context.Provider>
  </ModalState>
</BrowserRouter>
  
  
    
  
)
