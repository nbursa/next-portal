import React, {useRef, useState} from 'react';
import Layout from '@/layouts';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [focusState, setFocusState] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputFocus = (field: keyof typeof focusState) => {
    setFocusState((prevState) => ({...prevState, [field]: true}));
  };

  const handleInputBlur = (field: keyof typeof focusState) => {
    setFocusState((prevState) => ({...prevState, [field]: false}));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      if (textareaRef.current.scrollHeight < 200) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }

    const {name, value} = e.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));

    if (formData.name.trim() && formData.email.trim() && formData.message.trim()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add code to handle form submission here, such as sending the form data to an API.
    console.log(formData);
  };

  return (
    <Layout title="Contact Page" classNames="">
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Contact</h2>
          <div className="mb-8">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              onFocus={() => handleInputFocus('name')}
              onBlur={() => handleInputBlur('name')}
              className={`blink-caret touch-none resize-none w-full text-center outline-none py-2 px-4 bg-transparent text-[20px] sm:text-[24px] xl:text-[1vw] leading-relaxed ${
                !!formData.name || focusState.name ? 'placeholder:text-transparent' : 'placeholder:text-gray placeholder:text-sm'
              }`}
              required
            />
            <div
              className={`h-[1px] bg-white mx-auto ease-in duration-300 ${
                focusState.name
                  ? 'w-[25px] shadow-[0_15px_20px_5px_rgba(255,255,255,0.15)] opacity-100'
                  : 'w-full shadow-[0_15px_15px_5px_rgba(255,255,255,0.05)] opacity-85'
              }`}
            ></div>
          </div>
          <div className="mb-8">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Your Email"
              onChange={handleInputChange}
              onFocus={() => handleInputFocus('email')}
              onBlur={() => handleInputBlur('email')}
              className={`blink-caret touch-none resize-none w-full text-center outline-none py-2 px-4 bg-transparent text-[20px] sm:text-[24px] xl:text-[1vw] leading-relaxed ${
                !!formData.email || focusState.email ? 'placeholder:text-transparent' : 'placeholder:text-gray placeholder:text-sm'
              }`}
              required
            />
            <div
              className={`h-[1px] bg-white mx-auto ease-in duration-300 ${
                focusState.email
                  ? 'w-[25px] shadow-[0_15px_20px_5px_rgba(255,255,255,0.15)] opacity-100'
                  : 'w-full shadow-[0_15px_15px_5px_rgba(255,255,255,0.05)] opacity-85'
              }`}
            ></div>
          </div>
          <div className="mb-8">
            <textarea
              ref={textareaRef}
              id="message"
              name="message"
              value={formData.message}
              placeholder="Your Message"
              onChange={handleInputChange}
              onFocus={() => handleInputFocus('message')}
              onBlur={() => handleInputBlur('message')}
              className={`blink-caret touch-none resize-none w-full text-center outline-none py-2 px-4 bg-transparent text-[20px] sm:text-[24px] xl:text-[1vw] leading-relaxed ${
                !!formData.message || focusState.message ? 'placeholder:text-transparent' : 'placeholder:text-gray placeholder:text-sm'
              }`}
              rows={1}
              required
            />
            <div
              className={`h-[1px] bg-white mx-auto ease-in duration-300 ${
                focusState.message
                  ? 'w-[25px] shadow-[0_15px_20px_5px_rgba(255,255,255,0.15)] opacity-100'
                  : 'w-full shadow-[0_15px_15px_5px_rgba(255,255,255,0.05)] opacity-85'
              }`}
            ></div>
          </div>
          <button
            type="submit"
            className={`w-full p-2 bg-transparent text-white font-semibold rounded-md ${
              !isValid && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isValid}
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ContactPage;
