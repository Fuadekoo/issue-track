import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
const Navbar = () => {
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
          
            {links.map((link) => {
              return (
                <Link
                  href={link.href}
                  className="text-zinc-500 hover:text-black transition-colors"
                >
                  {link.name}
                </Link>
              );
            })}
          
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
