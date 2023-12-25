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
        <div className="fixed bottom-20 mb-5 left-4 z-10">
          <SocialHandles />
        </div>
      )}

      <Button
        onClick={toggleSocialHandles}
        className="fixed bottom-8 bg-teal-100 left-4 z-10 text-white p-2 rounded-full cursor-pointer hover:bg-teal-500 shadow-lg"
        style={{ width: "50px", height: "50px" }}
      >
        {socialHandlesVisible ? <X className="text-teal-500 hover:text-white w-8 h-8" /> : <MessagesSquare className="text-teal-500 hover:text-white w-8 h-8"/>}
      </Button>
    </div>
  );
};

export default FloatingSocialHandle;
