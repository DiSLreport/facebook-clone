
"use client"
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3001');

function ChatApp() {
    const [username, setusername] = useState([]);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const endRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:3001/messages')
            .then(res => setMessages(res.data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        socket.on('chat message', msg => {
            setMessages(prev => [...prev, msg]);
        });
        return () => socket.off('chat message');
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;
        socket.emit('chat message', { user: username, content: input });
        setInput('');
    };

    return (
        <div style={{ maxWidth: 600, margin: '10' }}>
            <h2>Chat Room</h2>
            <div style={{
                border: '1px solid #ccc',
                padding: 10,
                height: 400,
                overflowY: 'auto',
                marginBottom: 10
            }}>
                {messages.map((m, i) => (
                    <div key={m._id || i} style={{ margin: '5px 0' }}>
                        <strong>{m.user}</strong>: {m.content}
                        <div style={{ fontSize: '0.8em', color: '#666' }}>
                            {new Date(m.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                ))}
                <div ref={endRef} />
            </div>

            <div style={{ display: 'flex' }}>
                <input
                    style={{ flexGrow: 1, padding: 8 }}
                    type="text"
                    placeholder="Type your username..."
                    value={username}
                    onChange={e => setusername(e.target.value)}
                />
                <input
                    style={{ flexGrow: 1, padding: 8 }}
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} style={{ padding: '0 16px' }}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatApp;
