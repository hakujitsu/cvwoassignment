// ACTION TYPES
export const INITIALISE_TODOS = 'INITIALISE_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'

export const INITIALISE_TAGS = 'INITIALISE_TAGS'
export const ADD_TAG = 'ADD_TAG'
export const DELETE_TAG = 'DELETE_TAG'
export const EDIT_TAG = 'EDIT_TAG'

// OBJECT INTERFACES
export interface ITag{
    name: string
    color: string
    id: number
    tasks: ITask[]
}

export interface ITask{
    name: string
    done: boolean
    tags: ITag[]
    id: number
}

export interface IColorDropdownOptions{
    label: string,
    value: string
}

export interface ITagDropdownOptions{
    label: string,
    value: number,
}

export interface TaskTagListState {
    tasks: ITask[]
    tags: ITag[]
    tagcolors: IColorDropdownOptions[]
    tagoptions: ITagDropdownOptions[]
}

// ACTION INTERFACES 

interface InitialiseTodosAction {
    type: typeof INITIALISE_TODOS
    todos: ITask[]
}

interface AddTodoAction {
    type: typeof ADD_TODO
    newTask: ITask
}

interface DeleteTodoAction {
    type: typeof DELETE_TODO
    id: number
}

interface EditTodoAction{
    type: typeof EDIT_TODO
    editTask: ITask
}

interface ToggleTodoAction {
    type: typeof TOGGLE_TODO
    id: number
}

interface InitialiseTagsAction {
    type: typeof INITIALISE_TAGS
    tags: ITag[]
}

interface AddTagAction {
    type: typeof ADD_TAG
    newTag: ITag
}

interface DeleteTagAction {
    type: typeof DELETE_TAG
    name: string
    id: number
}

interface EditTagAction{
    type: typeof EDIT_TAG
    editedTag: ITag
}

// ACTION EXPORTS
export type TaskActionTypes = InitialiseTodosAction | AddTodoAction | ToggleTodoAction | DeleteTodoAction | EditTodoAction
export type TagActionTypes = InitialiseTagsAction | AddTagAction | DeleteTagAction | EditTagAction