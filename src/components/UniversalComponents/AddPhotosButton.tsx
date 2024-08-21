"use client";
import { FaCloud, FaCloudUploadAlt, FaFileUpload } from "react-icons/fa";

type Props = {
  handlePress: () => void;
  disabled?: boolean;
};

const AddPhotosButton = (props: Props) => {
  return (
    <button
      className="rounded-lg border-2 border-dashed  bg-primary-light text-left p-4 aspect-[4/3] h-36  flex  m-0"
      disabled={props.disabled}
      onClick={props.handlePress}
    >
      <div className="flex mx-auto self-center">
        <div className="rounded-full  text-green-800  p-4 bg-primary-light">
          <FaCloudUploadAlt size={"64"} />
        </div>
      </div>
    </button>
  );
};

export default AddPhotosButton;
