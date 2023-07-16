import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { Title, Icon } from '@tremor/react'
import { FcGoogle } from 'react-icons/fc'
import ToastProvider from './components/ToastProvider'

export const metadata = {
   title: 'PaLM Chatbot V1',
   description: 'PaLM Chatbot V1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en'>
         <body className=''>
            <ToastProvider>
               <header className='h-14 shadow-md mb-10 flex justify-center items-center'>
                  <Title>PaLM Chatbot V1</Title>
                  <FcGoogle className='ml-2' />
               </header>
               {children}
               <footer></footer>
            </ToastProvider>
         </body>
      </html>
   )
}
