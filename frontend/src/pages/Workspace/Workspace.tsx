import { Link, useLoaderData } from "react-router";
import WorkspaceHeader from "./components/WorkspaceHeader";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const Workspace = () => {
  const [filter, setFilter] = useState("");
  const { t } = useTranslation("workspace");

  const workspace = useLoaderData();
  if (!workspace) {
    return (
      <div className="h-screen w-full flex flex-col gap-5 justify-center items-center font-bold">
        {t("workspaceNotFound")}
        <Link to="/">
          <Button>{t("backToWorkspacesList")}</Button>
        </Link>
      </div>
    );
  }

  console.log(workspace);

  return (
    <div className="p-5">
      <WorkspaceHeader
        workspace={workspace}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

export default Workspace;
