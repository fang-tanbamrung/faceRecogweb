import React from 'react';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
    return(
        <div>
            <p className='f3'>{'This Magic Brain will detect faces in your pictures. Give it a try.'}</p>
            <div className='flex justify-center'>
                <div className='pa4 br2 shadow-5 w-50'>
                    <input type='text' onChange={onInputChange}
                    className='br3 f4 pa2 w-70 center'/>
                    <button onClick={onButtonSubmit}
                    className='ba br2 w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer'>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;