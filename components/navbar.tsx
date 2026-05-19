"use client";

import { useRouter } from "next/navigation";
import { MainNav } from "./main-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import NavMenu from "./nav-menu";
import { useAuth } from "@/hooks/use-auth-store";
import Image from "next/image";
import { MobileToggle } from "./mobile.toggle";
import Cookies from "js-cookie";

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
    <div className="border-b fixed top-0 z-10 bg-white w-full">
      <div className="flex h-16 items-center px-4 overflow-hidden">
        <Image
          className="object-cover cursor-pointer"
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
                className="w-full flex justify-between "
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
