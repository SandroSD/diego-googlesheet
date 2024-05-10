"use client";

import Image from "next/image";
import logo from "@/app/assets/logo.png";
import CustomBackButton from "@/app/components/CustomBackButton";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathName = usePathname();

  return (
    <nav className="h-16 bg-[#0B274D] w-full flex items-center justify-between px-3 sm:px-6 lg:px-8">
      <div>
        <Image src={logo} alt="Logo" width={150} height={150} priority={true} />
      </div>
      {pathName !== "/" && (
        <div>
          <CustomBackButton
            customStyle="bg-gray-300 text-[#0B274D] font-bold"
            isDisabled={false}
            label="Volver"
          />
        </div>
      )}
    </nav>
  );
}
