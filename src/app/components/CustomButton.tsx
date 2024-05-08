import { Button } from "@nextui-org/react";

const CustomButton = ({
  onClick,
  isDisabled = false,
  label,
}: {
  onClick: () => void;
  isDisabled: boolean;
  label: string;
}) => {
  return (
    <Button
      className="w-full"
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
