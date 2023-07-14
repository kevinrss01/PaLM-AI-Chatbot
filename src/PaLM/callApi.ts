import { DiscussServiceClient } from '@google-ai/generativelanguage'
import { GoogleAuth } from 'google-auth-library'

const MODEL_NAME: string = 'models/chat-bison-001'
const API_KEY: string = process.env.PALM_API_KEY || ''

const client: DiscussServiceClient = new DiscussServiceClient({
   authClient: new GoogleAuth().fromAPIKey(API_KEY),
})

let context: string = "Tu es un chatbot qui a pour but de répondre à n'importe quelle question."
let messages: { content: string }[] = []

export const callApi = async (message: string): Promise<any> => {
   try {
      messages.push({ content: message })

      const result = client.generateMessage({
         model: MODEL_NAME,
         temperature: 0.25,
         candidateCount: 1,
         // @ts-ignore
         top_k: 40,
         top_p: 0.95,
         prompt: {
            context: context,
            messages: messages,
         },
      })

      return result

      //return [{ id: messages.length, message: message, from: 'user' }, { id: messages.length + 1, message: result.candidates.content, from: 'PaLM' }]
   } catch (error) {
      console.error(error)
      throw new Error('Error in callApi' + error)
   }
}
