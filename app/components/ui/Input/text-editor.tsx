import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import InfoCircle from "~/assets/svg/icons/info-circle";
import { Paragraph } from "../paragraph";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  placeholder: string;
  height?: string;
}

export default function TextEditor({
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  height = "65px",
}: TextEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="mb-10">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        onBlur={onBlur}
        className="text-base [&_.ql-container.ql-snow]:border-none [&_.ql-container]:rounded-b-md [&_.ql-toolbar.ql-snow]:rounded-t-md"
        placeholder={placeholder}
        style={{ height }}
      />
      {error && (
        <div className="flex items-center gap-1 pt-1">
          <InfoCircle className="text-(--color-error-text)" />
          <Paragraph className="!text-(--color-error-text) text-sm">
            {error}
          </Paragraph>
        </div>
      )}
    </div>
  );
}
