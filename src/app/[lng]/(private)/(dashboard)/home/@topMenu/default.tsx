"use client";
import Image from "next/image";
import { FaQuestion, FaCalendar, FaSearch, FaWalking } from "react-icons/fa";
import StepComponent from "./StepComponent";

const Default = () => {
  return (
    <>
      <div className="flex gap-4 ml-4">
        <div className="shadow-xl  h-10 self-center rounded-full pr-4 flex flex-none  bg-white text-neutral-500 ">
          <div className="ml-4   self-center">
            <Image
              className="bg-transparent  h-10"
              src={"/images/logo.jpg"}
              alt={"Coffee"}
              width={64}
              height={32}
            />
          </div>
        </div>
        <div className=" shadow-xl bg-blue-100 h-10 self-center rounded-full px-4 flex flex-none  bg-white text-neutral-500 ">
          <div className="self-center uppercase mx-auto">
            <h2 className="text-xl italic my-4">Book </h2>
          </div>
        </div>
        <div className="shadow-xl bg-pink-100 h-10 self-center rounded-full px-4 flex flex-none  bg-white text-neutral-500 ">
          <div className="self-center uppercase mx-auto">
            <h2 className="text-xl italic my-4"> Meet</h2>
          </div>
        </div>
      </div>
      <div className="flex-auto mx-auto">
        <div className=" h-full  flex mx-auto self-center">
          <div className="hidden md:block">
            <StepComponent />
          </div>

          <div className="self-center mx-auto flex-auto"></div>
          <div className="self-center   flex mx-8 p-4 gap-4">
            {/* <div className="h-12 w-12 rounded-full bg-green-100"></div>
            <div className="h-12 w-12 rounded-full bg-green-100"></div>
            <div className="h-12 w-12 rounded-full bg-green-100"></div>
            <div className="h-12 w-12 rounded-full bg-green-100"></div> */}
            <div className="h-12 w-12 hidden md:block shadow-lg rounded-full flex cursor-pointer bg-green-100">
              <div className="self-center mx-auto">
                <FaQuestion />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Default;
