import Link from "next/link";
import PageContainer from "@/components/container/PageContainer";

const HomePage = () => {
  return (
      <PageContainer title="Homepage" classNames="flex flex-col items-center justify-center">
        <h1 className="-mt-40">Welcome to ML Studio</h1>
        <Link href="/studio">
          Go to ML Studio
        </Link>
      </PageContainer>
  )
}

export default HomePage;
