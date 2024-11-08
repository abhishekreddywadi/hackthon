import { Link } from "react-router-dom";

import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex flex-col gap-10 justify-between items-center bg-gray-950 text-gray-300 py-6 pt-10 text-sm">
      <div className=" mx-auto flex  justify-evenly items-center w-full ">
        <div className="flex flex-col gap-1 justify-center items-start">
          <Link to="/">
            <div className="text-2xl md:text-4xl font-bold">
              <span>Study</span>
              <span className="text-blue-400">Pal</span>{" "}
            </div>
          </Link>
          <div className="text-xl text-gray-600">
            Your Personalized Learning Companion.
          </div>
          <div className="mt-3 flex text-xl gap-2 text-gray-500 ">
            <FaFacebook className="hover:text-white" />
            <FaInstagram className="hover:text-white" />
            <FaTiktok className="hover:text-white" />
            <FaXTwitter className="hover:text-white" />
            <FaLinkedin className="hover:text-white" />
          </div>
        </div>
        <div className="flex justify-end items-start gap-x-14 md:gap-x-32 w-2/5">
          <div className="flex flex-col gap-3">
            <a href="https://github.com/rajesh-adk-137">
              <div className="hover:text-white hover:cursor-pointer">
                About Us
              </div>
            </a>
            <div className="hover:text-white hover:cursor-pointer">
              Features
            </div>
            <a href="https://github.com/rajesh-adk-137">
              <div className="hover:text-white hover:cursor-pointer">
                Feedback
              </div>
            </a>
            <a href="https://github.com/rajesh-adk-137">
              <div className="hover:text-white hover:cursor-pointer">
                Contact Us
              </div>
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="https://quine.sh/">
              <div className="hover:text-white hover:cursor-pointer">Quine</div>
            </a>
            <a href="https://www.copilotkit.ai/">
              <div className="hover:text-white hover:cursor-pointer">
                CopilotKit
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="text-gray-600 text-lg">
        &#169; StudyPal 2024. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
