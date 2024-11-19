import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface FullScreenWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const YStack = ({
  children,
  className,
  ...props
}: FullScreenWrapperProps) => {
  const mergedClassName = clsx("flex flex-col", className);
  return (
    <div className={mergedClassName} {...props}>
      {children}
    </div>
  );
};
