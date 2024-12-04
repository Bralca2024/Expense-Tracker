import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div>
      <p className="text-center text-white uppercase bg-red-600 py-2 mb-2">
        {children}
      </p>
    </div>
  );
}
