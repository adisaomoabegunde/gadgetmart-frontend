import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartContextProvider } from './User/components/CartContext.jsx'
import { AuthProvider } from './User/AuthContext.jsx'
import { LoadingProvider } from './User/LoadingContext.jsx'

createRoot(document.getElementById('root')).render(
  <CartContextProvider>
      
       <StrictMode>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </StrictMode>
 
     
  </CartContextProvider>

);
