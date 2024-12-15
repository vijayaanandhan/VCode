import React, { createContext, useState } from 'react';

export const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  
  return (
    <CodeContext.Provider value={{ username, setUsername}}>
      {children}
    </CodeContext.Provider>
  );
};