import { useParams } from "react-router";
import WorkspaceHeader from "./components/WorkspaceHeader";
import useWorkspaceStore from "@/stores/workspace.store";

const Workspace = () => {
  const { id } = useParams();
  const { workspaces } = useWorkspaceStore();

  if (!id) {
    return <div className="p-5">Workspace not found</div>;
  }

  const workspace = workspaces.find(
    (workspace) => workspace.id === parseInt(id),
  );

  if (!workspace) {
    return <div className="p-5">Workspace not found</div>;
  }

  return (
    <div className="p-5">
      <WorkspaceHeader workspace={workspace} />
    </div>
  );
};

export default Workspace;
