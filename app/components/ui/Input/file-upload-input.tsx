import React, { type SetStateAction } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import FileUploadIcon from "~/assets/svg/icons/file-upload-icon";

interface FileUploadInputArgs {
  handleFileChange: (
    mediaType: "Images" | "Documents",
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  filePreview:
    | string
    | {
        name: string;
        type: string;
      }
    | (
        | string
        | {
            name: string;
            type: string;
          }
      )[]
    | null;
  thumbnail: File | File[] | null;
  setThumbnail: (value: SetStateAction<File | File[] | null>) => void;
  setFilePreview: (
    value: SetStateAction<
      | string
      | {
          name: string;
          type: string;
        }
      | (
          | string
          | {
              name: string;
              type: string;
            }
        )[]
      | null
    >,
  ) => void;
}

const FileUploadInput = ({
  handleFileChange,
  filePreview,
  thumbnail,
  setThumbnail,
  setFilePreview,
}: FileUploadInputArgs) => {
  return (
    <div
      className={`border border-(--color-Blue-200) border-dashed bg-(--color-Blue-50) rounded-xl py-4 px-6 relative h-full min-h-32`}
    >
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={(e) => handleFileChange("Images", e)}
        className="hidden"
        id="thumbnail"
      />
      <label
        htmlFor="thumbnail"
        className="cursor-pointer flex items-center justify-between"
      >
        {!filePreview ? (
          <div className="flex items-center justify-center mx-auto">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-(--color-grey-50) rounded-lg size-10 flex items-center justify-center">
                <FileUploadIcon className="text-(--color-Blue-600)" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-(--color-Blue-600) font-semibold font-Inter-SemiBold text-sm">
                  Click to upload{" "}
                  <span className="text-sm font-normal font-Inter-Regular text-(--color-texts-neutral)">
                    or drag and drop
                  </span>
                </p>
                <p className="text-(--color-text-secondary) text-xs text-center">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <img
              src={filePreview as string}
              alt="gift card image"
              className="w-[62px] h-12 rounded-[6.69px] object-cover"
            />
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">
                  {(thumbnail as File)?.name}
                </p>
              </div>
            </div>
          </div>
        )}
      </label>
      {filePreview && (
        <div
          onClick={() => {
            setThumbnail({} as File);
            setFilePreview(null);
          }}
          className="cursor-pointer absolute right-5 top-1/2 -translate-y-1/2"
        >
          <IoCloseCircleOutline size={20} />
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;
