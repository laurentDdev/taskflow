// src/stores/useCreateWorkspace.ts (ou fichier similaire)

import { useMutation, useQueryCache } from "@pinia/colada";
import WorkspaceApi from "../apis/workspace.api.ts";
import type { Workspace } from "../types/workspace";

type CreateWorkspaceVariables = {
    name: string;
    description: string;
};

type CreateWorkspaceResult = Workspace;


export const useCreateWorkspace = () => {
    const queryCache = useQueryCache();

    return useMutation<
        CreateWorkspaceResult,
        CreateWorkspaceVariables
    >({
        mutation: async ({ name, description }) => {
            return await WorkspaceApi.create(name, description);
        },
        onSuccess: () => {
            queryCache.invalidateQueries({ key: ['workspaces'] });
        },
    });
};