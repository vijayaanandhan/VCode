import React,{useLayoutEffect, useRef} from 'react';
import './WhyVcode.css';

import img_1 from "./city1.png";
import img_2 from "./city2.png"; 
import img_3 from "./city3.png"; 
import img_4 from "./city4.png";
import img_5 from "./city5.png"; 
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap. registerPlugin(ScrollTrigger); 
export default function WhyVcode() {

  const class1Container= useRef()
  const cities = [
    {
      img:img_1,
      city: "Al-Quds - Palestine"
    },
    {
      img:img_2,
      city: "2"
    },
    {
      img: img_3,
      city: "A3"
    },
    {
      img:img_4,
      city: "4"
    },
    {
      img:img_5,
      city: "5"
    },
  ]
   
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const elements = Array.from(document.querySelectorAll('.class3')).slice(1);
      
      gsap.fromTo(elements,
         {
           x: 1000,
           rotate:-90 
        }, 
        { 
          x: 0,
          rotate:0,
          stagger:0.5,
          scrollTrigger:{
            pin:class1Container.current,
            scrub:0.5
          } 
        });
    });
    
    return () => ctx.revert();
  }, []);
  

return (
  <div className="class1" ref={class1Container} >
    <div className='why'>WHY</div>
    <div className='whyvcode'>VCODE</div>
    <div className="class2"> 
      {cities.map((city) => { 
        return(
          <div kéy={city.city} className="card1">
            <img className="class3" src={city. img} alt="" /> 
          </div>
        );
      })}      
    </div>
  </div>
);
}