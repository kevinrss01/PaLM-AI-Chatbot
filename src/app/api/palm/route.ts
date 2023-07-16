import { NextResponse } from 'next/server'
import { DiscussServiceClient } from '@google-ai/generativelanguage'
import { GoogleAuth } from 'google-auth-library'

const MODEL_NAME: string = 'models/chat-bison-001'
const API_KEY: string = process.env.PALM_API_KEY || ''

const client: DiscussServiceClient = new DiscussServiceClient({
   authClient: new GoogleAuth().fromAPIKey(API_KEY),
})

let context: string = "you're a chabot, your role is to answer questions."

interface Conversation {
   conversation: {
      author: '0' | '1'
      content: string
   }[]
}

const callApi = async (conversation: {}[]): Promise<any> => {
   try {
      const result = await client.generateMessage({
         model: MODEL_NAME,
         temperature: 0.25,
         candidateCount: 1,
         prompt: {
            context: context,
            messages: conversation,
         },
      })

      if (!Array.isArray(result)) {
         throw new Error('Result is not an array')
         return
      }

      console.log(result)

      // @ts-ignore
      return result
   } catch (error) {
      console.error(error)
      throw new Error('Error in callApi' + error)
   }
}

export async function POST(request: Request) {
   try {
      const { conversation }: Conversation = await request.json()

      console.log(`conversation: ${JSON.stringify(conversation)}`)

      if (!conversation || conversation.length === 0) {
         console.error('Missing message or empty conversation')
         return NextResponse.json({ error: 'Missing message or empty conversation' })
      }

      const response = await callApi(conversation)

      return NextResponse.json(response)
   } catch (error) {
      console.error(error)
      return NextResponse.json({ error: error })
   }
}
