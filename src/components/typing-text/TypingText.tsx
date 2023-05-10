import React, {useEffect, useRef, useState} from "react";

interface TypingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string,
  delay?: number,
  classNames?: string,
}

const TypingText: React.FC<TypingTextProps> = ({text, delay = 100, classNames}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [text, delay, currentIndex]);


  return <div ref={containerRef} className={`${classNames}`}>{displayText}</div>;
};

export default TypingText;