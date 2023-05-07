import React, {useEffect, useRef, useState} from "react";

interface ChatFormProps {
  classNames: string;
}

const ChatForm: React.FC<ChatFormProps> = ({classNames}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    console.log("Form submitted", event);
  };

  return (
    <form className={`relative flex flex-col items-center justify-center ${classNames}`}>
      <textarea
        ref={textareaRef}
        placeholder="Type here..."
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        value={inputValue}
        className={`touch-none resize-none w-full text-center outline-0 py-2 px-4 bg-transparent text-lg leading-none leading-relaxed ${isFocused ? 'placeholder:text-transparent' : 'placeholder:text-gray'}`}
      />
      {!!inputValue && <button className="rounded-md mt-8 px-4" onClick={handleClick}>Submit</button>}
    </form>
  );
};

export default ChatForm;