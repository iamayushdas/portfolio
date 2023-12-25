"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/blog")}
      style={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
      className="fixed bottom-4 bg-teal-100 left-4 z-10 text-white p-2 rounded-full cursor-pointer hover:bg-teal-500"
    >
      <ChevronLeftCircle className="text-teal-500 hover:text-white" />
    </Button>
  );
};

export default BackButton;
