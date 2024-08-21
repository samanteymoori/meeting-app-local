"use client";
import UniversalFileUpload from "@/components/UniversalComponents/UniversalFileUpload";
import UniversalTextBox from "@/components/UniversalComponents/UniversalTextBox";

export default function Page() {
  return (
    <div className="grid grid-cols-6 flex w-full  h-20 bg-neutral-500 ">
      <h1 className="col-span-6 m-4 text-xl text-white flex self-top h-20">
        {"My Profile"}
      </h1>
      <div className="col-span-6 grid grid-cols-6 flex-auto h-full">
        <div className="col-span-6 p-2  gap-2 h-full bg-white  grid md:grid-cols-2">
          <div className="grid ">
            <h1 className="text-2xl m-4">{"Change Profile Detail"}</h1>
            <div className="grid gap-4 m-4 grid-cols-2">
              <div>
                <UniversalTextBox
                  label={"First name"}
                  value={""}
                  name={"first_name"}
                />
              </div>
              <div>
                <UniversalTextBox
                  label={"Last name"}
                  value={""}
                  name={"last_name"}
                />
              </div>
              <div>
                <UniversalTextBox label={"Weight"} value={""} name={"weight"} />
              </div>
              <div>
                <UniversalTextBox label={"Height"} value={""} name={"height"} />
              </div>
              <div>
                <UniversalTextBox
                  label={"Hobbies"}
                  value={""}
                  name={"hobbies"}
                />
              </div>
              <div>
                <UniversalTextBox
                  label={"Education"}
                  value={""}
                  name={"education"}
                />
              </div>
              <div>
                <UniversalTextBox label={"Job"} value={""} name={"job"} />
              </div>
              <div>
                <UniversalFileUpload
                  isFile={false}
                  data={[]}
                  label={"Upload Image"}
                  setIsLoading={() => {}}
                  required={false}
                  isMultiple={false}
                  disabled={false}
                  isMultiline={false}
                  withoutMainImage={false}
                  setCancel={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
