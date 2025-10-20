import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Workspace } from "@/types/Workspace";
import * as React from "react";

interface WorkspaceCardProps {
  workspace: Workspace;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace }) => {
  return (
    <Card className="transition-transform hover:scale-[102%] ease-in-out duration-300 cursor-pointer">
      <CardHeader>
        <CardTitle className="text-sm">{workspace.name}</CardTitle>
        <CardDescription className="text-xs">
          {workspace.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default WorkspaceCard;
