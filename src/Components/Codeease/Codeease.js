import React, { useState, useRef ,useEffect} from 'react';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import './Codeease.css'; 
import CodeEaseIcon from '../Source/CodeEaseIcon.png';
import QuestionIcon from './QuestionIcon.png';
import CodeIcon from './CodeIcon.png';
import AlgorithmImg from './AlgorithmImg.png';
import ConvertImg from './ConvertImg.png';
import AnalyzeImg from './AnalyzeImg.png';
import BackToHome from './BackToHome.png';
import Aos from 'aos'
import 'aos/dist/aos.css';

import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

const Codeease = () => {

    
    const genAI = new GoogleGenerativeAI("AIzaSyA7lHjcm7_9jgbCtpNjybKY4ZhTGj7-7Hg");

    const [question, setQuestion] = useState('');
    const [code, setCode] = useState('');
    const [convertedCode, setConvertedCode] = useState(''); 
    const [selectedLanguage, setSelectedLanguage] = useState('convert'); 
    const [analysis, setAnalysis] = useState(null);
    const [algorithm, setAlgorithm] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);  
    const [height, setHeight] = useState('113vh');

    useEffect(()=>{
        Aos.init();
    },[])

    const convertedCodeRef = useRef(null);
    const analysisRef = useRef(null);
    const algorithmRef = useRef(null);

    const handleHeightChange = () => {
        setHeight('230vh');
      };
    
    const scrollToSection = (sectionRef) => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleAlgorithmClick = async () => {
        // Start loading (show spinner)
        setIsLoading(true); 
    
        try {
            // Generate a prompt based on the question and code
            const prompt = `Generate an algorithm for the following question and code:\nQuestion: ${question}\nCode: ${code}\nPlease provide each step on a new line.`;
    
            // Call the generative AI model to generate the algorithm
            const result = await genAI.getGenerativeModel({
                model: "gemini-1.5-pro",
                generationConfig: {
                    responseMimeType: "text/plain",
                },
            }).generateContent(prompt);
    
            // Clear previous results
            setConvertedCode('');  // Clear any converted code
            setAnalysis(null);      // Clear previous analysis if any
    
            // Set the generated algorithm
            setAlgorithm(result.response?.text());
    
            // Scroll to the algorithm section after receiving the result
            scrollToSection(algorithmRef); 
    
        } catch (error) {
            // Handle any errors that occurred during the process
            console.error('Error generating algorithm:', error);
        } finally {
            // Stop loading (hide spinner)
            setIsLoading(false);  
        }
    };
    

    const handleConvertClick = async (event) => {
        const value = event.target.value;
    
        // Start loading (show spinner)
        setIsLoading(true);  
        
        try {
            if (value !== 'convert') {
                // Clear previous states
                setAlgorithm('');
                setAnalysis(null);
                setSelectedLanguage(value);
    
                // Convert code to the selected language
                await convertCodeToLanguage(value);
    
                // Scroll to the converted code section
                scrollToSection(convertedCodeRef);
            }
        } finally {
            // Stop loading (hide spinner) regardless of success or failure
            setIsLoading(false);  
        }
    };
    
    const handleAnalyzeClick = async () => {
        setConvertedCode('');   
        setAlgorithm('');       
        setAnalysis(null);
        setIsLoading(true);     
    
        try {
            await fetchAnalysis({ question, code });  // Fetch analysis
            scrollToSection(analysisRef);  // Scroll to analysis section
        } catch (error) {
            console.error('Error analyzing code:', error);  // Handle any error
        } finally {
            setIsLoading(false);  // Hide the spinner
        }
    };
    

    const convertCodeToLanguage = async (language) => {
        try {
            const prompt = `Convert the following code to ${language} without any comments in it and provide no explanation:\nCode: ${code}`;
            const result = await genAI.getGenerativeModel({
                model: "gemini-1.5-pro",
                generationConfig: {
                    responseMimeType: "text/plain",
                },
            }).generateContent(prompt);
            
            setConvertedCode(result.response?.text()); 
        } catch (error) {
            console.error('Error converting code:', error);
        }
    };

    const fetchAnalysis = async (userInput) => {
        try {
            const schema = {
                description: "Analysis of code or question",
                type: SchemaType.OBJECT,
                properties: {
                    approachUsed: {
                        type: SchemaType.STRING,
                        description: "Approach taken for the solution",
                        nullable: false,
                    },
                    languageUsed: {
                        type: SchemaType.STRING,
                        description: "Programming language used in the solution",
                        nullable: false,
                    },
                    optimality: {
                        type: SchemaType.STRING,
                        description: "Optimality of the answer",
                        nullable: false,
                    },
                    timeComplexity: {
                        type: SchemaType.STRING,
                        description: "Time complexity of the solution",
                        nullable: false,
                    },
                    otherApproaches: {
                        type: SchemaType.STRING,
                        description: "Other approaches used with their complexity and explanation",
                        nullable: false,
                    },
                },
                required: ["approachUsed", "languageUsed", "optimality", "timeComplexity", "otherApproaches"],
            };

            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-pro",
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            });

            const prompt = `Analyze the following question and code: \nQuestion: ${userInput.question} \nCode: ${userInput.code} \nPlease include the Approach, Language Used, Time Complexity, Optimality, and Other Approaches in your response.`;
            const result = await model.generateContent(prompt);
            const analysisData = JSON.parse(result.response.text());

            setAnalysis(analysisData);
        } catch (error) {
            console.error('Error fetching analysis:', error);
        }
    };

    const formatText = (text) => {
        if (!text) return ''; 
        return text.replace(/\\/g, '') 
                   .replace(/\*\*(.*?)\*\*/g, '<em>$1</em>')
                   .replace(/\n/g, '<br />'); 
    };

    const formatAlgorithm = (text) => {
        if (!text) return ''; 
        return text.replace(/\*\*(.*?)\*\*/g, '<em>$1</em>') 
                    .replace(/##/g, '')
                    .replace(/```/g, '')
                   .replace(/\n/g, '<br />'); 
    };

    const handlePrint = (sectionRef) => {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>VCode</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                        }
                        h2 {
                            font-size: 20px;
                            margin-bottom: 10px;
                        }
                        pre {
                            white-space: pre-wrap;
                            word-wrap: break-word;
                            font-family: Arial, Helvetica, sans-serif;
                        }
                        @media print {
                        .no-print {
                            display: none;
                        }
                    }
                    }
                    </style>
                </head>
                <body>
                    ${sectionRef.current.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };
    
    
    return (
        <div className='codeease' style={{minHeight:height}}>
            <div className='writings'>
                <div className='ask'>ask</div>
                <div className='connect'>connect</div>
                <div className='understand'>understand</div>
            </div>
        
        <div className = "codeEaseLogo">
        <p className='logoName'>
            Cod<span className='letterE'>E</span>ase
        </p>
        &nbsp;
        &nbsp;
        &nbsp;
        <img className="logoImage" src={CodeEaseIcon} ></img>
        </div>
        <div className='container'>
            <div className="card">
                <h2>Enter Your Question<img src={QuestionIcon} className='QuestionIcon'/></h2>
                <textarea
                    value={question}
                    className='question'
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Eg - Is the given number odd or even ?"
                    rows="4"
                    spellCheck="false"
                    autoCorrect="off"   // Disable autocorrect
                    autoCapitalize="off"
                ></textarea>
            
                <h2>Enter Your Code<img src={CodeIcon} className='CodeIcon'/></h2>
                <textarea
                    className='code'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Eg - Programming code checking either the number is odd or even."
                    rows="8"
                ></textarea>
                </div>
                

            
            <div className="button-container">
                <button onClick={handleAlgorithmClick}>Algorithm</button>
                <div className="dropdown-wrapper">
                    <select name="Language" id="language" title="Click to select language" onChange={handleConvertClick} value={selectedLanguage}>
                        <option value="convert" disabled hidden>Convert</option>
                        <option value="c">C</option> 
                        <option value="c++">C++</option> 
                        <option value="java">Java</option> 
                        <option value="python">Python</option> 
                    </select>
                </div>
                <button onClick={() => {handleHeightChange(); handleAnalyzeClick(); }}>Analyze</button>
            </div>

            {isLoading && 
                <div className='loading'>
                <GradientCircularProgress />
                </div>
            }

            {convertedCode && (
                <>
                <div data-aos="fade-up" data-aos-duration="3000"><img src={ConvertImg} className='AlgorithmImg'/></div>
                <div ref={convertedCodeRef} className="convertedcode" style={{ marginTop: '30px', border: '1.5px solid #ceceea', padding: '50px', borderRadius: '8px', backgroundColor: '#ffffff' ,marginBottom: '20px',color: '#24223e',boxShadow : '0 0 15px rgba(13, 21, 56, 0.1)' }}>
                    <h2>Converted Code</h2>
                    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' ,fontFamily: "var(--cs-font-post-content-family), sans-serif",fontSize: '19px'}} dangerouslySetInnerHTML={{ __html: formatAlgorithm(convertedCode) }}/>
                    <br></br>
                    <button className="no-print" onClick={() => handlePrint(convertedCodeRef)}>Print</button>
                </div>
                </>
            )}

            
            {analysis && (
                <>
                <div data-aos="fade-up" data-aos-duration="3000"><img src={AnalyzeImg} className='AlgorithmImg'/></div>
                
                <div ref={analysisRef} style={{ marginTop: '35px', border: '1.5px solid #ceceea', padding: '50px', borderRadius: '8px', backgroundColor: '#ffffff',marginBottom: '20px',fontFamily: "var(--cs-font-post-content-family), sans-serif",fontSize: '19px' ,color: '#24223e',boxShadow : '0 0 15px rgba(13, 21, 56, 0.1)' }}>
                    <h2>Analysis Result</h2>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Approach:</strong><br />
                        <span dangerouslySetInnerHTML={{ __html: formatText(analysis.approachUsed.replace(/"/g, '').trim()) }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Programming Language Used:</strong><br />
                        <span>{analysis.languageUsed.replace(/"/g, '').trim()}</span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Time Complexity:</strong><br />
                        <span>{analysis.timeComplexity.replace(/"/g, '').trim()}</span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Optimality:</strong><br />
                        <span>{analysis.optimality.replace(/"/g, '').trim()}</span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <strong>Other Approaches:</strong><br />
                        <span dangerouslySetInnerHTML={{ __html: formatText(analysis.otherApproaches.replace(/"/g, '').trim()) }} />
                    </div>
                    <br></br>
                    <button className="no-print" onClick={() => handlePrint(analysisRef)}>Print</button>
                </div>
                </>
            )}

            
            {algorithm && (
                <>
                <div data-aos="fade-up" data-aos-duration="3000"><img src={AlgorithmImg} className='AlgorithmImg'/></div>
                <div ref={algorithmRef} className="algorithm" style={{ marginTop: '35px', border: '1.5px solid #ceceea', padding: '50px', borderRadius: '8px', backgroundColor: '#ffffff',marginBottom: '20px', fontSize: '19px',color: '#24223e' ,boxShadow : '0 0 15px rgba(13, 21, 56, 0.1)' }}>
                    <h2>Generated Algorithm</h2>
                    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word',fontFamily: "var(--cs-font-post-content-family), sans-serif" }} dangerouslySetInnerHTML={{ __html: formatAlgorithm(algorithm) }} />
                    <br></br>
                    <button className="no-print" onClick={() => handlePrint(algorithmRef)}>
                    Print
                    </button>
                </div>
                </>
            )}
            <br></br>
            <br></br>
        </div>
        </div>
    );
};

export default Codeease;

function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress  sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </React.Fragment>
    );
  }
