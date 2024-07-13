"use client";
import RoundedImage from "@/components/Profile/RoundedImage";
import { profileList } from "@/mocks/profile-list";
import { RoundedImageType } from "@/types/RoundedImageType";
import { useState } from "react";

const Default = () => {
  const [images, setImages] = useState<Array<RoundedImageType>>(profileList);
  const selectImage = (img: RoundedImageType) => {
    const lst = Array.from(images)?.map((p) => {
      return { ...p, size: img.src === p.src ? "small" : "small" };
    });
    setImages(lst as any);
  };

  const [selectedImage, setSelectedImage] = useState<RoundedImageType>(
    images[0]
  );

  return (
    <div className="flex">
      {images.map((img, index) => (
        <div key={index} onClick={() => selectImage(img)}>
          <RoundedImage src={img.src} size={img.size} />
        </div>
      ))}
    </div>
  );
};
export default Default;
