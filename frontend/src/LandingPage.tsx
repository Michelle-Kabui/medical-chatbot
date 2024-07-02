import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

function LandingPage() {
    const [loading, setLoading] = useState(false);

    const handleGetStarted = () => {
        setLoading(true);
        setTimeout(() => {
            window.location.href = 'http://localhost:8000';
        }, 5000);
    };

    useEffect(() => {
        if (loading) {
            // Redirect after 5 seconds
            const timer = setTimeout(() => {
                setLoading(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    return (
        <>
            <Box sx={{
                display: { xs: 'block', md: 'flex' },
                padding: { xs: '16px', md: '10% 0px' },
                gap: { xs: '16px', md: '50px' },
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box sx={{
                    width: { xs: 'auto', md: '600px' },
                    height: { xs: 'auto', md: 'auto' },
                }}>
                    <Typography sx={{
                        fontFamily: 'Jura, Arial, sans-serif',
                        color: '#FFFFFF',
                        fontSize: '70px',
                        fontWeight: 'normal',
                        lineHeight: '42px',
                        marginBottom: '10px',
                        textAlign: 'center'
                    }}>
                        MEDIHELP
                    </Typography>
                    <Typography sx={{
                        fontFamily: 'Jura, Arial, sans-serif',
                        color: '#FFFFFF',
                        fontSize: '20px',
                        fontWeight: 'light',
                        mb: '10px',
                        textAlign: 'center'
                    }}>
                        Navigating Health Together: Your Personalized Chat Companion for Medical Queries
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Button
                            onClick={handleGetStarted}
                            sx={{
                                bgcolor: '#D9D9D9',
                                borderRadius: '30px',
                                width: '200px',
                                height: '40px',
                                '&:hover': {
                                    bgcolor: '#FFFFFF',
                                }
                            }}
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: '#000000' }} />
                            ) : (
                                <Typography sx={{
                                    textTransform: 'uppercase',
                                    fontWeight: 'light',
                                    fontSize: '16px',
                                    color: '#000000',
                                }}>
                                    Get Started
                                </Typography>
                            )}
                        </Button>
                    </Box>
                </Box>
                <Box sx={{
                    width: { xs: 'auto', md: 'auto' },
                    height: { xs: 'auto', md: '400px' },
                }}>
                    <img
                        src={process.env.PUBLIC_URL + '/images/landing.png'}
                        alt={'landing'}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
            </Box>
        </>
    );
}

export default LandingPage;
