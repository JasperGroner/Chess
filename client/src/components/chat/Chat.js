import React, { useEffect, useState } from "react";
import ChatForm from "./ChatForm"

const Chat = ({ socket }) => {
  const [ messages, setMessages ] = useState([])
  const [ newMessage, setNewMessage ] = useState("")
  const [ chatHidden, setChatHidden ] = useState(true)
  const [ buttonClass, setButtonClass ] = useState("chat--new-message")

  useEffect(() => {
    if (socket) {
      socket.on("add message", ({message}) => {
        setNewMessage(message)
      })
    }

    return(() => {
      if (socket) {
        socket.off("add message")
      }
    })
  }, [socket])

  if (newMessage.text) {
    setMessages([newMessage, ...messages])
    setNewMessage("")
    if (chatHidden) {
      setButtonClass("chat--new-message")
    }
  }

  const messagesReact = messages.map((message, iterator) => {
    return (
      <p key={iterator} className="chat--message">
        {message.timestamp} - <span className="chat--message--username">{message.user}</span>: {message.text}
      </p>
    )
  })

  let chatClass
  if (chatHidden) {
    chatClass = "chat--frame--hide"
  }

  const toggleChat = props => {
    chatHidden ? setChatHidden(false) : setChatHidden(true)
    setButtonClass(null)
  }

  return (
    <>
      <button type="button" className={`button chat--toggle-button ${buttonClass}`} onClick={toggleChat} key={Math.random()}><i className="fas fa-comments"></i></button>
      <div className={`chat--frame ${chatClass}`}>
        <div className={"chat--display"}>
          {messagesReact}
        </div>
        <ChatForm socket={socket}/>
      </div>
    </>
  )
}

export default Chat