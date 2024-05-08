"use client";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";

const CustomBackButton = ({
  isDisabled = false,
  label,
  customStyle = "",
}: {
  isDisabled: boolean;
  label: string;
  customStyle: string;
}) => {
  const router = useRouter();
  const handleClick = () => router.back();
  return (
    <CustomButton
      onClick={handleClick}
      isDisabled={isDisabled}
      label={label}
      customStyle={customStyle}
    />
  );
};

export default CustomBackButton;
