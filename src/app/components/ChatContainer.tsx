'use client'

import React, { useState } from 'react'
import { Card, Title, Icon, TextInput, Button, Text } from '@tremor/react'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'
import { AiFillInfoCircle } from 'react-icons/ai'

interface PalmResponse {
   candidates: {
      author: string
      content: string
   }[]
   messages: {
      author: string
      content: string
   }[]
   filters: any[]
}

const ChatContainer = () => {
   const [message, setMessage] = useState<string>('')
   const [conversation, setConversation] = useState<{ author: string; content: string }[]>([])
   const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [isErrorPalm, setIsErrorPalm] = useState<boolean>(false)

   const handleOnChangeinput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isErrorPalm) {
         setMessage(e.target.value)
         if (e.target.value.length > 2) {
            setIsButtonDisabled(false)
         }

         if (e.target.value.length < 2) {
            setIsButtonDisabled(true)
         }
      }
   }

   const onSubmit = async () => {
      try {
         setIsLoading(true)
         setMessage('')
         setIsButtonDisabled(true)

         // Send without author because it's not handle by the API
         const conversationWithoutAuthor = [...conversation].map((msg) => {
            return { content: msg.content }
         })

         conversationWithoutAuthor.push({ content: message })

         setConversation([...conversation, { author: '0', content: message }])

         const response: AxiosResponse<PalmResponse> = await axios.post('/api/palm', {
            conversation: conversationWithoutAuthor,
         })

         // @ts-ignore
         if (response?.data[0]?.candidates[0]?.content === undefined) {
            throw new Error('PaLM does not provide an answer')
         }

         setConversation([
            ...conversation,
            { author: '0', content: message },
            // @ts-ignore
            { author: '1', content: response?.data[0]?.candidates[0]?.content },
         ])

         setIsButtonDisabled(false)
      } catch (error) {
         setIsErrorPalm(true)
         toast.error(
            'Something went wrong, maybe your question was not understood by the AI or you are not located in United States. Please reload the page and try again.',
            {
               position: 'top-right',
               autoClose: false,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: 'light',
            },
         )
         console.error(error)
         throw new Error('Error' + error)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <Card className='w-[80%] card-container-chat h-auto'>
         <Title className='mb-6 flex text-center text-2xl items-center justify-center'>
            ChatBot powered by PaLM AI from Google{' '}
            <Icon
               size='lg'
               icon={AiFillInfoCircle}
               tooltip="PaLM understand only English. Sometimes his answers are weird and sometimes he doesn't understand your question so he doesn't answers at all."
            />
         </Title>
         <Card className='container-chat'>
            <div className='chat'>
               {conversation.map((message, index) => {
                  return (
                     <div
                        className={`message-container m-5 m-max flex ${
                           message.author === '0' ? 'justify-end' : 'justify-start'
                        }`}
                        key={`message-${index}`}
                     >
                        <Card
                           className={`bg-white h-auto flex items-center max-w-[80%] p-2`}
                           style={{
                              backgroundColor: message.author === '0' ? '#1e8dfa' : '#e8e7e9',
                           }}
                        >
                           {message.content}
                        </Card>
                     </div>
                  )
               })}
               {isLoading && (
                  <>
                     <div className={`message-container m-5 m-max flex justify-start`}>
                        <Card
                           className={`bg-white h-auto flex items-center max-w-[80%] p-2`}
                           style={{
                              backgroundColor: '#e8e7e9',
                           }}
                        >
                           <ThreeDots
                              height='30'
                              width='80'
                              radius='9'
                              color='dodgerblue'
                              ariaLabel='three-dots-loading'
                              wrapperStyle={{}}
                              visible={true}
                           />
                        </Card>
                     </div>
                  </>
               )}
            </div>
            <div className='flex gap-3'>
               <TextInput
                  placeholder='Ask everything you want... (You must be in United state for using the chatbot, you can use a VPN.)'
                  onChange={(e) => {
                     handleOnChangeinput(e)
                  }}
                  value={message}
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
