import React from "react";
import  Typewriter  from "typewriter-effect";


const Jumbotron = ({text}) => {
  return <Typewriter options={{
      strings:text,   // array of strings 
      autoStart:true,
      loop:true
  }} />;
};

export default Jumbotron;
