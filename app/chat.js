"use client"
import showdown from "showdown"
import { useChat } from "ai/react"
const converter = new showdown.Converter()

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat"
  })

  return (
    <div id="main">
      <div className="output">
        {messages.map((m, index) => (
          <div key={index}>
            <div className="info">
              {m.role === "user" ? "User : " : "AI : "}
            </div>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(m.content)
              }}
            ></div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="input-container">
        <input id="input" value={input} onChange={handleInputChange} />
        <div className="button-container">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}
