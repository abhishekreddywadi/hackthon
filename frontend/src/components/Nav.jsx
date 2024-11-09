import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const handleSignOut = () => {
    localStorage.removeItem("userId");
  };
  return (
    <div className="navbar flex justify-center items-center">
      <header className="w-[80%] h-16 flex justify-between text-white mt-2 mx-5">
        <Link
          to="/"
          className={
            location.pathname === "/" ? "border-b-2 border-blue-500" : ""
          }
        >
          <div className="text-md font-[700] tracking-wider">
            <span className="text-blue-400">Home</span>
          </div>
        </Link>
        {userId ? (
          <>
            <Link
              to="/profile"
              className={
                location.pathname === "/profile"
                  ? "border-b-2 border-blue-500"
                  : ""
              }
            >
              profile
            </Link>
            <Link to="/signin">
              <button
                onClick={handleSignOut}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Sign in
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Sign up
              </button>
            </Link>
          </>
        )}
      </header>
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
    </div>
  );
};

export default Navbar;
