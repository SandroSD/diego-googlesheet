import { Button } from "@nextui-org/react";

const CustomButton = ({
  onClick,
  isDisabled = false,
}: {
  onClick: () => void;
  isDisabled: boolean;
}) => {
  return (
    <Button
      className="w-full"
      variant="solid"
      color="primary"
      onClick={onClick}
      isDisabled={isDisabled}
    >
      Continuar
    </Button>
  );
};

export default CustomButton;
