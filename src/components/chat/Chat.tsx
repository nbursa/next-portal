import { MouseEventHandler, useState } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');

  const submitMessage = (): MouseEventHandler<HTMLButtonElement> | null => {
    console.log(message);
    return null;
  }

  return (
    <div className="absolute bottom-6 right-6 border border-gray-light rounded-lg p-4">
      {message}
      <input type="text" name="chatInput" placeholder="Enter chat name" value={message} onChange={e => setMessage(e.target.value)} className="mr-4"/>
      <button type="submit" onClick={submitMessage}>Send</button>
    </div>
  )
}

export default Chat;
