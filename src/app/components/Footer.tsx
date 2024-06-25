"use client";

import Image from "next/image";

const Footer = () => {
  return (
    <div
      className="flex items-center justify-center gap-x-2 h-[32px]"
      style={{ background: "#E1E1E1" }}
    >
      <span className="text-[14px] inter">Powered by ATAI</span>
      <Image
        src="images/atai_logo.svg"
        width={24}
        height={24}
        alt="ATAI Logo"
      />
    </div>
  );
};

export default Footer;
