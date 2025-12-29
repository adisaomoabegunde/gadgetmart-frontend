import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartContextProvider } from './User/components/CartContext.jsx'
import { AuthProvider } from './User/AuthContext.jsx'
import { LoadingProvider } from './User/LoadingContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <CartContextProvider>
      
       <StrictMode>
        <LoadingProvider>
          <Toaster position='top-right' gutter={12} toastOptions={{duration: 2500, style: {
            background: "#16a34a",
            color: "#fff",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#16a34a",
          },
          error: {
            style: {
              background: "#dc2626",
              color: "#fff",
            },
          },
          }} />
          <App />
        </LoadingProvider>
      </StrictMode>
 
     
  </CartContextProvider>

);
