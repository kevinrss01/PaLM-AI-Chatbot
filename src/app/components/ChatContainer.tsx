'use client'

import React, { useState } from 'react'
import { Card, Title, Bold, TextInput, Button } from '@tremor/react'
import { callApi } from '../../PaLM/callApi'

const ChatContainer = () => {
   const [message, setMessage] = useState<string>('')
   const [conversation, setConversation] = useState<
      { id: number; message: string; from: 'user' | 'PaLM' }[]
   >([
      { id: 0, message: 'Qui est le président de la république française ?', from: 'user' },
      { id: 1, message: 'Le président de la république est Emmanuel Macron', from: 'PaLM' },
   ])
   const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

   const handleOnChangeinput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value)
      if (e.target.value.length > 2) {
         setIsButtonDisabled(false)
      }

      if (e.target.value.length < 2) {
         setIsButtonDisabled(true)
      }
   }

   const onSubmit = async () => {
      await callApi('Qui est le président de la France ?')
   }

   return (
      <Card className='w-[80%] card-container-chat'>
         <Title className='mt-6 mb-6 text-center text-2xl'>
            ChatBot powered by PaLM AI from Google
         </Title>
         <Card className='container-chat'>
            <div className='chat'>
               {conversation.map((message) => {
                  return (
                     <div
                        className={`message-container m-5 m-max flex ${
                           message.from === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                        key={`message-${message.id}`}
                     >
                        <Card
                           className={`bg-white h-10 flex items-center max-w-[80%]`}
                           style={{
                              backgroundColor: message.from === 'user' ? '#1e8dfa' : '#e8e7e9',
                           }}
                        >
                           {message.message}
                        </Card>
                     </div>
                  )
               })}
            </div>
            <div className='flex gap-3'>
               <TextInput
                  placeholder='Ask everything you want...'
                  onChange={(e) => {
                     handleOnChangeinput(e)
                  }}
               ></TextInput>
               <Button
                  disabled={isButtonDisabled}
                  onClick={() => {
                     onSubmit()
                  }}
               >
                  Send
               </Button>
            </div>
         </Card>
      </Card>
   )
}

export default ChatContainer
