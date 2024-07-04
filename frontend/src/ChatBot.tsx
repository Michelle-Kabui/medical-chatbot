import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, TextField, CircularProgress, Typography } from '@mui/material';

const ChatBot = () => {
    const [messages, setMessages] = useState<{ content: string, sender: 'user' | 'bot' }[]>([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const endOfMessagesRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        
        const userMessage = { content: message, sender: 'user' as 'user' | 'bot' };
        setMessages(messages => [...messages, userMessage]);
        setMessage('');
        setIsLoading(true); // Set loading state to true
    
        try {
            const response = await axios.post('http://localhost:8000/chat/', { query: message });
            const botMessage = { 
                content: response.data.response.result, // Accessing the result from the response object
                sender: 'bot' as 'user' | 'bot'
            };
            setMessages(messages => [...messages, botMessage]);
        } catch (error) {
            console.error('Error fetching response:', error);
            const errorMessage = {
                content: 'Failed to get response. Try again later.',
                sender: 'bot' as 'user' | 'bot'
            };
            setMessages(messages => [...messages, errorMessage]);
        }
    
        setIsLoading(false); // Set loading state to false after receiving response or error
    };
    
    

    const handleNewChat = () => {
        // Handle new chat functionality here
    };

    const handleProfile = () => {
        // Handle profile details functionality here
    };

    return (
        <Box sx={{
            p: { md: '30px 150px', xs: '20px 30px' }
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Typography sx={{
                    fontSize: '70px',
                    fontWeight: 'light',
                    textTransform: 'uppercase',
                    color: '#000'
                }}>
                    Medihelp
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: '40px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Box
                        sx={{
                            width: '40px',
                            height: '40px',
                            boxShadow: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={handleNewChat} // Functionality for new chat will be added here
                    >
                        <img
                            src={process.env.PUBLIC_URL + '/images/pencil.png'}
                            alt={'landing'}
                            style={{
                                width: '100%',
                                height: '100%'
                            }} />
                    </Box>
                    <Box
                        sx={{
                            width: '40px',
                            height: '40px',
                            boxShadow: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={handleProfile} // Functionality for profile details will be added here
                    >
                        <img
                            src={process.env.PUBLIC_URL + '/images/user.png'}
                            alt={'landing'}
                            style={{
                                width: '100%',
                                height: '100%'
                            }} />
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Box sx={{
                    width: { xs: 'auto', md: '850px' },
                    height: { xs: 'auto', md: '500px' },
                    bgcolor: '#D9D9D9',
                    padding: '20px',
                    borderRadius: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                        {messages.map((msg, index) => (
                            <Box key={index} sx={{
                                textAlign: msg.sender === 'user' ? 'right' : 'left',
                                margin: '10px',
                                padding: '10px',
                                borderRadius: '10px',
                                bgcolor: msg.sender === 'user' ? '#B6EFD4' : '#F0F0F0'
                            }}>
                                {msg.content}
                            </Box>
                        ))}
                        {isLoading && <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box>}
                        <div ref={endOfMessagesRef} />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2
                    }}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder="What is the issue today?"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{
                                bgcolor: 'white',
                                borderRadius: '30px',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderRadius: '30px',
                                    },
                                },
                            }}
                        />
                        <Box
                            sx={{
                                width: '40px',
                                height: '40px',
                                boxShadow: 'none',
                                ml: 2,
                                cursor: 'pointer'
                            }}
                            onClick={handleSendMessage}
                        >
                            <img
                                src={process.env.PUBLIC_URL + '/images/stethoscope.png'}
                                alt={'Send'}
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }} />
                        </Box>
                    </Box>
                </Box>
                <Typography sx={{
                    fontSize: '25px',
                    fontWeight: 'light',
                    color: '#000'
                }}>
                    Previous Consultations
                </Typography>
            </Box>
        </Box>
    );
};

export default ChatBot;
