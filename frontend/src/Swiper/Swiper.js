import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../auth';
import { ProfileContext } from '../profile';
import './swiper.css';

// The JavaScript % operator is the remainder not the modulo.
// We need this function to correctly handle mod of negative numbers.
const mod = (n, m) => ((n % m) + m) % m;

const Swiper = () => {

    const authService = useContext(AuthContext);
    const profileService = useContext(ProfileContext);
    const cardRef = useRef(null)
    const [profiles, setProfiles] = useState([]);

    const handleClick = (direction) => {
        if (direction === 'left') {
            cardRef.current.className += ' slide-out-left';
        } else if (direction === 'right') {
            profileService.addMatch(authService.getCurrentUser().uid, profiles[0].id);
            cardRef.current.className += ' slide-out-right';
        }
    }

    const popProfile = () => {
        const [head, ...tail] = profiles;
        setProfiles(tail);
        setTimeout(() => {
            if (cardRef && cardRef.current) {
                cardRef.current.className = 'card'
            }
        }, 500);
    }

    const buttonStyle = {
        backgroundColor: '#D5A6BD',
        borderColor: '#D5A6BD',
        color: '#212121',
    };

    useEffect(() => {
        if (!profiles.length) {
            profileService.getMatchSuggestions(authService.getCurrentUser().uid)
                .then(profiles => {
                    setProfiles(profiles)
                });
        }
    }, []);

    return (
        <Container className='d-flex flex-column align-items-center py-5'>
            {profiles.length ? (
                <>
                    <Card style={{ width: '18rem' }} ref={cardRef} onAnimationEnd={popProfile}>
                        <div style={{ backgroundImage: `url(${profiles[0].imageUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                            <Card.Img
                                variant='top'
                                width={286}
                                height={358}
                                style={{ visibility: 'hidden' }}
                            />
                        </div>
                        <Card.Body>
                            <Card.Title>{profiles[0].name}</Card.Title>
                            <Card.Text>{profiles[0].breed}</Card.Text>
                        </Card.Body>
                    </Card>
                    <div className='mt-4'>
                        <Button
                            className='mr-2'
                            style={buttonStyle}
                            onClick={() => handleClick('left')}
                        >
                            Swipe Left
                        </Button>
                        <Button 
                            style={buttonStyle}
                            onClick={() => handleClick('right')}
                        >
                            Swipe Right
                        </Button>
                    </div>
                </>
            ) : (
                <p>You have no potential matches</p>
            )}
            
        </Container>
    );

};

export default Swiper;