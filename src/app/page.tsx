import { Card, Title, Bold, TextInput, Button } from '@tremor/react'
import ChatContainer from './components/ChatContainer'

export default function Home() {
   return (
      <div className='flex justify-center items-center'>
         <ChatContainer />
      </div>
   )
}
