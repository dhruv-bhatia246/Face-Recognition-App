import React from 'react';
import 'tachyons';
import './ImageLink.css';

const ImageLinkForm = ({onURLchange, onSubmit}) => {
    return(
        <div>
            <p className='f3'>
                {'This Magic Face App will detect faces in your pictures. Give it a try.'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input type='text' className='center w-70 center pa2 f4' onChange={onURLchange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;