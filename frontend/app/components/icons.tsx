import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const BoltIcon = (props: IconProps) => <Icon {...props}><path d="m13 2-3 8h7l-6 12 1-9H5l8-11Z" /></Icon>;
export const StarIcon = (props: IconProps) => <Icon {...props}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" /></Icon>;
export const TrophyIcon = (props: IconProps) => <Icon {...props}><path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4Zm0 2H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4" /></Icon>;
export const UserIcon = (props: IconProps) => <Icon {...props}><circle cx="12" cy="8" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></Icon>;
export const CodeIcon = (props: IconProps) => <Icon {...props}><path d="m8 17-5-5 5-5m8 0 5 5-5 5m-3-12-2 14" /></Icon>;
export const ResetIcon = (props: IconProps) => <Icon {...props}><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8m0-5v5h5" /></Icon>;
export const BulbIcon = (props: IconProps) => <Icon {...props}><path d="M9 18h6m-5 4h4m-5-7a7 7 0 1 1 6 0c-.8.5-1 1.2-1 3h-4c0-1.8-.2-2.5-1-3Z" /></Icon>;
export const ChevronDownIcon = (props: IconProps) => <Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>;
export const PlayIcon = (props: IconProps) => <Icon {...props} fill="currentColor" stroke="none"><path d="m7 4 13 8-13 8V4Z" /></Icon>;
export const CheckIcon = (props: IconProps) => <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>;
