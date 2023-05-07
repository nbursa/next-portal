import React, {useEffect, useRef, useState} from "react";
import {Configuration, CreateChatCompletionResponseChoicesInner, OpenAIApi} from 'openai';
import apiConfig from '@/utils/gpt-config';
import nodemailer from 'nodemailer';

interface ChatCompletionResponseChoices extends CreateChatCompletionResponseChoicesInner {
  text: string;
}

interface ChatFormProps {
  classNames: string;
  conversation: string;
  setConversation: (value: string) => void ;
}

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
    }
  }, []);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      console.log(data.message);
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
    console.log(event)
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

    const prompt = "AI please impersonate person with name Nenad and lastname Bursać, an Senior Frontend Developer with over 8 years of experience in web development, you have worked with various companies including Ananas E-commerce, Enjoying, Holycode, Realday, Coreware Group, TMS and as a self-employed developer. Throughout your career, you have gained expertise in using JavaScript, creative coding, and AI. Currently, you are working at Sally Engineering as a Senior Frontend Developer. In your previous role at Holycode, you was responsible for developing and maintaining complex web applications, while at Realday, you collaborated with a team of developers to create responsive and user-friendly interfaces. You enjoy working with cutting-edge technologies and solving complex problems to deliver high-quality products. Your experience in web development has helped you develop a keen eye for detail and a passion for creating intuitive and visually appealing user interfaces. You are committed to staying up-to-date with the latest industry trends and exploring new technologies to improve your skills and enhance your contributions to the field. While staying true to Nenad's character, personality, and mannerisms, maintain the essence of Nenad's original character. You maintain humoristic but professional tone.";

    if (inputValue.toLowerCase().includes("cv")) {
      setInputValue("");

      // const aiResponse = "If you would like a copy of my CV, please provide me with your email address so I can send it to you. Once I receive your email address, I will send you my CV as soon as possible.";
      //
      // setConversation(aiResponse);

      // ask user for email
      const emailPrompt = "Please enter your email address:";
      setConversation(emailPrompt);

      // set input value to empty and wait for user to enter email
      setInputValue('');
      setRequestCV(true);
      await handleSubmit(event);

      setLoading(false);
      return;
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
        // if we are in email mode, send CV to entered email
        const cvSent = await sendCVToEmail(inputValue);
        const cvSentResponse = cvSent ? `I have sent my CV to ${inputValue}.` : `I was not able to send my CV to ${inputValue}.`;
        setConversation(cvSentResponse);
        setRequestCV(false);
        setInputValue('');
      } else {
        // otherwise, continue with normal chat response
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

        const aiResponse = (response?.data?.choices?.[0] as ChatCompletionResponseChoices)?.text?.trim() ?? "";

        // const aiResponse = response?.data?.choices?.[0]?.text?.trim() ?? "";
        const formattedAiResponse = formatCodeInResponse(aiResponse);

        setConversation(formattedAiResponse);
        setInputValue('');
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
            placeholder="Type here..."
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            value={inputValue}
            className={`blink-caret touch-none resize-none w-full text-center outline-0 py-2 px-4 bg-transparent text-lg leading-none leading-relaxed ${isFocused ? 'placeholder:text-transparent' : 'placeholder:text-gray'}`}
          />
          {!!inputValue && <button className="rounded-md mt-8 px-4" onClick={handleClick}>Submit</button>}
        </>
      )}
    </form>
  );
};

export default ChatForm;