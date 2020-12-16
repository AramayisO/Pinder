import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';

const ProfileCreatorForm = (props) => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('male');
    const [type, setType] = useState('dog');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewDataURL, setPreviewDataURL] = useState('');

    const handleProfilePic = (file) => {
        setImageFile(file);

        let reader = new FileReader();
        reader.onload = (e) => {
            setPreviewDataURL(e.target.result);
        }
        reader.readAsDataURL(file);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = { name, type, breed, gender, age, bio }; 
        
        props.onSubmit(props.user.uid, imageFile, data)
            .then(() => history.replace('/profiles'))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
            </Form.Group>
            <Form.Group controlId='type'>
                <Form.Label>Type</Form.Label>
                <Form.Check 
                    type='radio'
                    label='Dog'
                    id='type-radio-male'
                    checked={type === 'dog'}
                    onClick={() => setType('dog')}
                />
                <Form.Check 
                    type='radio'
                    label='Cat'
                    id='type-radio-female'
                    checked={type === 'cat'}
                    onClick={() => setType('cat')}
                />
            </Form.Group>
            <Form.Group controlId='breed'>
                <Form.Label>Breed</Form.Label>
                <Form.Control
                    type='text'
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='gender'>
                <Form.Label>Gender</Form.Label>
                <Form.Check
                    type='radio'
                    label='Male'
                    id='gender-radio'
                    checked={gender === 'male'}
                    onClick={() => setGender('male')}
                />
                <Form.Check
                    type='radio'
                    label='Female'
                    id='gender-radio'
                    checked={gender === 'female'}
                    onClick={() => setGender('female')}
                />
            </Form.Group>
            <Form.Group controlId='age'>
                <Form.Label>Age</Form.Label>
                <Form.Control 
                    type='text'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='bio'>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='profile-picture'>
                <Form.Label>Profile Picture</Form.Label>
                <Form.File
                    id="profil-picture-file"
                    onChange={(e) => handleProfilePic(e.target.files[0])}        
                />
                <img src={previewDataURL} width={200} />
            </Form.Group>
            {props.error &&
                <Alert variant="danger">
                    {props.error}
                </Alert>
            }
            <div className="text-center">
                <Button type="submit" className="px-4 LoginForm-button">
                    Create
                </Button>
            </div>
        </Form>
    );
};

export default ProfileCreatorForm;