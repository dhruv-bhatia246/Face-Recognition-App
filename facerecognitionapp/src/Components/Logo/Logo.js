import React from 'react';
import 'tachyons';
import Tilt from 'react-tilt';
import './Logo.css';
import face from './face.png';

const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt shadow-2 br2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3"> <img style={{height:'70px', paddingTop:'23px'}} src={face} alt="logo"/> </div>
            </Tilt>
        </div>
    )
}

export default Logo;