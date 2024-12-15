import React,{useContext} from "react";
import "./Home.css";
import { Link } from 'react-router-dom';
import AlgorithmImg from './AlgorithmImg.png';
import ConvertImg from './ConvertImg.png';
import AnalyzeImg from './AnalyzeImg.png';
import FB from './FB.png';
import IG from './instagram.png';
import X from './twitter.png';
import { CodeContext } from "../Context/Context";


export default function Home() {

  const { username } = useContext(CodeContext); 

  return (
    <div className="homeContainer">
      <nav className="navbar">
        <a>
          <div className="logoNav">
            <div className="navLogo1">
              <span className="vcodeNav">
                <span className="letterVnav">V</span>Code
              </span>
              &nbsp;|
            </div>
            <div className="navLogo2">
              Program
              <br /> Together
            </div>
          </div>
        </a>
        <div className="choiceNav">
          <a href="#About" className="navLink1">
            About
          </a>
          <Link to="/codeease"><a href="" className="navLink1">
            CodEase
          </a></Link>
          <a href="#contact" className="navLink1">
            Contact
          </a>
        </div>
        <div className="loginSignup">
        {username ? (
          <span className="usernameDisplay">Welcome, {username}</span>
        ) : (
          <>
            <Link to="/login" className="navLink2">
              Login
            </Link>
            <Link to="/signup" className="navLink3">
              Signup
            </Link>
          </>
        )}
        </div>
      </nav>
      <div id="About"><br/><br/></div>
      <section className="homeSection" >
        <br/>
        <br/>
        <h2 >Home to Community of Programming Students</h2>
        <br />
        <p>
          The product enables <b>cross-language flexibility</b>, allowing
          developers to convert code between languages to enhance collaboration
          and adaptability. By analyzing time complexity, optimality, and
          alternatives, it helps create faster, more <b>efficient</b> code.
          Detailed feedback fosters learning, strengthening users'{" "}
          <b>understanding</b> of algorithms and data structures. Automated
          analysis saves time on manual reviews, letting developers focus on
          other tasks. Acting as an intelligent assistant, it supports{" "}
          <b>quality assurance</b> by highlighting optimal approaches, helping
          teams maintain robust, scalable, and maintainable codebases.
        </p>
      </section>
      <section className="a3">
      <h2>CodEase</h2>
      <h3>
      <span>Algorithm</span>
      <span>Convert</span>
      <span>Analyze</span>
      </h3>
      </section>

      <div  className="shape1">
      <img src={AlgorithmImg}></img>
      <span className="hoverMessage1"><b>ALGORITHM </b><br></br>Step-by-step procedure for performing a program in a specific order.</span>
      </div>
      
      <div  className="shape2">
      <img src={ConvertImg}></img>
      <span className="hoverMessage2"><b>CONVERT </b><br></br>Converts the given code to the required programming language with syntax</span>
      </div>
      
      <div  className="shape3">
      <img src={AnalyzeImg}></img>
      <span className="hoverMessage3"><b>ANALYZE</b><br></br>Explorers the approach used in the code and checks for its optimality</span>
      </div>
      
      <footer id="contact">
          <div className='footer-content'>
            <div className='footer-section'>
              <h2>Contact Us</h2>
              <p>If you have any questions or feedback, feel free to reach out to us:</p>
              <p>Email: <a href="mailto:support@insightquest.com">support@vcode.com</a></p>
              <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
            </div>
            <div className='footer-section'>
              <h2>Follow Us</h2>
              <p>Stay updated with our latest news and updates:</p>
              <br></br>
              <div className='social-links'>
                <a href="https://facebook.com/vcode" target="_blank" rel="noopener noreferrer" className='social-icon'>
                  <img src={FB} alt="Facebook" />
                </a>
                <a href="https://twitter.com/vcode" target="_blank" rel="noopener noreferrer" className='social-icon'>
                  <img src={X} alt="Twitter" />
                </a>
                <a href="https://instagram.com/vcode" target="_blank" rel="noopener noreferrer" className='social-icon'>
                  <img src={IG} alt="Instagram" />
                </a>
              </div>
            </div>
            <div className='footer-section'>
              <h2>About Us</h2>
              <p>VCode is dedicated to bring you the best platform to test and improve your code. Join our community and challenge yourself today!</p>
            </div>
          </div>
          <div className='footer-bottom'>
            <p>&copy; {new Date().getFullYear()} VCode. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
