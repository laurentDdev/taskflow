import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type {AuthUser} from "@/types/AuthUser";
import {WorkspaceRole, type Workspace} from "@/types/Workspace";
import * as React from "react";
import {Link} from "react-router";
import {FaCrown} from "react-icons/fa";


interface WorkspaceCardProps {
    workspace: Workspace;
    user: AuthUser;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({workspace, user}) => {
    console.log("WorkspaceCard", workspace, "user", user);

    const isOwner =
        workspace.WorkspaceMember.find((member) => member.userId === user.id)
            ?.role === WorkspaceRole.OWNER;

    return (
        <Link
            to={`/workspace/${workspace.id}`}
            className="w-full transition-transform hover:scale-[102%] ease-in-out duration-300 cursor-pointer"
        >
            <Card
                className={`w-full gap-2 relative`}
            >
                {
                    isOwner && (
                        <span className={"absolute top-[-15px] right-3"}>
          <FaCrown className={"dark:text-black text-white"}/>
        </span>
                    )
                }
                <CardHeader>
                    <CardTitle className="text-sm">{workspace.name}</CardTitle>
                    <CardDescription className="text-xs">
                        {workspace.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <p className="text-[var(--secondary-text)] text-xs">
                            {workspace.WorkspaceMember.length} membre{" "}
                            {workspace.WorkspaceMember.length > 1 ? "s" : ""}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default WorkspaceCard;
