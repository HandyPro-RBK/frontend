import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-blue-900 pt-4"
      style={{
        backgroundImage: "url('src/assets/images/background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />

      <div className="flex flex-col lg:flex-row justify-between items-center p-12">
        <div className="lg:w-1/2 space-y-6 text-white">
          <h1 className="text-xl font-medium">
            Quality services at your doorstep.
          </h1>
          <h2 className="text-5xl font-extrabold mt-4 leading-tight">
            Explore Top-Rated Services Available in Your Local Area!
          </h2>
          <p className="text-lg mt-4 max-w-xl">
            Easily find the best services near you, with trusted professionals
            at your fingertips.
          </p>

          <div className="flex justify-start mt-6">
            <div className="flex space-x-4 bg-white p-4 rounded-lg border border-gray-300">
              <input
                type="text"
                placeholder="What service are you looking for?"
                className="p-2 border border-gray-300 rounded-md outline-none"
              />
              <input
                type="text"
                placeholder="City"
                className="p-2 border border-gray-300 rounded-md outline-none"
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-8 flex justify-center">
          <img
            src="src/assets/images/image1.png"
            alt="Professional service"
            className="rounded-lg w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
