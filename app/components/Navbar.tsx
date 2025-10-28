"use client"
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
  const disclosureButtonRef = useRef<HTMLButtonElement | null>(null);
  const disclosurePanelRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname() || "/";
  const isOpen = disclosurePanelRef.current?.getAttribute("data-state") === "open";

  useEffect(() => {
    if (isOpen) {
      disclosureButtonRef.current?.click();
    }
  }, [pathname, isOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience" },
    { href: "/skills", label: "Skills" },
    { href: "/blog", label: "Blogs" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "AMA" },
  ];

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <Link href={"/"}>
                    <h1 className="text-2xl font-medium">
                      Ayush <span className="text-teal-500">Das</span>
                    </h1>
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      prefetch
                      className={`${
                        pathname === href
                          ? "border-teal-500 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          : "border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                  <ThemeButton />
                </div>

                <div className="-mr-2 flex items-center sm:hidden">
                  <ThemeButton />
                  <Disclosure.Button
                    ref={disclosureButtonRef}
                    className={
                      "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:hover:bg-gray-800"
                    }
                  >
                    {open ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel
            ref={disclosurePanelRef}
            className={"sm:hidden"}
            data-state={open ? "open" : "closed"}
          >
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  prefetch
                  className={`${
                    pathname === href
                      ? "bg-teal-50 border-teal-500 text-teal-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-teal-500 block pl-3 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-base font-medium dark:text-white"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
