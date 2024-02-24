'use client';
import constants from '@/helpers/constants';
import React, {useState, useEffect } from 'react';

export default function Home() {
  // const [socket, setSocket] = useState<Socket>();


  //function that takes a websocket then a json message and send to the server for a specific route
  const sendMessage = (ws: WebSocket, message: any) => {
    ws.send(JSON.stringify(message));
  }

  useEffect(() => {
    console.log('we are here');
    // Replace 'ws://localhost:3001' with your WebSocket server address
    const ws = new WebSocket('ws://localhost:4500');

    ws.onopen = () => {
      console.log('Connected to the server');
      // You can send messages to the server upon connection
      ws.send('Hello Server!');
    };

    ws.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    ws.onclose = () => {
      console.log('Disconnected from the server');
    };

    // Cleanup on component unmount
    return () => ws.close();
  }, []);


  return (
    <div className='w-full flex justify-center items-center'>
      <h1>asdfsd</h1>
    </div>
  );
}
