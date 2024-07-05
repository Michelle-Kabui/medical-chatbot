import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, TextField, CircularProgress, Typography, InputAdornment, IconButton } from '@mui/material';

const ChatBot = () => {
    const [messages, setMessages] = useState<{ content: string, sender: 'user' | 'bot' }[]>([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const endOfMessagesRef = useRef<null | HTMLDivElement>(null);
    const isInitialMount = useRef(true); // To check if it's the first mount

    useEffect(() => {
        if (isInitialMount.current) {
            postBotMessage("Welcome to MEDIHELP. How may I be of assistance?");
            isInitialMount.current = false; // Ensure this runs only once
        }
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        postUserMessage(message);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/chat/', { query: message });
            typeMessage(response.data.response.result, 'bot');
        } catch (error) {
            console.error('Error fetching response:', error);
            typeMessage('Failed to get response. Try again later.', 'bot');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        postBotMessage("Welcome to MEDIHELP. How may I be of assistance?");
    };

    const postUserMessage = (content: string) => {
        setMessages(messages => [...messages, { content, sender: 'user' }]);
    };

    const postBotMessage = (content: string) => {
        setMessages(messages => [...messages, { content, sender: 'bot' }]);
    };

    const typeMessage = (text: string, sender: 'user' | 'bot') => {
        const delay = 50; // Delay in ms between each character
        let typedMessage = '';
        let index = 0;

        const typeChar = () => {
            if (index < text.length) {
                typedMessage += text.charAt(index);
                if (index === 0) {
                    setMessages(messages => [...messages, { content: typedMessage, sender }]);
                } else {
                    setMessages(messages => [...messages.slice(0, -1), { content: typedMessage, sender }]);
                }
                index++;
                setTimeout(typeChar, delay);
            }
        };

        typeChar();
    };

    return (
        <Box sx={{ p: { md: '20px 90px', xs: '20px 30px' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '70px', fontWeight: 'light', textTransform: 'uppercase', color: '#000' }}>
                    Medihelp
                </Typography>
                <Box sx={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                        sx={{ width: '40px', height: '40px', boxShadow: 'none', cursor: 'pointer',marginRight:0, }}
                        onClick={handleNewChat}
                    >
                        <img
                            src={process.env.PUBLIC_URL + '/images/pencil.png'}
                            alt='Start New Chat'
                            style={{ width: '100%', height: '100%' }}
                        />
                    </Box>
                    <Box
                        sx={{ width: '40px', height: '40px', boxShadow: 'none', cursor: 'pointer',marginRight:8, }}
                        onClick={() => console.log("Profile functionality to be added here")}
                    >
                        <img
                            src={process.env.PUBLIC_URL + '/images/user.png'}
                            alt='Profile'
                            style={{ width: '100%', height: '100%' }}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{
                    width: { xs: 'auto', md: '1000px' },
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
                                outline: 'solid 1px #000',
                            }}
                            InputProps={{
                                style: { paddingRight: '20px' },
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        style={{
                                            marginRight:'10px'
                                        }}>
                                        <IconButton
                                            onClick={handleSendMessage}
                                            edge="end"
                                        >
                                            <img
                                                src={process.env.PUBLIC_URL + '/images/stethoscope.png'}
                                                alt="Send"
                                                style={{
                                                    width: '40px',
                                                    height: '40px'
                                                }} // Adjust size as needed
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Box>
                <Typography sx={{
                    marginLeft: '20px',
                    fontSize: '18px',
                    fontWeight: 'light',
                    color: '#000',
                    maxWidth: '240px'
                }}>
                    "The good physician treats the disease; the great physician treats the patient who has the disease." – William Osler
                </Typography>
            </Box>
        </Box>
    );
};

export default ChatBot;
