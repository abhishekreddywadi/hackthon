import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const HeroSection = () => {
  const gradientStyle = {
    background:
      "radial-gradient(circle, rgb(0,85,184,1) 0%, rgba(0,0,0,1) 55%)", // Radial gradient
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 m-10 h-[80%] md:px-20">
        <div className="flex justify-center items-center col-span-2">
          <div>
            <h1 className="text-green-400 text-xl tracking-widest">
              LEARNING WITH AI
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold my-3">
              STUDY COMPANION
            </h1>
            <p className="text-xl md:text-2xl text-[#aaabc4] my-10">
              Revolutionize the way you study with StudyPal – a cutting-edge
              web-based platform designed to make learning smarter, easier, and
              more personalized than ever before.
            </p>
            <div className="flex flex-row gap-10">
              <Link to="/mcq">
                <button className="bg-[#171a8d] text-[#5ce1ff] font-bold px-5 py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-300 ease-in-out hover:bg-[#0f0e69] hover:shadow-lg">
                  <span>TRY IT NOW</span>
                  <MdKeyboardDoubleArrowRight className="text-xl" />
                </button>
              </Link>
              <a href="https://quine.sh/repo/rajesh-adk-137-StudyPal-793889064">
                <button className="bg-[#4fe331] text-black font-bold px-5 py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-300 ease-in-out hover:bg-[#3fb427] hover:shadow-lg">
                  <span>VOTE ON QUINE</span>
                  <MdKeyboardDoubleArrowRight className="text-xl" />
                </button>
              </a>
            </div>
          </div>
        </div>
        <div
          className="col-span-3 flex justify-center items-center "
          style={gradientStyle}
        ></div>
      </div>
      <hr />
    </>
  );
};

export default HeroSection;
