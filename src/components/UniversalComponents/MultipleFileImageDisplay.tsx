import Image from "next/image";
import React from "react";

type Props = {
  label: string | null; // = null;
  isLoading: boolean | null; // = null;
  required: boolean; //= false;
  isMultiline: boolean; //= false;
  withoutMainImage: boolean; // = false;
  hasFavorite?: boolean;
  favoriteImageId?: string;
  setFavoriteId?: (id: string) => void;
  onSelectFile: () => void;
  onKeyDown?: () => void;
  disabled: boolean;
  deleteDisabled?: boolean;
};

const MultipleFileImageDisplay = (props: Props) => {
  return <></>;
  // if (props.isLoading) {
  //   return (
  //     <div className={"aspect-[4/3] h-36 rounded-lg m-2 self-end"}>
  //       <Skeleton className={"aspect-[4/3] h-36 self-center rounded-lg"} />
  //     </div>
  //   );
  // }

  // return (
  //   <>
  //     {props.value?.map((item, index) => {
  //       const id = item.imageId || item.mediaId || "";

  //       return (
  //         <div key={id} className={"m-2 shrink-0"}>
  //           <div className="relative">
  //             {index >= 0 && item.signedUrl && (
  //               <div className="absolute flex justify-between w-full bg-red pt-1 px-1">
  //                 {!!props.setFavoriteId ? (
  //                   <div
  //                     tabIndex={-1}
  //                     onKeyDown={props.onKeyDown}
  //                     role={"button"}
  //                     onClick={() => props.setFavoriteId!(id)}
  //                     className={
  //                       "border border-primary-light bg-white/[0.7] p-2 rounded-full"
  //                     }
  //                   >
  //                     {props.favoriteImageId === id ? (
  //                       <BookmarkFilledIcon
  //                         width={14}
  //                         height={14}
  //                         fillColor1="#28316D"
  //                         fillColor2="#28316D"
  //                       />
  //                     ) : (
  //                       <BookmarkIcon
  //                         width={14}
  //                         height={14}
  //                         fillColor1="#28316D"
  //                       />
  //                     )}
  //                   </div>
  //                 ) : (
  //                   <div />
  //                 )}
  //                 {!props.disabled && !props.deleteDisabled && (
  //                   <div
  //                     tabIndex={-1}
  //                     onKeyDown={props.onKeyDown}
  //                     role={"button"}
  //                     onClick={() => props.onDeletePhotoItem(item)}
  //                     className={
  //                       "border border-primary-light bg-white/[0.7] p-2 rounded-full"
  //                     }
  //                   >
  //                     <CloseIcon fillColor1="#28316D" />
  //                   </div>
  //                 )}
  //               </div>
  //             )}
  //           </div>
  //           {item.signedUrl ? (
  //             <Image
  //               unoptimized={true}
  //               width={192}
  //               height={124}
  //               src={item.signedUrl || ""}
  //               alt={id || `${index}`}
  //               className={"aspect-[4/3] h-36 object-cover rounded-lg"}
  //             />
  //           ) : (
  //             <div className={"aspect-[4/3] h-36 block  rounded-lg self-end"}>
  //               <Skeleton
  //                 className={"aspect-[4/3] h-36 self-center rounded-lg"}
  //               />
  //             </div>
  //           )}
  //         </div>
  //       );
  //     })}
  //   </>
  // );
};

export default MultipleFileImageDisplay;
