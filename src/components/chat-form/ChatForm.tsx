import React, {useEffect, useRef, useState} from "react";
import {Configuration, OpenAIApi} from 'openai';
import apiConfig from '@/utils/gpt-config';
import {ChatFormProps} from "@/types";
import Image from "next/image";

const configuration = new Configuration({
    apiKey: apiConfig.apiKey,
  });
const openai = new OpenAIApi(configuration);

const ChatForm: React.FC<ChatFormProps> = ({classNames, conversation, setConversation}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPrompt = async () => {
    const res = await fetch('/api/loadPrompt');
    const data = await res.json();
    console.log(data);
    return data.prompt;
  }

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

  const handleInputChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
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

  const formatCodeInResponse = (responseText: string) => {
    const codeRegex = /```([\s\S]*?)```/g;

    return responseText.replace(
      codeRegex,
      (match, code) => `<pre class="response-code">${code}</pre>`
    );
  };

  const fetchAiResponse = async (input: string): Promise<any> => {
    setLoading(true);

    try {
      const promptString = await fetchPrompt();

      return await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {role: "system", content: promptString},
          {role: "user", content: input},
        ],
        max_tokens: 500,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
    } catch (error) {
      console.error('Fetch API error: ', error);
      return `Fetch API error: ${error}`;
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    if (!inputValue.trim()) return;

    try {
      const response: any = await fetchAiResponse(inputValue);
      const string = response?.data?.choices?.[0]?.message?.content.trim() ?? "";
      const formattedAiResponse = formatCodeInResponse(string);

      setConversation((prevConversation) => [...prevConversation, {user: inputValue, ai: formattedAiResponse}]);
      setInputValue('');
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
          <div className="flex w-full">
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Type here..."
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              value={inputValue}
              className={`ta touch-none resize-none w-full text-center outline-none py-2 px-4 bg-transparent border border-gray rounded-[26px] text-[20px] xl:text-[22px] leading-relaxed shadow-white-drop ${!!inputValue || isFocused ? 'placeholder:text-transparent' : 'placeholder:text-gray'} focus:shadow-white-inset focus:outline-none`}
            />
          </div>
          {!!inputValue && <button className="rounded-md mt-8 px-4 text-[20px] xl:text-[22px]"
                                   onClick={handleClick}>Submit</button>}
        </>
      )}
    </form>
  );
};

export default ChatForm;
