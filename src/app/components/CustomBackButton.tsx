"use client";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";

const CustomBackButton = ({
  isDisabled = false,
  label,
}: {
  isDisabled: boolean;
  label: string;
}) => {
  const router = useRouter();
  const handleClick = () => router.back();
  return (
    <CustomButton onClick={handleClick} isDisabled={isDisabled} label={label} />
  );
};

export default CustomBackButton;
