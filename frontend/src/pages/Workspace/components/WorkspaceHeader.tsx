import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import type { Workspace } from "@/types/Workspace";
import { Button } from "@/components/ui/button";

interface WorkspaceHeaderProps {
  workspace: Workspace;
}

const WorkspaceHeader = ({ workspace }: WorkspaceHeaderProps) => {
  const { t } = useTranslation("workspace");

  return (
    <header className="grid grid-rows-2 gap-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Button>
            <Link
              to={"/workspace"}
              className="flex items-center gap-2 transition-transform"
            >
              <FaArrowLeft />
              <p>{t("back")}</p>
            </Link>
          </Button>
          # {workspace.name}
        </div>
        <div className="flex gap-2">
          <Button>
            <FaPlus />
            {t("addMemberButton")}
          </Button>
          <Button>
            <IoMdSettings />
            {t("settingsButton")}
          </Button>
        </div>
      </div>
      <div className="bg-blue-500"></div>
    </header>
  );
};

export default WorkspaceHeader;
