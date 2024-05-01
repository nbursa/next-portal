import Layout from '../../layouts';
import ChatForm from '@/components/chat-form';
import React, {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface ConversationItem {
  user?: string;
  ai: string;
}

const HomePage = () => {
  const [conversation, setConversation] = useState<ConversationItem[]>([{
    user: "",
    ai: "Hey there, 🙋‍ welcome onboard! I'm Nenad Bursać, a Frontend Developer 🎨 crafting UIs 💻 from Belgrade, Serbia 🇷🇸. Feel free to chat with my AI assistant 🤖 below for some tech trivia 🧠, jokes 😄, or to learn more about what I do 👨‍💻!"
  }]);
  const containerRef = useRef<HTMLDivElement>(null);
  const typingTextRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const [autoScroll, setAutoScroll] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const buffer = 10;
      setAutoScroll(container.scrollTop + container.clientHeight + buffer >= container.scrollHeight);
    };

    container.addEventListener("scroll", handleScroll, {passive: true});

    if (autoScroll) {
      container.scrollTop = container.scrollHeight;
    }

    return () => container.removeEventListener("scroll", handleScroll);
  }, [autoScroll, conversation]);

  useEffect(() => {
    const text = conversation[conversation.length - 1]?.ai;
    if (currentIndex < text?.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
        if (autoScroll && containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 40);
      return () => clearTimeout(timeoutId);
    }
  }, [conversation, currentIndex, autoScroll]);

  const renderTypingText = (text: string, index: number) => {
    if (index >= text.length) return <div ref={typingTextRef}>{text}</div>;

    const displayText = text.slice(0, index + 1);

    return (
      <div ref={typingTextRef} className="text-white font-bold">
        {displayText}
      </div>
    );
  };

  return (
    <Layout title="Homepage">
      <div
        ref={containerRef}
        className="pt-[20vh] min-h-full max-h-[80vh] sm:max-h-[75vh] w-full bg-transparent flex-0 sm:px-[20%] mx-auto overflow-hidden overflow-y-auto scroll-smooth mb-8"
      >
        <div>
          {conversation.map(({user = "", ai}, index) => (
            <div key={index}>
              <div className="p-4 italic mb-2 text-center text-[20px] xl:text-[24px]">{user}</div>
              <div
                ref={typingTextRef}
                className={`text-[20px] sm:text-[24px] xl:text-[28px] px-4 sm:px-0 text-white font-bold z-10 mt-0 text-center mb-4 leading-[1.5] ${
                  index === 0 ? "text-center" : "text-left"
                }`}
              >
                {renderTypingText(ai, index === conversation.length - 1 ? currentIndex : ai.length)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatForm
        setConversation={setConversation}
        conversation={conversation}
        classNames="w-full sm:max-w-[75vw] md:max-w-[60vw] lg:max-w-3xl h-full mx-auto px-4 sm:px-12 mb-12"
      />
    </Layout>
  );

}

export default HomePage;
