import Layout from "@/layouts";
import TypingText from "@/components/typing-text";

const HomePage = () => {
  return (
      <Layout title="Homepage" classNames="flex flex-col items-center justify-start">
        <TypingText classNames="text-[12vw] sm:text-[8vw] text-white font-extrabold z-10 mt-[15vh] text-center mb-8 leading-none w-full max-w-screen-sm" text="HI! What would you like to do?"/>
        <form className="relative flex flex-col items-center justify-center w-full max-w-[500px] xs:px-12 mt-12">
          <input type="text" placeholder="Type..." className="w-full text-center placeholder:text-gray outline-0 py-2 px-4 bg-transparent border-b-2 text-lg leading-none"/>
          <button className="rounded-md mt-8 px-4">Submit</button>
        </form>
      </Layout>
  )
}

export default HomePage;
