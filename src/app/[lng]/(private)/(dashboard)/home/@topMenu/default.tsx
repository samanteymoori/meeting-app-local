import Image from "next/image";
import { FaQuestion, FaCalendar, FaSearch, FaWalking } from "react-icons/fa";

const Default = () => {
  return (
    <>
      <div className="flex gap-4 ml-4">
        <div className="shadow-xl  h-24 self-center rounded-full w-24 flex flex-none  bg-white text-neutral-500 ">
          <div className="ml-4   self-center">
            <Image
              className="bg-transparent  "
              src={"/images/logo.jpg"}
              alt={"Coffee"}
              width={64}
              height={64}
            />
          </div>
        </div>
        <div className="shadow-xl bg-blue-100 h-24 self-center rounded-full w-24 flex flex-none  bg-white text-neutral-500 ">
          <div className="self-center uppercase mx-auto">
            <h2 className="text-xl italic my-4">Book </h2>
          </div>
        </div>
        <div className="shadow-xl bg-pink-100 h-24 self-center rounded-full w-24 flex flex-none  bg-white text-neutral-500 ">
          <div className="self-center uppercase mx-auto">
            <h2 className="text-xl italic my-4"> Meet</h2>
          </div>
        </div>
      </div>
      <div className="flex-auto mx-auto">
        <div className=" h-full flex mx-auto self-center">
          <div className="self-center mx-auto flex-auto">
            <div className="flex mx-auto">
              <div className="h-16 [&>*]:uppercase  cursor-pointer [&>*]:self-center [&>*]:h-16 [&>*]:py-4 [&>*]:w-44 [&>*]:text-center rounded-lg [&>*]:mx-auto [&>*]:px-8 ml-8 [&>*]:border  shadow-xl rounded-lg bg-white flex">
                <div className="rounded-tl-lg flex bg-neutral-400 text-white [&>*]:self-center gap-4 rounded-bl-lg flex">
                  <div>
                    <FaSearch />
                  </div>
                  <div className="ml-2">Find</div>
                </div>
                <div className="flex [&>*]:self-center gap-4 flex">
                  <div>
                    <FaCalendar />
                  </div>
                  <div className="ml-2"> Book</div>
                </div>
                <div className="rounded-tr-lg flex [&>*]:self-center gap-4 rounded-br-lg flex">
                  <div>
                    <FaWalking />
                  </div>
                  <div className="ml-2"> Meet</div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-center   flex mx-8 p-4 gap-4">
            {/* <div className="h-12 w-12 rounded-full bg-green-100"></div>
            <div className="h-12 w-12 rounded-full bg-green-100"></div>
            <div className="h-12 w-12 rounded-full bg-green-100"></div>
            <div className="h-12 w-12 rounded-full bg-green-100"></div> */}
            <div className="h-12 w-12 shadow-lg rounded-full flex cursor-pointer bg-green-100">
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
