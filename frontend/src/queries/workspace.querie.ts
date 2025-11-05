import {useQuery} from "@pinia/colada";
import workspaceApi from "../apis/workspace.api.ts";


export const useWorkspacesQuery = () => {
    return useQuery({
        key: ['workspaces'],
        query: () => workspaceApi.findAll()
    })
}