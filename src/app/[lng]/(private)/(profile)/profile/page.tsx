"use client";
import UniversalFileUpload from "@/components/UniversalComponents/UniversalFileUpload";
import { FaFileUpload } from "react-icons/fa";

export default function Page() {
  return (
    <div>
      set profile picture:
      <UniversalFileUpload
        isFile={false}
        data={[]}
        label={"upload image"}
        setIsLoading={() => {}}
        required={false}
        isMultiple={false}
        disabled={false}
        isMultiline={false}
        withoutMainImage={false}
        setCancel={() => {}}
      />
      <div className="grid grid-cols-2">
        <div></div>
      </div>
    </div>
  );
}
