"use client"
import React, { useState, useEffect } from 'react';
import Memoji from "@/public/ayush-memoji.png";
import Memoji2 from "@/public/memoji2.png";
import Image from "next/image";

const ImageSwitcher = () => {
  const [currentImage, setCurrentImage] = useState(Memoji);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === Memoji ? Memoji2 : Memoji));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
      <Image
        alt="picture-of-ayush"
        src={currentImage}
        className="h-48 w-48 rounded-full object-cover object-top"
      />
  );
};

export default ImageSwitcher;
