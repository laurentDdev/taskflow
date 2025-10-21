import useWorkspaceStore from "@/stores/workspace.store";
import WorkspaceCard from "./WorkspaceCard";

interface HomeContentProps {
  filter: string;
}

const HomeContent = ({ filter }: HomeContentProps) => {
  const { workspaces } = useWorkspaceStore();

  return (
    <div className="flex-1">
      <div className="grid grid-rows-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 h-[60%] gap-4 p-5">
        {workspaces
          .filter((workspace) =>
            workspace.name.toLowerCase().startsWith(filter.toLowerCase()),
          )
          .map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
      </div>
      <div className="grod grid-cols-5 grid-rows-2 h-[40%]"></div>
    </div>
  );
};

export default HomeContent;
