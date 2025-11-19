import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-hscreen">
      <Loader className="h-6 w-6 animate-spin text-primary-blue-600" />
    </div>
  );
};

export default Spinner;
