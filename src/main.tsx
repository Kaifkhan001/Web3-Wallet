import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { Buffer } from 'buffer';
window.Buffer = Buffer;


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
   <div className='w-full h-full bg-black text-white'>
    <Toaster position='top-right' theme='dark'/>
     <App />
   </div>
  // </StrictMode>,
)
