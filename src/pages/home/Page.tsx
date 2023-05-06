import PageContainer from "@/components/container/PageContainer";
import {useEffect, useState} from "react";

const Typing = ({text, duration = 1000}: { text: string; duration?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 250;

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText((prevText) => prevText + text.charAt(currentIndex));
        setCurrentIndex(currentIndex + 1);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [text, delay, currentIndex]);

  return <div className="text-[12vw] text-white font-extrabold z-10 mt-[15vh]">{displayText}</div>;
};

const HomePage = () => {
  return (
      <PageContainer title="Homepage" classNames="flex flex-col items-center justify-start">
        <Typing text="HI" duration={1000}/>
      </PageContainer>
  )
}

export default HomePage;
