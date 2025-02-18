import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './components/Login/Login.jsx'
import "bootstrap/dist/css/bootstrap.css";
import Register from './components/Register/Register.jsx';
import AppRouter from './AppRouter.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
