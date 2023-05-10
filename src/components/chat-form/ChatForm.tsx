import React, {useEffect, useRef, useState} from "react";
import {Configuration, OpenAIApi} from 'openai';
import apiConfig from '@/utils/gpt-config';
import {ChatFormProps} from "@/types";
import {ConversationItem} from "@/pages/home/Page";

const ChatForm: React.FC<ChatFormProps> = ({classNames, conversation, setConversation}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestCV, setRequestCV] = useState(false);
  const [email, setEmail] = useState("");

  const configuration = new Configuration({
    apiKey: apiConfig.apiKey,
  });
  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      handleInputFocus();
    }
  }, [conversation]);

  const handleInputFocus = () => {
    setFocus(true);
  };

  const handleInputBlur = () => {
    setFocus(false);
  };

  const sendCVToEmail = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/mailer', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: "bot", email, message: conversation}),
      });
      const data = await response.json();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleInputChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    if (requestCV && /\S+@\S+\.\S+/.test(inputValue)) {
      setRequestCV(false);
      setEmail(inputValue.trim());
      await sendCVToEmail(email);
      setInputValue("");
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const isFormEvent = (event: unknown): event is React.FormEvent<HTMLFormElement> => {
      return (event as React.FormEvent<HTMLFormElement>).currentTarget !== undefined;
    };
    const formEvent = document.createEvent("Event");

    if (isFormEvent(formEvent)) {
      formEvent.initEvent("submit", true, true);
      handleSubmit(formEvent);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.length > 0) {
        handleSubmit(event);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    if (!inputValue.trim()) return;

    setLoading(true);

    const prompt = "AI please impersonate person with name Nenad and lastname Bursać, an Senior Frontend Developer with more than 8 years of experience in web development, you have worked with various companies including Ananas E-commerce, Enjoying, Holycode, Realday, Coreware Group, TMS and as a self-employed developer. Throughout your career, you have gained expertise in using JavaScript, creative coding, and AI. Currently, you are working at Sally Engineering as a Senior Frontend Developer. In your previous role at Holycode, you was responsible for developing and maintaining complex web applications, while at Realday, you collaborated with a team of developers to create responsive and user-friendly interfaces. You enjoy working with cutting-edge technologies and solving complex problems to deliver high-quality products. Your experience in web development has helped you develop a keen eye for detail and a passion for creating intuitive and visually appealing user interfaces. You are committed to staying up-to-date with the latest industry trends and exploring new technologies to improve your skills and enhance your contributions to the field. While staying true to Nenad's character, personality, and mannerisms, maintain the essence of Nenad's original character, maintain humorous but professional tone.";

    if (inputValue.toLowerCase().includes("cv")) {
      setInputValue("");
      const emailPrompt = "Please enter your email address:";
      setConversation((prevConversation: ConversationItem[]) => [...prevConversation, {
        user: inputValue,
        ai: emailPrompt
      }]);
      setRequestCV(true);
      setLoading(false);
    }

    const formatCodeInResponse = (responseText: string) => {
      const codeRegex = /```([\s\S]*?)```/g;

      return responseText.replace(
        codeRegex,
        (match, code) => `<pre class="response-code">${code}</pre>`
      );
    };

    try {
      let response;
      if (requestCV) {
        const cvSent = await sendCVToEmail(inputValue);
        const cvSentResponse = cvSent ? `I have sent my CV to ${inputValue}.` : `I was not able to send my CV to ${inputValue}.`;
        setConversation((prevConversation) => [...prevConversation, {user: inputValue, ai: cvSentResponse}]);
        setRequestCV(false);
        setInputValue('');
        setLoading(false);
      } else {
        response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            {role: "system", content: prompt},
            {role: "user", content: inputValue},
          ],
          max_tokens: 500,
          temperature: 1,
          top_p: 1,
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        });

        const aiResponse = response?.data?.choices?.[0]?.message?.content?.trim() ?? "";
        const formattedAiResponse = formatCodeInResponse(aiResponse);

        setConversation((prevConversation) => [...prevConversation, {user: inputValue, ai: formattedAiResponse}]);
        setInputValue('');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <form className={`relative flex flex-col items-center justify-center ${classNames}`}>
      {loading ? (
        <div
          className="w-full h-full flex items-center justify-center">
          thinking...
        </div>
      ) : (
        <>
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Type here..."
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            value={inputValue}
            className={`ta blink-caret touch-none resize-none w-full text-center outline-none py-2 px-4 bg-transparent text-[20px] sm:text-[24px] xl:text-[1vw] leading-relaxed ${!!inputValue || isFocused ? 'placeholder:text-transparent' : 'placeholder:text-gray'}`}
          />
          <div
            className={`h-[1px] bg-white mx-auto ease-in duration-300 ${isFocused ? "w-[25px] shadow-[0_15px_20px_5px_rgba(255,255,255,0.15)] opacity-100" : "w-[250px] shadow-[0_15px_15px_5px_rgba(255,255,255,0.05)] opacity-85"}`}></div>
          {!!inputValue && <button className="rounded-md mt-8 px-4 text-[20px] sm:text-[24px] xl:text-[1vw]"
                                   onClick={handleClick}>Submit</button>}
        </>
      )}
    </form>
  );
};

export default ChatForm;