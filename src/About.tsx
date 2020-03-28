import React from 'react';
import { useHistory } from 'react-router';
const About = () => {
    let hist = useHistory()
    const f = () => {
        hist.push('/')
    }
  return <>About
  <button onClick={() => f()}>RRRR</button>
  </>;
};

export default About;
