import React, {useEffect, useState} from "react";

interface TypingTextProps {
  text: string;
  delay?: number;
  classNames?: string;
}
const TypingText: React.FC<TypingTextProps> = ({text, delay = 100, classNames}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText((prevText) => prevText + text.charAt(currentIndex));
        setCurrentIndex(currentIndex + 1);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [text, delay, currentIndex]);

  return <div className={`${classNames}`}>{displayText}</div>;
};

export default TypingText;