import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
const TypingHeading = ({ text = "Create Your Virtual Machine", className = "" }) => {
    const textRef = useRef(null);
    useEffect(() => {
        const chars = text.split("");
        const el = textRef.current;
        el.innerHTML = "";

        chars.forEach((char, index) => {
            const span = document.createElement("span");
            span.textContent = char;
            span.style.opacity = 0;
            el.appendChild(span);
        });

        gsap.to(el.children, {
            opacity: 1,
            duration: 0.20,
            stagger: 0.10,
            ease: "power1.inOut",
        });
    }, [text]);

    return (
        <h1
            ref={textRef}
            className={` mt-5  text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-white via-blue-800 to-blue-950 text-transparent bg-clip-text ${className}`}

        ></h1>
    );
};
export default TypingHeading;