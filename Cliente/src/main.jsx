import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rutas from './componentes/Rutas'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rutas />
  </StrictMode>
)
