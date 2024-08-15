// Ejemplo de componente
import React from 'react';
import { useSendMessageMutation, useReceiveMessagesQuery } from '../store/socketSlice';

const EventComponent: React.FC = () => {
  const [sendMessage] = useSendMessageMutation();
  const { data: messages } = useReceiveMessagesQuery();

  const handleSendMessage = (message: string) => {
    sendMessage({ message, clientOffset: Date.now() }); // Usar clientOffset adecuado
  };

  return (
    <div>
      <h1>Websocket history</h1>
      <ul>
        {messages?.map((msg, index) => (
          <li key={index}>{msg.message} (ID: {msg.clientOffset})</li>
        ))}
      </ul>
      <button onClick={() => handleSendMessage('desde orderly')}>Send Message</button>
    </div>
  );
};

export default EventComponent;
