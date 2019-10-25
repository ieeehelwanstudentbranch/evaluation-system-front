import React from 'react';
import Image from '../../assets/images/404.jpg';
const notFound = () => {
    return(
        <div>
            <img src={Image} alt="Page Not Found" style={{width: '100%'}}/>
        </div>
    )
}
export default notFound;