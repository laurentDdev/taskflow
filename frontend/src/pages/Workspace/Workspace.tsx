import { Link, useLoaderData, useParams } from "react-router";
import WorkspaceHeader from "./components/WorkspaceHeader";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import useWorkspaceStore from "@/stores/workspace.store";

const Workspace = () => {
  const [filter, setFilter] = useState("");
  const { t } = useTranslation("workspace");
  const { workspaces } = useWorkspaceStore();
  const params = useParams();
  const workspace = workspaces.find((w) => w.id === params.id);

  if (!workspace) {
    return <div>{t("workspaceNotFound")}</div>;
  }

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
