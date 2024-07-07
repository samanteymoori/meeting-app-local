import Image from "next/image";
import { FaCalendar, FaSearch, FaWalking } from "react-icons/fa";

const Default = () => {
  return (
    <>
      <div className="shadow-xl self-center rounded-lg rounded-l-none flex flex-none  bg-white ">
        <div className="ml-4   self-center">
          <Image
            className="bg-transparent  "
            src={"/images/logo.jpg"}
            alt={"Coffee"}
            width={64}
            height={64}
          />
        </div>
        <div className="self-center uppercase mx-auto">
          <h2 className="text-xl italic my-4">Book & Meet</h2>
        </div>
      </div>
      <div className="col-span-5 grid  ">
        <div className=" h-full flex self-center">
          <div className="self-center mx-auto flex-auto">
            <div className="flex mx-auto">
              <div className="h-16 [&>*]:uppercase [&>*]:self-center [&>*]:h-16 [&>*]:py-4 [&>*]:w-44 [&>*]:text-center rounded-lg [&>*]:mx-auto [&>*]:px-8 ml-8 [&>*]:border  shadow-xl rounded-lg bg-white flex">
                <div className="rounded-tl-lg flex [&>*]:self-center gap-4 rounded-bl-lg flex">
                  <div>
                    <FaSearch />
                  </div>
                  <div>Find</div>
                </div>
                <div className="rounded-tl-lg flex [&>*]:self-center gap-4 rounded-bl-lg flex">
                  <div>
                    <FaCalendar />
                  </div>
                  <div> Book</div>
                </div>
                <div className="rounded-tr-lg flex [&>*]:self-center gap-4 rounded-br-lg flex">
                  <div>
                    <FaWalking />
                  </div>
                  <div> Meet</div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-center   flex mx-8 p-4 gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100"></div>
            <div className="h-12 w-12 rounded-full bg-green-100"></div>
            <div className="h-12 w-12 rounded-full bg-green-100"></div>
            <div className="h-12 w-12 rounded-full bg-green-100"></div>
            <div className="h-12 w-12 rounded-full bg-green-100"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Default;
