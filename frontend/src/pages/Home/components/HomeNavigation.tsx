import { useTheme, type Theme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import i18n from "@/i18n";
import type { AuthUser } from "@/types/AuthUser";
import { useTranslation } from "react-i18next";
import {
  FaFlag,
  FaLightbulb,
  FaPlus,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";

type HomeNavigationProps = {
  user: AuthUser;
  logout: () => void;
};

const HomeNavigation = ({ user, logout }: HomeNavigationProps) => {
  const { t } = useTranslation();

  const { theme, setTheme } = useTheme();

  return (
    <Drawer direction="left">
      <DrawerTrigger className="p-2">
        <GiHamburgerMenu />
      </DrawerTrigger>
      <DrawerContent className="p-2">
        <DrawerHeader className="text-center relative">
          <DrawerTitle className="text-3xl">
            {t("pages.home.title")}
            <DrawerClose className="absolute right-0.5">
              <Button variant="outline">
                <FaXmark />
              </Button>
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription>{t("pages.home.subtitle")}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex gap-2">
          <Button>
            <FaPlus />
            {t("pages.home.newWorkspaces")}
          </Button>
          <div className="flex items-center justify-between  p-1 hover:bg-gray-500/20 duration-500 rounded-xl cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full">
                <div className="flex gap-1 items-center">
                  <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.username || "Profile picture"}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">
                    {user?.username || "Profile picture"}
                  </h3>
                </div>
                <IoMdSettings />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                    <FaFlag />
                    {t("pages.home.language")}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={i18n.language}
                        onValueChange={(value) => i18n.changeLanguage(value)}
                      >
                        <DropdownMenuRadioItem
                          value="fr"
                          className="cursor-pointer"
                        >
                          Francais
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="en"
                          className="cursor-pointer"
                        >
                          English
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer">
                    <FaLightbulb />
                    {t("pages.home.theme")}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={theme}
                        onValueChange={(value) => setTheme(value as Theme)}
                      >
                        <DropdownMenuRadioItem
                          value="system"
                          className="cursor-pointer"
                        >
                          System
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="light"
                          className="cursor-pointer"
                        >
                          Light
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="dark"
                          className="cursor-pointer"
                        >
                          Dark
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuItem className="cursor-pointer">
                  <FaUser />
                  {t("pages.home.profile")}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <FaSignOutAlt />
                  {t("pages.home.signOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default HomeNavigation;
