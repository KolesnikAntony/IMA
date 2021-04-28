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

export const useDisableBodyScroll = (stopScroll: boolean) => {
    useEffect(() => {
        if (stopScroll) {
            console.log('to hide')
            document.body.style.overflow = 'hidden';
        } else {
            console.log('to unset')
            document.body.style.overflow = 'unset';
        }
    }, [stopScroll]);
};