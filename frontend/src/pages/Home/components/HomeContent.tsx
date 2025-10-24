import useWorkspaceStore from "@/stores/workspace.store";
import WorkspaceCard from "./WorkspaceCard";
import type {AuthUser} from "@/types/AuthUser.ts";

interface HomeContentProps {
    filter: string;
    user: AuthUser
}

const HomeContent = ({filter, user}: HomeContentProps) => {
    const {workspaces} = useWorkspaceStore();

    return (
        <div className={"flex-1"}>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-max
h-[60%] gap-4 p-5 bg-blue-500 overflow-y-auto">
                {workspaces
                    .filter((workspace) =>
                        workspace.name.toLowerCase().startsWith(filter.toLowerCase()),
                    )
                    .map((workspace) => (
                        <WorkspaceCard key={workspace.id} workspace={workspace} user={user}/>
                    ))}
            </div>
            <div className="grod grid-cols-5 grid-rows-2 h-[40%] bg-yellow-400"></div>
        </div>
    );
};

export default HomeContent;
