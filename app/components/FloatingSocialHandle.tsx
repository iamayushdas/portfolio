"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SocialHandles from "./SocialHandles";
import { MessagesSquare, X } from "lucide-react";

const FloatingSocialHandle: React.FC = () => {
  const [socialHandlesVisible, setSocialHandlesVisible] = useState(false);

  const toggleSocialHandles = () => {
    setSocialHandlesVisible(!socialHandlesVisible);
  };

  return (
    <div>
      {socialHandlesVisible && (
        <div className="fixed bottom-16 left-4 z-10">
          <SocialHandles />
        </div>
      )}

      <Button
        onClick={toggleSocialHandles}
        className="fixed bottom-4 bg-teal-100 left-4 z-10 text-white p-2 rounded-full cursor-pointer hover:bg-teal-500 shadow-lg"
      >
        {socialHandlesVisible ? <X className="text-teal-500 hover:text-white w-full h-full" /> : <MessagesSquare className="text-teal-500 hover:text-white w-full h-full"/>}
      </Button>
    </div>
  );
};

export default FloatingSocialHandle;
