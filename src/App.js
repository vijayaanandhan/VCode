import React,{useContext} from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login.js';
import Signup from './Components/Signup/Signup.js';
import Codeease from './Components/Codeease/Codeease.js';
import Home from './Components/Home/Home.js';
import { CodeContext, CodeProvider } from './Components/Context/Context.js';

export default function App() {

function ProtectedRoute({ children }) 
{
  const { username } = useContext(CodeContext);
  return username ? children : <Navigate to="/" />;
}

  return (
    <CodeProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/" element={<Home/>} />
              <Route path="/codeease" element={<ProtectedRoute><Codeease/></ProtectedRoute>} />
          </Routes>
      </BrowserRouter>
    </CodeProvider>
  )
}
