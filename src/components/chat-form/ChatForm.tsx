import React, {useEffect, useRef, useState} from "react";
import {Configuration, OpenAIApi} from 'openai';
import apiConfig from '@/utils/gpt-config';
import {ChatFormProps} from "@/types";
import Image from "next/image";

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
        body: JSON.stringify({name: "mailbot", email, message: conversation}),
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
      await sendCVToEmail(process.env.EMAIL || '');
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

  const prompt = process.env.PROMPT;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    if (!inputValue.trim()) return;

    setLoading(true);

    const formatCodeInResponse = (responseText: string) => {
      const codeRegex = /```([\s\S]*?)```/g;

      return responseText.replace(
        codeRegex,
        (match, code) => `<pre class="response-code">${code}</pre>`
      );
    };

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {role: "system", content: prompt || ""},
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
          <Image className="mt-4" src="grid.svg" alt="loader svg" width={30} height={30}/>
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
            className={`ta blink-caret touch-none resize-none w-full text-center outline-none py-2 px-4 bg-transparent text-[20px] xl:text-[22px] leading-relaxed ${!!inputValue || isFocused ? 'placeholder:text-transparent' : 'placeholder:text-gray'}`}
          />
          <div
            className={`h-[1px] bg-white mx-auto ease-in duration-300 ${isFocused ? "w-[25px] shadow-[0_15px_20px_5px_rgba(255,255,255,0.15)] opacity-100" : "w-[250px] shadow-[0_15px_15px_5px_rgba(255,255,255,0.05)] opacity-85"}`}></div>
          {!!inputValue && <button className="rounded-md mt-8 px-4 text-[20px] xl:text-[22px]"
                                   onClick={handleClick}>Submit</button>}
        </>
      )}
    </form>
  );
};

export default ChatForm;