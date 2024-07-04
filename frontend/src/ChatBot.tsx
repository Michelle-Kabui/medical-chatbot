import { Box, Typography, TextField, IconButton } from '@mui/material';
import React, { useState } from 'react';

const ChatBot = () => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        // Handle send message functionality here
        console.log(message);
        setMessage('');
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
                    {/* This box will contain the chatbot */}
                    <Box sx={{ flexGrow: 1 }}>
                        {/* Chat messages will go here */}
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
                            onClick={handleSendMessage} // Functionality for sending user queries
                        >
                            <img
                                src={process.env.PUBLIC_URL + '/images/stethoscope.png'}
                                alt={'landing'}
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
