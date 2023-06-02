import { Card, Title, Bold, TextInput, Button } from '@tremor/react'
import { AiOutlineSend } from 'react-icons/ai'
import { callApi } from '@/PaLM/callApi'

export default function Home() {
   return (
      <div className='flex justify-center'>
         <Card className='w-[80%] card-container-chat'>
            <Title className='mt-6 mb-6 text-center text-2xl'> PaLM artificial intelligence</Title>
            <Card className='container-chat'>
               <div className='chat'></div>
               <div className='flex gap-3'>
                  <TextInput placeholder='Ask everything you want...'></TextInput>
                  <Button>Send</Button>
               </div>
            </Card>
         </Card>
      </div>
   )
}
