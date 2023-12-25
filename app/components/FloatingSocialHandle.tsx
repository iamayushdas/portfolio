"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import SocialHandles from "./SocialHandles";
import { MessagesSquare, X } from "lucide-react";

const FloatingSocialHandle: React.FC = () => {
  const [socialHandlesVisible, setSocialHandlesVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleSocialHandles = () => {
    setSocialHandlesVisible(!socialHandlesVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      event.target !== buttonRef.current
    ) {
      setSocialHandlesVisible(false);
    }
  };

  useEffect(() => {
    if (socialHandlesVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [socialHandlesVisible]);

  return (
    <div>
      {socialHandlesVisible && (
        <div className="fixed bottom-20 mb-5 left-4 z-10">
          <SocialHandles />
        </div>
      )}

      <Button
        ref={buttonRef}
        onClick={toggleSocialHandles}
        className="fixed bottom-8 bg-teal-100 left-4 z-10 text-white p-2 rounded-full cursor-pointer hover:bg-teal-500 shadow-lg"
        style={{ width: "50px", height: "50px" }}
      >
        {socialHandlesVisible ? (
          <X className="text-teal-500 hover:text-white w-8 h-8" />
        ) : (
          <MessagesSquare className="text-teal-500 hover:text-white w-8 h-8" />
        )}
      </Button>
    </div>
  );
};

export default FloatingSocialHandle;
