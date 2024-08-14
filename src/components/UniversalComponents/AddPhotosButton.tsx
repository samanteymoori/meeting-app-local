"use client";
import { FaFileUpload } from "react-icons/fa";

type Props = {
  handlePress: () => void;
  disabled?: boolean;
};

const AddPhotosButton = (props: Props) => {
  return (
    <button
      className="rounded-lg bg-primary-light text-left p-4 aspect-[4/3] h-36  flex  m-0"
      disabled={props.disabled}
      onClick={props.handlePress}
    >
      <div className="flex mx-auto self-center">
        <div className="rounded-full  p-4 bg-primary-light">
          <FaFileUpload />
        </div>
      </div>
    </button>
  );
};

export default AddPhotosButton;
