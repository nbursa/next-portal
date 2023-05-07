import Layout from "@/layouts";
import TypingText from "@/components/typing-text";

const HomePage = () => {
  return (
      <Layout title="Homepage" classNames="flex flex-col items-center justify-start">
        <TypingText classNames="text-[12vw] text-white font-extrabold z-10 mt-[15vh] text-center mb-8 leading-none" text="HI! What would you like to do?"/>
        <form className="relative flex flex-col items-center justify-center w-full max-w-screen-sm">
          <input type="text" placeholder="Type your request here..." className="w-full placeholder:text-blue outline-0 py-2 px-4 bg-transparent border-b-2 text-lg leading-none"/>
          <button className="rounded-md absolute right-1 top-1 bottom-1 px-4">Submit</button>
        </form>
      </Layout>
  )
}

export default HomePage;
