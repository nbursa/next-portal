import React, { useRef, useState } from 'react';
import Layout from '@/layouts';
import Image from 'next/image';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateForm = (formData: FormData) => {
  const errors: { name?: string; email?: string; message?: string } = {};

  if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email format.';
  }

  if (!formData.message.trim()) {
    errors.message = 'Message cannot be empty.';
  }

  return errors;
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
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    const newErrors = validateForm({ ...formData, [name]: value });
    setErrors(newErrors);

    const isValidForm = Object.keys(newErrors).length === 0;
    setIsValid(isValidForm);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsValid(false);
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
        setFormData({
          name: '',
          email: '',
          message: '',
        })
      } else {
        setEmailStatus('failed');
      }
    } catch (error) {
      setEmailStatus('failed');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setEmailStatus(null);
      }, 4000);
    }
  };


  return (
    <Layout title="Contact">
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6">

          <div className="flex items-center justify-between mb-8">
            <div className="">
              <h2 className="text-2xl font-bold">Contact</h2>
              <p className="text-xs text-white text-center">Lets talk!</p>
            </div>
            <div className="flex items-center gap-8">
              <a href="https://www.github.com/nbursa" target="_blank" className=""><Image src='/github-mark-white.svg' alt='Linkedin logo' width={34} height={34} /></a>
              <a href="https://www.linkedin.com/in/nenadbursac" target="_blank" className=""><Image src='/linkedin.svg' alt='Linkedin logo' width={40} height={40} /></a>
            </div>
          </div>
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
          <button
            type="submit"
            className={`w-full p-2 bg-transparent text-white font-semibold rounded-md text-[20px] sm:text-[24px] xl:text-[28px] ${
              !isValid && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!isValid}
          >
            {isLoading ? 'Sending...' : 'Submit'}
          </button>
          {emailStatus && (
            <div className="mt-4 text-center text-sm">
              {emailStatus === 'success' && (
                <p className="text-green">Done! Email sent successfully!</p>
              )}
              {emailStatus === 'failed' && (
                <p className="text-red-500">Sorry! Failed to send email.</p>
              )}
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default ContactPage;
