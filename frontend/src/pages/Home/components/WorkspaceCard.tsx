import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Workspace } from "@/types/Workspace";
import * as React from "react";
import { Link } from "react-router";

interface WorkspaceCardProps {
  workspace: Workspace;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace }) => {
  return (
    <Link
      to={`/workspace/${workspace.id}`}
      className="w-full h-full transition-transform hover:scale-[102%] ease-in-out duration-300 cursor-pointer"
    >
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="text-sm">{workspace.name}</CardTitle>
          <CardDescription className="text-xs">
            {workspace.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default WorkspaceCard;
