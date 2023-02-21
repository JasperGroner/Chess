import React, { useState } from "react";

const ChatForm = ({ socket }) => {
  const [ messageText, setMessageText ] = useState("")

  const updateMessage = event => {
    setMessageText(event.currentTarget.value)
  }

  const sendMessage = event => {
    event.preventDefault()
    socket.emit("send message", ({messageText}))
    setMessageText("")
  }

  return (
    <form className="chat--form">
      <input type="text" name="submit" onChange={updateMessage} value={messageText} className="chat--input"/>
      <input type="submit" className="button chat--submit-button" onClick={sendMessage} value="Send Message"/>
    </form>
  )
}

export default ChatForm