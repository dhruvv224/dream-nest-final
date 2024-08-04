import React from 'react';
import { ReactTyped } from 'react-typed';

const Slide = () => {
    const slideStyle = {
        backgroundImage: "url('/assets/slide.jpg')",
        // height: '50vh',
        width: '100vw',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // textAlign: 'center',
        color: '#ffffff', // Example text color
    };

    return (
        <div className='slide h-[50vh] md:h-[80vh]' style={slideStyle}>
            <h1 className='md:text-[40px] text-[30px] font-bold pt-10 md:pr-5 text-center'>
                Welcome Home! Anywhere you roam <br /> 
                <ReactTyped className='pl-3' strings={['Stay in the moment.', 'Make your memories.']} typeSpeed={100} backSpeed={60} loop/>
             
            </h1>
        </div>
    );
};

export default Slide;
