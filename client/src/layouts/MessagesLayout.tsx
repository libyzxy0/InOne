import React from "react";

type Props = {
  children: React.ReactNode;
};

export function MessagesLayout({ children }: Props) {
  return (
    <main className="flex-1 flex flex-col bg-gray-100 pt-16">
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="space-y-4">{children}</div>
      </div>
    </main>
  );
}
