"use client";
import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  delay: number;
}

const TypeWriter: React.FC<TypewriterProps> = ({
  text,
  delay,
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let charIndex = 0;

    const type = () => {
      if (charIndex < text.length) {
        setDisplayText(text.slice(0, charIndex + 1));
        charIndex++;
        setTimeout(type, delay);
      }
    };

    type();
  }, [text, delay]);

  return <span>{displayText}</span>;
};

export default TypeWriter;
