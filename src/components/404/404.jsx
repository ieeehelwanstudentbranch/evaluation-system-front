import React from 'react';
import Image from '../../assets/images/404.jpg';
const notFound = () => {
    return(
        <div>
            <img src={Image} alt="Page Not Found" />
        </div>
    )
}
export default notFound;