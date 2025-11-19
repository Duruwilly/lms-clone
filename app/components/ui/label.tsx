const Label = ({
  label,
  isRequired,
}: {
  label: string;
  isRequired?: boolean;
}) => {
  return (
    <div className="flex flex-row items-center mb-2">
      <p className="text-sm font-Inter-SemiBold font-semibold text-(--color-texts-neutral)">
        {label}
      </p>
      {isRequired && <span className="text-brand-600">*</span>}
    </div>
  );
};

export default Label;
