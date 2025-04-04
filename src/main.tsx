import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import './index.css'
import {store} from './store/store'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
       <BrowserRouter basename="/Museum">
         <App />
       </BrowserRouter>
    </Provider>
  </StrictMode>,
)
