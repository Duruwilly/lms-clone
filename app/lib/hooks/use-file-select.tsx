import { useState, type Dispatch, type SetStateAction } from "react";

type UseFileSelectConfig = {
  allowMultiple: boolean;
};

const useFileSelect = (
  setFileObject?: Dispatch<SetStateAction<File[] | File | null>>,
  config: UseFileSelectConfig = { allowMultiple: false }
) => {
  const [filePreview, setFilePreview] = useState<
    | (string | { name: string; type: string })[]
    | string
    | { name: string; type: string }
    | null
  >(config.allowMultiple ? [] : null);

  const selectFile = async (
    mediaTypes: "Images" | "Documents",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (config.allowMultiple) {
        const selectedFiles = Array.from(files);
        const processedFiles: File[] = [];
        const previews: (string | { name: string; type: string })[] = [];

        for (const file of selectedFiles) {

          if (mediaTypes === "Documents" && file.type === "application/pdf") {
            previews.push({ name: file.name, type: file.type });
            setFilePreview([...previews]);
            processedFiles.push(file);
          } else {
            try {
              previews.push({ name: file.name, type: file.type });
              setFilePreview([...previews]);
              processedFiles.push(file);
            } catch (error) {
              console.error("Error", error);
            }
            // const reader = new FileReader();
            // reader.onloadend = () => {
            //   previews.push(reader.result as string);
            //   setFilePreview([...previews]);
            // };
            // reader.readAsDataURL(file);
            // previews.push({ name: file.name, type: file.type });
            // setFilePreview([...previews]);
          }
        }
        if (setFileObject) {
          setFileObject(processedFiles);
        }
      } else {
        const file = files[0];
        if (mediaTypes === "Documents" && file.type === "application/pdf") {
          setFilePreview({ name: file.name, type: file.type });
          if (setFileObject) {
            setFileObject(file);
          }
        } else {
          try {
            const reader = new FileReader();
            reader.onloadend = () => {
              setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            if (setFileObject) {
              setFileObject(file);
            }
          } catch (error) {
            console.error(error);
          }
          // const reader = new FileReader();
          // reader.onloadend = () => {
          //   setFilePreview(reader.result as string);
          // };
          // reader.readAsDataURL(file);
          // setFilePreview({ name: file.name, type: file.type });
        }
        // if (setFileObject) {
        //   setFileObject(file);
        // }
      }
    }
  };

  return {
    selectFile,
    filePreview,
    setFilePreview,
  };
};

export default useFileSelect;
