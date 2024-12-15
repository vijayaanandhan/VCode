import React, { useRef, useContext, useState } from 'react';
import './Signup.css';
import Video from '../Source/Bgvideo.mp4';
import { CodeContext } from '../Context/Context';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


function Signup() {
  const [signupDetails, setSignupDetails] = useState({});
  const navigate = useNavigate();
  const { setUsername } = useContext(CodeContext); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); 
  const videoRef = useRef(null);

  const checkUserExists = async (username) => {
    try {
      const response = await axios.get('http://localhost:8081/user/getUser');
      return response.data.some(user => user.username === username);
    } catch (error) {
      console.error('Error fetching users:', error);
      return false;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const userExists = await checkUserExists(signupDetails.username);
    if (userExists) {
      alert('User already exists. Redirecting to login...');
      navigate('/login');
      return;
    }

    axios.post('http://localhost:8080/user/insertUser', signupDetails)
      .then(response => {
        alert('Signup successful:');
        setUsername(signupDetails.username); 
        navigate('/'); 
      })
      .catch(error => {
        console.error('Signup error:', error);
      });
  };

  const handleInputChange = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(value === signupDetails.password);
  };

  const handleCanPlay = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.1; // Set playback speed once the video can play
    }
  };

  return (
    <div className="signup-container">
      {/* Left Side */}
      <div className="signup-left-side">
        <video autoPlay loop muted className="signup-background-video" onCanPlay={handleCanPlay}>
          <source src={Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="signup-content">
          <h1>Welcome to</h1>
          <h2><span className='vcodeSignup'><span className='letterVsignup'>V</span>Code</span> Community</h2>
          <p>Home to community of programming students</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="signup-right-side">
        <h1>Join us</h1>
        <h2>Create a VCode account</h2>
        <p>Be part of programming students worldwide</p>
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="text"
            name="username"
            placeholder="Your username"
            className="signup-input-field"
            value={signupDetails.username}
            onChange={handleInputChange}
          />
          
          <input
            type="password"
            name = "password"
            placeholder="Your password"
            className="signup-input-field"
            value={signupDetails.password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Confirm your password"
            className="signup-input-field"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!passwordMatch && (
            <p className="password-warning" style={{color:"#ff0000",fontSize:"17px",marginTop:"2px"}}>Passwords do not match</p>
          )}

          <button className="signup-button">Sign Up</button>
        </form>
        <p className="signup-login" style={{color:"#000000"}}>
          Already have an account? <Link to="/login"><a >Log in</a></Link>
        </p>
        <div className="trapezium"></div>;
        <div className="trapezium2"></div>;
      </div>
    </div>
  );
}

export default Signup;
