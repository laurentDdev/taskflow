import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Workspace } from "@/types/Workspace";
import { Link } from "react-router";
import * as React from "react";
import { FaFolder } from "react-icons/fa";

interface WorkspaceListNavigationProps {
  workspaces: Workspace[];
}

const WorkspaceListNavigation: React.FC<WorkspaceListNavigationProps> = ({
  workspaces,
}) => {
  return (
    <div className="h-full flex flex-col gap-2 w-full">
      {workspaces.map((workspace) => (
        <Link
          to={`/workspace/${workspace.id}`}
          key={workspace.id}
          className="flex items-center gap-2 transition-transform hover:bg-gray-500/20 duration-500 hover:scale-[101%] rounded-sm border cursor-pointer border-stone-900"
        >
          <div className="flex w-full items-center gap-2 p-2 ">
            {workspace.logo ? (
              <Avatar className="mr-2">
                <AvatarImage src={workspace.logo} />
                <AvatarFallback>{workspace.name[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <FaFolder />
            )}
            {workspace.name.toLowerCase()}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default WorkspaceListNavigation;
