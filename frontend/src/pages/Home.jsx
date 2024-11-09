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
      <div className=" flex justify-evenly items-center gap-10 bg-black text-white">
        <AiPoweredPath />
        <ChatCard />
        <LeaderBoardCard />
      </div>
      <Footer />
    </>
  );
}

export default Home;
