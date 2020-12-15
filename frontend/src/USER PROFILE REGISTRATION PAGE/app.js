 class ProfilesList extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                profiles: [],
            };
        }
    
        async componentDidMount() {
            const {authService, profileService} = this.props; 
            
            const user = authService.getCurrentUser();
            const profiles = await profileService.getByUserId(user.uid);
            this.setState({
                profiles: profiles
            });
        }
    
        render() {
            const {profiles} = this.state;
    
            return (
                <ul>
                    {profiles.map(profile => (
                        <li key={profile.id}>
                            <Link to={`/profiles/${profile.id}`}>
                                <img src={profile.imageUrl} width={200} />
                                <p>Name: {profile.name}</p>
                                <p>Breed: {profile.breed}</p>
                                <p>Age: {profile.age}</p>
                                <p>Gender: {profile.gender}</p>
                                <p>Quote: {profile.quote}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )
        }
    
    };
    
    const ProfileDetailPage = () => {
    
        const profileService = useContext(ProfileContext);
    
        const [profile, setProfile] = useState(null);
    
        const match = useRouteMatch({
            path: '/profiles/:id',
            strict: true,
            sensitive: true
        });
    
        const profileId = match.params.id;
    
        profileService.getByProfileId(profileId)
            .then(profileObj => setProfile(profileObj))
            .catch(error => console.log(error));
    
        return (
            <>{profile ? (
                <>
                    <img src={profile.imageUrl} width={300} />
                    <p>name: {profile.name}</p>
                    <p>breed: {profile.breed}</p>
                    <p>age: {profile.age}</p>
                    <p>gender: {profile.gender}</p>
                    <p>quote: {profile.quote}</p>
                </>
            ) : (
                <p>Profile details</p>
            )
            }</>
        )
    };
    
    const UserGreeting = () => {
    
        const authService = useContext(AuthContext);
    
        const user = authService.getCurrentUser();
    
        return (
            <h1>Hi user { user.id }</h1>
        );
    };
    
    
    const CreateProfile = () => {
    
        const [name, setName] = useState('');
        const [breed, setBreed] = useState('');
        const [age, setAge] = useState('');
        const [gender, setGender] = useState('');
        const [quote, setQuote] = useState('');
        const [imageFile, setImageFile] = useState(null);
    
        const authService = useContext(AuthContext);
        const profileService = useContext(ProfileContext);
    
        const handleCreateProfile = (event) => {
            event.preventDefault();
    
            const user = authService.getCurrentUser();
            
            profileService.create(user.uid, imageFile, {name, breed, age, gender, quote})
                .then(() => console.log('Profile created'))
                .catch(error => console.log(error));
        };
    
        return (
            <>
            <input type="file" id="profile-pic" onChange={event => setImageFile(event.target.files[0])} />
                <input type="text" id="name" placeholder="Name" onChange={event => setName(event.target.value) }/>
            
                <input type="text" id="breed" placeholder="Breed" onChange={event => setBreed(event.target.value) }/>
                <input type="text" id="age" placeholder="Age" onChange={event => setAge(event.target.value) }/>
                <input type="radio" id="radiobutton" value="Female">
        <label >Female</label>
        &nbsp;&nbsp;&nbsp;
        <input type="radio" name="radiobutton" value="Male">
        <label >Male</label> 
                <input type="text" id="quote" placeholder="Quote" onChange={event => setQuote(event.target.value) }/>
                
                <button onClick={handleCreateProfile}>Create Profile</button>
            </>
        )
    }
    