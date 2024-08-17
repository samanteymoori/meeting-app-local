"use client";

import { useState, useEffect } from "react";
import AddPhotosButton from "./AddPhotosButton";
import MultipleFileImageDisplay from "./MultipleFileImageDisplay";

export enum Position {
  Start,
  End,
}
type Props = {
  uploadPosition?: Position;
  readonly?: boolean;
  onKeyDown?: () => void;
  value?: any;
  isFile: boolean;
  data: any;
  label: string | null;
  isLoading?: boolean | null;
  setIsLoading: (state: boolean) => void;
  required: boolean;
  isMultiple: boolean;
  disabled: boolean;
  isMultiline: boolean;
  withoutMainImage: boolean;
  displayImageId?: string;
  addingDisabled?: boolean;
  deleteDisabled?: boolean;
  replace?: boolean;
  setDisplayImageId?: (id: string) => void;
  setCancel: () => void;
  onError?: (error: any) => void;
};

const UniversalFileUpload: React.FC<Props> = (props) => {
  const { uploadPosition = Position.Start } = props;
  const [IdleHandler, setIdleHandler] = useState<number | null>(null);
  // const [cancelFileUploadleHandler, setCancelFileUploadleHandler] = useState<number | null>(null);

  const [imageChanged, setImageChanged] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const mediaUploaderId = (Math.random() + 1).toString(36).substring(7);
  const [filesLength, setFilesLength] = useState(0);
  useEffect(() => {
    stopLoading();
  }, [props.value]);
  const stopLoading = () => {
    if (props.isLoading == null) {
      setLocalLoading(false);
    }

    setFilesLength(filesLength - 1);
    props.setIsLoading(filesLength > 0);
  };

  const startLoading = () => {
    if (props.isLoading == null) {
      setLocalLoading(true);
    }

    props.setIsLoading(true);
  };

  const cancel = () => {
    props.setCancel();

    setFilesLength(0);
    stopLoading();
  };
  const clearIdleHandler = () => {
    if (IdleHandler) {
      clearTimeout(IdleHandler);
      setIdleHandler(null);
    }
  };
  const open = () => {
    clearIdleHandler();
    setIdleHandler(
      window.setTimeout(() => {
        if (!props?.data?.formData) {
          cancel();
        }
      }, 20000)
    );
    startLoading();
    document.body.onfocus = () => {
      document.body.onfocus = null;
      if (!imageChanged) {
        cancel();
      } else {
        setImageChanged(false);
        clearIdleHandler();
      }
    };
  };

  const convertBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

  const uploadFile = async (files: any) => {
    if (files.length === 0) {
      cancel();
      return;
    }

    // const mediaApiService = getMediaService(window.location.origin);
    // const mediaUploadService = getMediaUploadService(mediaApiService);
    // mediaUploadService
    //   .immediatelyUploadPhoto({
    //     fileName: files[0].name,
    //     file: files[0],
    //   })
    //   .then((result) => {
    //     if (result.signedURLResultError) {
    //       console.log(result.signedURLResultError);
    //       return;
    //     }
    //     if (result.uploadResultError) {
    //       console.log(result.uploadResultError);
    //       return;
    //     }
    //     const arr = Array.from(props.value);
    //     convertBase64(files[0]).then(async (res: any) => {
    //       if (props.onUpload) {
    //         props.onUpload({
    //           mediaId: result.signedURLResultResponse?.image_id || "",
    //           signedUrl: res,
    //         });
    //       }
    //       if (props.replace) {
    //         props.setInput([
    //           {
    //             mediaId: result.signedURLResultResponse?.image_id || "",
    //             signedUrl: res,
    //           },
    //         ]);
    //       } else {
    //         arr.push({
    //           mediaId: result.signedURLResultResponse?.image_id || "",
    //           signedUrl: res,
    //         });
    //         props.setInput(arr);
    //       }
    //     });
    //   });
    // startLoading();
  };

  const format = () => {
    const imageExtensions = ".jpg,.jpeg,.png,.heic,.gif,.webp";
    if (props.isFile) {
      return `${imageExtensions},.doc,.docx,.pdf,.csv,.xls,.xlsx,.ppt,.pptx`;
    }

    return imageExtensions;
  };

  const checkFile = (file: any = null) => {
    const fileElement = file
      ? file?.name
      : (document?.getElementById?.(mediaUploaderId) as any)?.value;
    let fileExtension = "";
    if (fileElement.lastIndexOf(".") > 0) {
      fileExtension = fileElement.substring(
        fileElement.lastIndexOf(".") + 1,
        fileElement.length
      );
    }

    if (format().indexOf(fileExtension.toLowerCase()) !== -1) {
      return true;
    }

    return false;
  };

  const imagesChange = async (e: any, file = null, withDrop = false) => {
    setImageChanged(true);
    let files: Array<any> = file || (withDrop ? e : e?.target.files);
    if (!withDrop && !files) {
      files = e?.target.files;
    }

    const imageSizeLimit = 5 * 1024; // kb

    if (e?.target?.files?.length) {
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < files.length; index++) {
        const fileItem = files[index];

        if (!checkFile(fileItem)) {
          cancel();
          return;
        }

        if (fileItem.size === 0) {
          cancel();
          return;
        }

        if (fileItem.size > imageSizeLimit * 1024) {
          cancel();
        }
        convertBase64(files[0]).then(async (res: any) => {
          await fetch("/api/user_profiles/picture", {
            method: "POST",
            body: JSON.stringify({ file: res }),
          });
        });
      }

      setFilesLength(e?.target?.files?.length || 0);
    }

    uploadFile(files);
  };

  const isLoadingLocallyOrFromParent = () => props.isLoading || localLoading;

  const onSelectFile = () => {
    if (!props.disabled) {
      document?.getElementById?.(mediaUploaderId)?.click?.();
    }
  };

  return (
    <>
      <input
        id={mediaUploaderId}
        type={"file"}
        className={"hidden"}
        accept={format()}
        multiple={props.isMultiple}
        onChange={(e) => imagesChange(e, null, false)}
        onClick={open}
      />

      <div className={"flex gap-4 overflow-x-auto"}>
        {props.disabled && (
          <div className={"absolute w-full h-full bg-white opacity-50 z-10"} />
        )}

        {!props.addingDisabled && uploadPosition === Position.Start && (
          <div className={"self-end my-2 mr-2"}>
            {props.label && (
              <div className={"text-bluegray-500 pb-2"}>
                <h5> {props.label}</h5> {props.required && <span>{"*"}</span>}
              </div>
            )}
            <AddPhotosButton
              handlePress={onSelectFile}
              disabled={isLoadingLocallyOrFromParent()}
            />
          </div>
        )}

        <MultipleFileImageDisplay
          disabled={props.readonly || false}
          label={props.label}
          value={props?.value || []}
          isLoading={isLoadingLocallyOrFromParent()}
          required={props.required}
          isMultiline={props.isMultiline}
          withoutMainImage={props.withoutMainImage}
          onSelectFile={onSelectFile}
          onDeletePhotoItem={() => {}}
          favoriteImageId={props.displayImageId}
          deleteDisabled={props.deleteDisabled}
          setFavoriteId={props.setDisplayImageId}
        />
        {!props.addingDisabled && uploadPosition === Position.End && (
          <div className={"self-end my-2 mr-2"}>
            {props.label && (
              <div className={"text-bluegray-500 pb-2"}>
                <h5> {props.label}</h5> {props.required && <span>{"*"}</span>}
              </div>
            )}
            <AddPhotosButton
              handlePress={onSelectFile}
              disabled={isLoadingLocallyOrFromParent()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UniversalFileUpload;
