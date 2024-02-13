import OpenAI from "openai"
import { OpenAIStream, StreamingTextResponse } from "ai"

export const runtime = "edge"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req) {
  const { messages } = await req.json()
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: messages,
    max_tokens: 500,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
