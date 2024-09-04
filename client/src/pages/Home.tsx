import { Button } from "@/components/ui/button";
import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import { cn } from "@/lib/utils";
import React from "react";

type PropsWithChildren = {
  children?: React.ReactNode;
  className?: string;
};

export const GlowBackground = ({ children, className }: PropsWithChildren) => (
  <div className="relative">
    <div
      className={cn(`absolute inset-0 z-0`, className)}
      style={{
        background: `linear-gradient(120deg, #ffffff 40%, #e0f7ff 70%, #ffffff 100%)`,
      }}
    />
    <div className="relative z-10 h-full">{children}</div>
  </div>
);

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <GlowBackground>
      <div className="py-48 w-full flex justify-center items-center flex-col space-y-12 text-center">
        <div className="space-y-3">
          <h1 className="text-xl font-semibold font-mono">
            React + Shadcn starter template.
          </h1>
          <p className="text-sm">
            Made by{" "}
            <a
              className="hover:text-sky-400 hover:underline"
              href="https://libyzxy0.com"
            >
              libyzxy0
            </a>
            .
          </p>
        </div>
        <div className="flex flex-row items-center space-x-8">
          <img
            src="https://seeklogo.com/images/S/shadcn-ui-logo-EF735EC0E5-seeklogo.com.png?v=638421451470000000"
            className="h-20 w-20"
          />
          <h2 className="text-4xl font-bold">+</h2>
          <img src={reactLogo} className="h-20 w-20" />
        </div>
        <h1>
          Edit this file at{" "}
          <code className="bg-sky-400 font-mono">src/pages/Home.tsx</code>
        </h1>
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex flex-row items-center justify-center space-x-3">
            <p>Count is</p> <Button variant="outline">{count}</Button>
          </div>

          <Button onClick={() => setCount(count + 1)} className="font-mono">
            Click me
          </Button>
        </div>
      </div>
    </GlowBackground>
  );
}
