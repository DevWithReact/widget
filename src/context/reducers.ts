import { StateType, DataStateType } from './initialState'

export enum CollectedActionsType {
    AddField = 'ADD_FIELD',
    AddFile = 'ADD_FILE',
    DeleteFile = 'DELETE_FILE'
}

export enum DataActionsType {
    AddData = 'ADD_DATA',
    Init = 'INIT'
}

export type DataActions = {
    type: CollectedActionsType.AddField;
    payload: {
        name: string
        value: number | string
    };
} | {
    type: CollectedActionsType.AddFile;
    payload: {
        name: string
        value: File[]
    };
} | {
    type: CollectedActionsType.DeleteFile;
    payload: {
        name: string
        value: string
    };
} | {
    type: DataActionsType.AddData;
    payload: {
        value: DataStateType
    };
}

export const mainReducer = (state: StateType, action: DataActions) => ({
    ...state,
    collected: collectedReducer(state, action),
    data: dataReducer(state, action)
});

export const collectedReducer = (state: StateType, action: DataActions) => {
    switch (action.type) {
        case CollectedActionsType.AddField:
            return {
                ...state.collected,
                [action.payload.name]: action.payload.value
            }
        case CollectedActionsType.AddFile:
            let newFiles = action.payload.value
            if (newFiles && newFiles.length > 0) {
                const existingFiles = (state.collected[action.payload.name] as File[]).map(f => f.name)
                newFiles = newFiles.filter(f => !existingFiles.includes(f.name))
            }
            return {
                ...state.collected,
                [action.payload.name]: [...state.collected[action.payload.name], ...newFiles]
            }
        case CollectedActionsType.DeleteFile:
            let name2delete = action.payload.value
            const newList = (state.collected[action.payload.name] as File[]).filter(f => f.name !== name2delete)
            return {
                ...state.collected,
                [action.payload.name]: [...newList]
            }
        default:
            return state.collected
    }
}

export const dataReducer = (state: StateType, action: DataActions) => {
    switch (action.type) {
        case DataActionsType.AddData:
            return {
                ...state.data,
                ...action.payload.value
            }
        default:
            return state.data
    }
}