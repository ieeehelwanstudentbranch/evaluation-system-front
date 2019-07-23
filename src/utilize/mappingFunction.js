import React from 'react';
const mappingFunction = (array,Component) => {
    return(
        array.map((item,index)=>(
            <Component key={index} {...item} />
        ))
    )
}
export default mappingFunction