import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export default function useProgress() {

    const pBarRef = useRef<HTMLDivElement>(null);

    let currentRatio = useRef(0).current;

    const ProgressBar = useCallback(() => {
        return <div ref={pBarRef} style={{
            height: '5px',
            backgroundColor: "red",
            width: '100vw',
            transform: 'scaleX(0)',
            transformOrigin: 'left'
        }}>

        </div>
    }, []);

    const animateBar = useCallback((keyframes) => {
        pBarRef?.current?.animate(keyframes, {
            duration: 100,
            iterations: 1,
            fill: 'forwards'
        });
    }, []);

    const customFetch = useMemo(() => {
        return {
            post: (address: string, data: any) => {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', address);
                    currentRatio = 0;
                    xhr.upload.onprogress = (e) => {
                        const progressRatio = e.loaded / e.total;
                        animateBar([{
                            transform: `scaleX(${currentRatio})`
                        }, {
                            transform: `scaleX(${progressRatio})`
                        }]);
                        currentRatio = progressRatio;
                    }
                    // xhr.upload.onloadend = () => {

                    // }
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                            resolve(xhr.response);
                        } else {
                            reject(xhr.response);
                        }
                    }
                    xhr.send(JSON.stringify(data));
                })
            }
        }
    }, []);
    return { ProgressBar, customFetch };
}