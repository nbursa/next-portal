import React, {MouseEventHandler, useState} from "react";

const ChatForm: React.FC = () => {
  const [isFocused, setFocus] = useState(false);

  const handleInputFocus = () => {
    setFocus(true);
  };

  const handleInputBlur = () => {
    setFocus(false);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log("Form submitted", event);
    if (event instanceof KeyboardEvent && event.key === "Enter") {
      console.log("Enter key pressed");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form className="relative flex flex-col items-center justify-center w-full max-w-[500px] xs:px-12 mt-12">
      <input
        type="text"
        placeholder="Type..."
        className={`w-full text-center outline-0 py-2 px-4 bg-transparent border-b-2 text-lg leading-none ${isFocused ? 'placeholder:text-transparent' : 'placeholder:text-gray'}`}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
      />
      <button className="rounded-md mt-8 px-4" onClick={handleClick}>Submit</button>
    </form>
  );
};

export default ChatForm;