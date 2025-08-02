import React from 'react'
import { useEffect, useRef } from "react";
import gsap from "gsap";
const AnimatedHaeding = () => {
  const textRef = useRef();
  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power4.out",
      }
    );
  }, []);
  return (
     <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1
        ref={textRef}
        className="text-5xl font-bold text-center text-blue-600 tracking-wide"
      >
        Create Your VM
      </h1>
    </div>
  )
}

export default AnimatedHaeding