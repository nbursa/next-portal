import Layout from "@/layouts";
import TypingText from "@/components/typing-text";
import ChatForm from "@/components/chat-form";

const HomePage = () => {
  return (
      <Layout title="Homepage" classNames="flex flex-col items-center justify-start">
        <TypingText classNames="text-[12vw] sm:text-[4vw] text-white font-extrabold z-10 mt-[15vh] text-center mb-8 leading-none w-full max-w-screen-sm" text="HI! What would you like to do?"/>
        <ChatForm classNames="w-full max-w-[500px] xs:px-12 mt-12"/>
      </Layout>
  )
}

export default HomePage;
