import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaPlus, FaSearch } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import type { Workspace } from "@/types/Workspace";
import { Button } from "@/components/ui/button";
import useWorkspaceStore, {
  WorkspaceNavigation,
} from "@/stores/workspace.store";
import { Controller, useForm } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import WorkspaceInviteMember from "./WorkspaceInviteMember";

interface WorkspaceHeaderProps {
  workspace: Workspace;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const WorkspaceHeader = ({
  workspace,
  filter,
  setFilter,
}: WorkspaceHeaderProps) => {
  const { t } = useTranslation("workspace");

  const { workspaceNavigation, setWorkspaceNavigation } = useWorkspaceStore();

  const form = useForm({
    defaultValues: {
      filter,
    },
  });

  const handleChangeWorkspaceNavigation = (e: MouseEvent, value: string) => {
    e.preventDefault();
    setWorkspaceNavigation(value);
  };

  return (
    <header className="grid grid-rows-2 gap-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Link
            to={"/"}
            className="flex items-center gap-2 transition-transform"
          >
            <Button>
              <FaArrowLeft />
              <p>{t("back")}</p>
            </Button>
          </Link>
          # {workspace.name}
        </div>
        <div className="flex gap-2">
          <WorkspaceInviteMember>
            <Button>
              <FaPlus />
              {t("addMemberButton")}
            </Button>
          </WorkspaceInviteMember>
          <Button>
            <IoMdSettings />
            {t("settingsButton")}
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <nav>
          <ul className="flex items-center gap-2">
            {[
              {
                value: WorkspaceNavigation.Boards,
                label: t("navigations.boards"),
                to: `/workspace/${workspace.id}/boards`,
              },
              {
                value: WorkspaceNavigation.Members,
                label: t("navigations.members"),
                to: `/workspace/${workspace.id}/members`,
              },
              {
                value: WorkspaceNavigation.Settings,
                label: t("navigations.settings"),
                to: `/workspace/${workspace.id}/settings`,
              },
            ].map((item) => (
              <li key={item.value}>
                <Link
                  to={item.to}
                  onClick={(e) =>
                    handleChangeWorkspaceNavigation(e, item.value)
                  }
                  className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    workspaceNavigation === item.value
                      ? "bg-gray-600 text-white font-bold"
                      : "text-blue-100 hover:bg-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <form className="flex-1">
          <Controller
            name="filter"
            control={form.control}
            render={({ field }) => (
              <InputGroup>
                <InputGroupInput
                  {...field}
                  placeholder={t("navigations.search")}
                />
                <InputGroupAddon align={"inline-end"}>
                  <FaSearch />
                </InputGroupAddon>
              </InputGroup>
            )}
          />
        </form>
        <Button>
          <FaPlus />
          {t("navigations.newBoard")}
        </Button>
      </div>
    </header>
  );
};

export default WorkspaceHeader;
