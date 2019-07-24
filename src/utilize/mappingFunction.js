import React from 'react';
const mappingFunction = (array,Component) => {
    if (array){
        if(array.length>0){
            return(
                array.map((item,index)=>(
                    <Component key={index} {...item} />
                ))
            )
        }
    }
}
export default mappingFunction