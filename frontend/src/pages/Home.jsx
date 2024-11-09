import AiPoweredPath from "../components/AiPoweredPath";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import ChatCard from "../components/ChatCard";
// import LeaderBoard from "../components/LeaderBoard";
import LeaderBoardCard from "../components/LeaderBoardCard";
function Home() {
  return (
    <>
      <div className="bg-black text-white h-screen">
        <div>
          <Navbar />
        </div>
        <HeroSection />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-10 bg-black text-white">
        <div className="flex-1 md:flex-1/3 lg:flex-1/3 xl:flex-1/3">
          <AiPoweredPath />
        </div>
        <div className="flex-1 md:flex-1/3 lg:flex-1/3 xl:flex-1/3">
          <ChatCard />
        </div>
        <div className="flex-1 md:flex-1/3 lg:flex-1/3 xl:flex-1/3">
          <LeaderBoardCard />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
