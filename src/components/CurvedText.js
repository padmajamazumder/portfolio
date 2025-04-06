import React from 'react';
import '../styles/CurvedText.css';

function CurvedText() {
    return (
        <svg className="curved-text-svg" viewBox="0 0 500 200">
            <path
                id="curve"
                d="M10,100 Q125,30 250,100 T490,100"
                fill="transparent"
            />
            <text>
                <textPath xlinkHref="#curve" className="curved-text">
                    ✨ you too add your thoughts? 🐱 click here to share! 😀 ✳️
                </textPath>
            </text>
        </svg>
    );
}

export default CurvedText;
