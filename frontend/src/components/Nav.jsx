import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  return (
    <div className="navbar flex justify-center items-center">
      <header className="w-[80%] h-16 flex justify-between text-white mt-2 mx-5">
        <Link
          to="/"
          className={location.pathname === "/" ? "text-blue-400" : ""}
        >
          <div className="text-md font-[700] tracking-wider">
            <span>Home</span>
          </div>
        </Link>
      </header>
      {userId ? (
        <div className="flex justify-center gap-4">
          <Link to="/Signin">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </button>
            </Link>
            <Link to="/signin">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
