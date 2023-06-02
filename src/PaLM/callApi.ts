import { DiscussServiceClient } from '@google-ai/generativelanguage'
import { GoogleAuth } from 'google-auth-library'

const MODEL_NAME: string = 'models/chat-bison-001'
const API_KEY: string = 'YOUR API KEY'

const client: DiscussServiceClient = new DiscussServiceClient({
   authClient: new GoogleAuth().fromAPIKey(API_KEY),
})

let context: string = ''
let messages: { content: string }[] = []

export const callApi = (message: string): any => {
   client
      .generateMessage({
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
      .then((result: any) => {
         // replace any with appropriate type if possible
         console.log(JSON.stringify(result, null, 2))
      })

   return messages
}
