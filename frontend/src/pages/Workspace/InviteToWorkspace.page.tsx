import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router";
import workspaceApi from "@/apis/workspace.api.ts";
import useWorkspaceStore from "@/stores/workspace.store.ts";
import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button.tsx";

const InviteToWorkspacePage = () => {

    const params = useParams()
    const inviteCode = params.inviteCode;
    const {addWorkspace} = useWorkspaceStore()
    const navigate = useNavigate()
    const [error, setError] = React.useState<string | null>(null);
    const {t} = useTranslation('invitation');

    useEffect(() => {
        if (inviteCode) {
            workspaceApi.joinWorkspaceWithInviteLink(inviteCode).then((workspace) => {
                addWorkspace(workspace);
                navigate(`/workspace/${workspace.id}`);

            }).catch((err) => {
                setError(t(err.message));
            })
        }
    }, [inviteCode]);

    return (
        <div className={"h-screen w-screen flex flex-col items-center justify-center gap-2"}>
            {error && t(error)}
            <Button><Link to={'/'}>{t('workspace.invite.backToHome')}</Link></Button>
        </div>
    );
};

export default InviteToWorkspacePage;