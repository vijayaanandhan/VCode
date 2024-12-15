import React,{useState,useEffect, useRef,useContext} from 'react';
import './Login.css';
import Video from '../Source/Bgvideo.mp4';
import { CodeContext } from '../Context/Context';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [users, setUsers] = useState([]);
  const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });
  const { setUsername } = useContext(CodeContext);
  const navigate = useNavigate();

  useEffect(() => 
    {
      axios.get('http://localhost:8081/user/getUser') 
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error:', error));
    }, []);
  
    const handleLogin = (e) => 
    {
      e.preventDefault();  
      const foundUsers = users.filter(user => user.username === loginDetails.username);
      
      if (foundUsers.length > 0 && foundUsers[0].password === loginDetails.password) 
      {
        setUsername(foundUsers[0].username);
        
        navigate('/');
      } 
      else if (foundUsers.length > 0) 
      {
        alert('Incorrect Login Details');
      } 
      else 
      {
        alert('User not found. Please Sign Up');
        navigate('/signup');
      }
    };
  
    const handleInputChange = (e) => 
    {
      setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    };

  const videoRef = useRef(null);

  const handleCanPlay = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.1; 
    }
  };

  return (
    <div className='login-body'>
    <div className="container">
      {/* Left Side */}
      <div className="left-side">
         <video autoPlay loop muted className="background-video" onCanPlay={handleCanPlay} >
         <source src={Video} type="video/mp4" />
             Your browser does not support the video tag.
         </video>
        <div className="content">
          <h1>Welcome to</h1>
          <h2><span className='vcodeLogin'><span className='letterVlogin'>V</span>Code</span> Community</h2>
          
          <p>Home to community of programming students</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="right-side">
        <h1>Welcome Back!</h1>
        <h2>Login to your account</h2>
        <p>It's nice to see you again. Ready to code?</p>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Your username or email"
            className="input-field"
            value={loginDetails.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            className="input-field"
            value={loginDetails.password}
            onChange={handleInputChange}
          />
          <div className="options">
            
          </div>
          <button className="login-button">Log In</button>
        </form>
        <p className="signup" style={{color:"#000000"}}>
          Don't have an account? <Link to="/signup"><a href="/">Sign up</a></Link>
        </p>
        <div className="trapezium"></div>;
        <div className="trapezium2"></div>;
        </div>
    </div>
    </div>
  );
}

export default Login;
