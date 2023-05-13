import React, {useRef, useState} from 'react';
import Layout from '@/layouts';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<'success' | 'failed' | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

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

    let currentErrors = {...errors};

    if (name === 'name') {
      if (value.trim().length < 2) {
        currentErrors.name = 'Name must be at least 2 characters.';
      } else {
        delete currentErrors.name;
      }
    }

    if (name === 'email') {
      if (!validateEmail(value)) {
        currentErrors.email = 'Invalid email format.';
      } else {
        delete currentErrors.email;
      }
    }

    if (name === 'message') {
      if (!value.trim()) {
        currentErrors.message = 'Message cannot be empty.';
      } else {
        delete currentErrors.message;
      }
    }

    setErrors(currentErrors);

    if (formData.name.trim().length >= 2 && validateEmail(formData.email) && formData.message.trim()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    setIsLoading(true);
    setEmailStatus(null);

    try {
      const response = await fetch('/api/mailer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setEmailStatus('success');
      } else {
        setEmailStatus('failed');
      }
    } catch (error) {
      setEmailStatus('failed');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Layout title="Contact">
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
              placeholder="Name"
              onFocus={() => handleInputFocus('name')}
              onBlur={() => handleInputBlur('name')}
              className={`blink-caret touch-none resize-none w-full text-center outline-none py-2 px-4 bg-transparent text-[20px] sm:text-[24px] xl:text-[28px] leading-relaxed ${
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
            {errors.name && <p className="text-red-500 text-xs text-center mt-2">{errors.name}</p>}
          </div>
          <div className="mb-8">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleInputChange}
              onFocus={() => handleInputFocus('email')}
              onBlur={() => handleInputBlur('email')}
              className={`blink-caret touch-none resize-none w-full text-center outline-none py-2 px-4 bg-transparent text-[20px] sm:text-[24px] xl:text-[28px] leading-relaxed ${
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
            {errors.email && <p className="text-red-500 text-xs text-center mt-2">{errors.email}</p>}
          </div>
          <div className="mb-8">
            <textarea
              ref={textareaRef}
              id="message"
              name="message"
              value={formData.message}
              placeholder="Message"
              onChange={handleInputChange}
              onFocus={() => handleInputFocus('message')}
              onBlur={() => handleInputBlur('message')}
              className={`blink-caret touch-none resize-none w-full text-center outline-none py-2 px-4 bg-transparent text-[20px] sm:text-[24px] xl:text-[28px] leading-relaxed ${
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
            {errors.message && <p className="text-red-500 text-xs text-center mt-2">{errors.message}</p>}
          </div>
          {emailStatus ? (
            <div className="mt-4 text-center">
              {emailStatus === 'success' && (
                <p className="text-green">Thank you! Email sent successfully!</p>
              )}
              {emailStatus === 'failed' && (
                <p className="text-red-500">Sorry! Failed to send email.</p>
              )}
            </div>
          ) : (
            <button
              type="submit"
              className={`w-full p-2 bg-transparent text-white font-semibold rounded-md text-[20px] sm:text-[24px] xl:text-[28px] ${
                !isValid && 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!isValid}
            >
              {isLoading ? 'Sending...' : 'Submit'}
            </button>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default ContactPage;
