import React, {useEffect, useState} from 'react';

export const useViewSize = () => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
    });

    useEffect(() => {
        function handleResize(){
            setDimensions({
                width: window.innerWidth
            });
        }
        window.addEventListener('resize', handleResize)
    }, []);

    return dimensions;
};