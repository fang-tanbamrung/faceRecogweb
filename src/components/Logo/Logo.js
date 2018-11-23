import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'

const Logo = () => {
    return(
        <div className='ma4 mt0' >
            <Tilt className="Tilt br2 shadow-3" options={{ max : 40 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3" > 
                    <img className='ma2' style = {{height:50,width:50}}
                    alt='logo' src="https://img.icons8.com/ios/50/000000/critical-thinking-filled.png"/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;