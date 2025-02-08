"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
const Navbar = () => {
  const currentPath = usePathname();
  // console.log(currentPath);
  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Issues", href: "/issues" },
    { name: "Projects", href: "/projects" },
    { name: "Teams", href: "/teams" },
  ];
  return (
    <div>
      <nav className="flex space-x-4 border-b-2 border-gray-200 p-4">
        <Link href="/">
          <AiFillBug />
        </Link>
        <ul className="flex space-x-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={classNames({
                  "text-zinc-900": currentPath === link.href,
                  "text-zinc-500": currentPath !== link.href,
                  "hover:text-zinc-800 transition-colors duration-200": true,
                })}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
