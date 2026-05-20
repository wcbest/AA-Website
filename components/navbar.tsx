"use client";

import Cookies from "js-cookie";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth-store";
import { MainNav } from "./main-nav";
import { MobileToggle } from "./mobile.toggle";
import NavMenu from "./nav-menu";

const Navbar = () => {
  const { onLogin, onLogout, isAuth, data } = useAuth();

  const router = useRouter();

  const handleClick = () => {
    onLogout();
    localStorage.clear();
    Cookies.remove("isAuth");
    router.push("/");
  };

  return (
    <div className="fixed top-0 z-10 w-full border-b bg-white">
      <div className="flex h-16 items-center overflow-hidden px-4">
        <Image
          className="cursor-pointer object-cover"
          alt="Image"
          src={`/images/AAlogo.jpeg`}
          width={100}
          height={100}
          sizes="(max-width: 4px) 100vw, (max-width: 4px) 80vw, 1200px"
          onClick={() => router.push(`/`)}
        />
        <MainNav className="mx-6" />
        <NavMenu />
        <div className="ml-auto flex items-center space-x-4">
          <MobileToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <Avatar>
                <AvatarImage src="/images/6871A695-1EFF-4A18-8815-1542BB6A7784.pdf" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuItem
                className="flex w-full justify-between"
                onClick={handleClick}
              >
                logout
                <LogOutIcon size={16} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
