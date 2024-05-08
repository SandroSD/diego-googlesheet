import { Button } from "@nextui-org/react";

const CustomButton = ({
  onClick,
  isDisabled = false,
  label,
  customStyle = "",
}: {
  onClick: () => void;
  isDisabled: boolean;
  label: string;
  customStyle: string;
}) => {
  return (
    <Button
      className={`w-full ${customStyle}`}
      variant="solid"
      color="primary"
      onClick={onClick}
      isDisabled={isDisabled}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
