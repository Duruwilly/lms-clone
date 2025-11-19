import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";

interface GoBackArgs {
  goBack?: () => void;
}

const GoBack = ({ goBack }: GoBackArgs) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => (goBack ? goBack() : navigate(-1))}
      className="cursor-pointer"
    >
      <IoMdArrowBack size={20} />
    </div>
  );
};

export default GoBack;
