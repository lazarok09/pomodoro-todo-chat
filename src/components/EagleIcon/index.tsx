import Image from "next/image";

type EagleProps = {
  height: number;
  width: number;
  altText: string;
};
export const EagleIcon = ({ altText, height, width }: EagleProps) => {
  return (
    <Image src={"/eagle.svg"} height={height} width={width} alt={altText} />
  );
};
