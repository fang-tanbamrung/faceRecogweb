import React from 'react';
import './FaceReacognition.css';

const bounding = (array) => array.map((box,i) => <div key={i} className='bounding-box' style={{top:box.top,bottom:box.bottom,right:box.right,left:box.left}}></div>)


const FaceRecognition = ({box,imageUrl}) => { 
    return(
        <div className='flex justify-center'>
            <div className='absolute mt2'>
                <img alt = '' src={imageUrl} width='500px' height='auto' id = 'inputimage' />
                {box.length?
                 bounding(box)
                 :<p></p>
                }
            </div>
        </div>
    )
}

export default FaceRecognition;