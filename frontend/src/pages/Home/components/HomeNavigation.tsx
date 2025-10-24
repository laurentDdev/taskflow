import {useTheme, type Theme} from "@/components/theme-provider";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
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
import type {AuthUser} from "@/types/AuthUser";
import {useTranslation} from "react-i18next";
import {FaFlag, FaLightbulb, FaPlus, FaSignOutAlt, FaUser,} from "react-icons/fa";
import {FaXmark} from "react-icons/fa6";
import {GiHamburgerMenu} from "react-icons/gi";
import {IoIosNotifications, IoMdSettings} from "react-icons/io";
import CreateWorkspace from "./CreateWorkspace";
import useWorkspaceStore from "@/stores/workspace.store";
import WorkspaceListNavigation from "./WorkspaceListNavigation";
import useNotificationStore from "@/stores/notification.store.ts";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {useState} from "react";
import {NotificationStatus, type ReceivedNotification} from "@/types/Notification.ts";
import {Link} from "react-router";
import {timeDifference} from "@/utils/time.ts";

type HomeNavigationProps = {
    user: AuthUser | null;
    logout: () => void;
};

const HomeNavigation = ({user, logout}: HomeNavigationProps) => {
    const {t, i18n} = useTranslation("home");
    const {t: workspaceT} = useTranslation("invitation");
    const {workspaces} = useWorkspaceStore();
    const [openSheet, setOpenSheet] = useState(false);
    const {getUnreadNotificationsCount, notifications} = useNotificationStore()

    const {theme, setTheme} = useTheme();


    const handleLogout = async () => {
        logout();
    }

    return (
        <Drawer direction="left">
            <DrawerTrigger className="p-5 max-w-max">
                <GiHamburgerMenu/>
            </DrawerTrigger>
            <DrawerContent className="p-2 flex flex-col gap-5">
                <DrawerHeader className="flex items-center relative">
                    <DrawerTitle className="text-3xl">
                        {t("title")}
                        <DrawerClose asChild className="absolute right-0.5">
                            <Button variant="outline">
                                <FaXmark/>
                            </Button>
                        </DrawerClose>
                    </DrawerTitle>
                    <DrawerDescription>{t("subtitle")}</DrawerDescription>
                </DrawerHeader>
                <div className="h-full flex flex-col gap-2 p-2">
                    <h2 className="text-xl mb-5">{t("myWorkspaces")}</h2>

                    <WorkspaceListNavigation workspaces={workspaces}/>
                </div>
                <DrawerFooter className="flex gap-2">
                    <CreateWorkspace>
                        <Button className="w-full hover:scale-[101%] transition-transform duration-500">
                            <FaPlus/>
                            {t("newWorkspaces")}
                        </Button>
                    </CreateWorkspace>
                    <div
                        className="flex items-center justify-between  p-1 hover:bg-gray-500/20 duration-500 rounded-xl cursor-pointer">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center justify-between w-full relative">
                                <div className="flex gap-2 items-center">
                                    <div className="relative">
                                        <Avatar>
                                            <AvatarImage src={user!.image!}/>
                                            <AvatarFallback>
                                                {user?.name || "Profile picture"}
                                            </AvatarFallback>
                                        </Avatar>

                                        {/* Badge sur avatar */}
                                        {getUnreadNotificationsCount() > 0 && (
                                            <div
                                                className="absolute -top-1 -right-1 flex items-center justify-center
                  bg-red-500 text-white text-[10px] font-bold
                  w-4 h-4 rounded-full shadow-md"
                                            >
                                                {getUnreadNotificationsCount() > 9 ? "9+" : getUnreadNotificationsCount()}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-semibold truncate max-w-[120px]">
                                        {user?.name || "Profile picture"}
                                    </h3>
                                </div>

                                <IoMdSettings className="text-xl"/>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                {/* Langue */}
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="cursor-pointer">
                                        <FaFlag/>
                                        {t("language")}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuRadioGroup
                                                value={i18n.language}
                                                onValueChange={(value) => i18n.changeLanguage(value)}
                                            >
                                                <DropdownMenuRadioItem value="fr" className="cursor-pointer">
                                                    Français
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="en" className="cursor-pointer">
                                                    English
                                                </DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>

                                {/* Thème */}
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="cursor-pointer">
                                        <FaLightbulb/>
                                        {t("theme")}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuRadioGroup
                                                value={theme}
                                                onValueChange={(value) => setTheme(value as Theme)}
                                            >
                                                <DropdownMenuRadioItem value="system" className="cursor-pointer">
                                                    System
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="light" className="cursor-pointer">
                                                    Light
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="dark" className="cursor-pointer">
                                                    Dark
                                                </DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>

                                {/* Notifications → ouvre le panneau latéral */}
                                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                                    <SheetTrigger asChild>
                                        <DropdownMenuItem
                                            className="cursor-pointer relative flex items-center gap-2"
                                            onSelect={(e) => e.preventDefault()} // évite la fermeture auto du dropdown
                                        >
                                            <IoIosNotifications className="text-lg"/>
                                            <span>{t("notifications")}</span>
                                            {getUnreadNotificationsCount() > 0 && (
                                                <div
                                                    className="absolute right-2 top-1/2 -translate-y-1/2
                      flex items-center justify-center
                      bg-red-500 text-white text-[10px] font-bold
                      w-4 h-4 rounded-full shadow-md"
                                                >
                                                    {getUnreadNotificationsCount() > 9 ? "9+" : getUnreadNotificationsCount()}
                                                </div>
                                            )}
                                        </DropdownMenuItem>
                                    </SheetTrigger>

                                    <SheetContent side="right" className="w-80 sm:w-96">
                                        <SheetHeader className={"flex items-center"}>
                                            <SheetTitle className="text-lg font-semibold">
                                                {t("notifications")}
                                            </SheetTitle>
                                        </SheetHeader>

                                        <div className="mt-4 p-2 space-y-2 max-h-[70vh]  overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <p className="text-sm text-gray-500 text-center mt-8">
                                                    {t("noNotifications")}
                                                </p>
                                            ) : (
                                                notifications.map((notif: ReceivedNotification) => (
                                                    notif.directLink ? (
                                                        <Link
                                                            to={notif.directLink}
                                                            key={notif.id
                                                            }
                                                            className={`p-3 block w-full rounded-lg border ${
                                                                notif.status === NotificationStatus.UNREAD ? "bg-gray-100 dark:bg-black border-gray-200 dark:border-gray-900" : "border-transparent"
                                                            } hover:bg-gray-50 dark:hover:bg-gray-900 transition`}
                                                        >
                                                            <p className="text-sm font-medium">{workspaceT(notif.title)} | {notif.inviteUserName}</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-300">{workspaceT(notif.message)}</p>
                                                            <span className={"text-white text-xs text-right block"}>{timeDifference(Date.now(), new Date(notif.createdAt))}</span>
                                                        </Link>
                                                    ) : (<div
                                                        key={notif.id
                                                        }
                                                        className={`p-3 rounded-lg border ${
                                                            notif.status === NotificationStatus.UNREAD ? "bg-gray-100 border-gray-200" : "border-transparent"
                                                        } hover:bg-gray-50 transition`}
                                                    >
                                                        <p className="text-sm font-medium">{workspaceT(notif.title)} | {notif.inviteUserName}</p>
                                                        <p className="text-xs text-gray-500">{workspaceT(notif.message)}</p>
                                                        <span className={"text-white"}>{notif.createdAt.toString()}</span>
                                                    </div>)
                                                ))
                                            )}
                                        </div>
                                    </SheetContent>
                                </Sheet>

                                <DropdownMenuItem className="cursor-pointer">
                                    <FaUser/>
                                    {t("profile")}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                                    <FaSignOutAlt/>
                                    {t("signOut")}
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
