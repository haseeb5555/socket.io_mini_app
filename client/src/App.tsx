import { useEffect, useMemo, useState } from "react"
import { io } from "socket.io-client"

const App = () => {
  const [message, setMessage] = useState("")
  const [allMessages, setAllMessages] = useState<string[]>([])
  console.log(allMessages)

  const socket = useMemo(()=>io("http://localhost:3000"),[]) 

  useEffect(() => {
    socket.on("connection", () => {
      console.log("connected",)

    }
    )
  
    socket.on("me", (message: string) => {
      console.log(message)
    })
    socket.on("message", (message: string) => {
   
      setMessage(message)
      setAllMessages((prev) => [...prev, message])



    } )
  return () => {
    socket.disconnect()
  }
   

  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    socket.emit("message", message)
    setMessage("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="px-4 py-2 rounded-md bg-black text-white" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit" className="bg-black text-white px-4 py-3 rounded-xl">Submit</button>
         
      </form>
      <ul>
        {allMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>

    </div>
  )
}

export default App