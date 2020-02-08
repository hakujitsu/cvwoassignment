import { 
    ITask,
    ITag,
    TaskActionTypes,
    TagActionTypes,
    INITIALISE_TODOS,
    ADD_TODO, 
    DELETE_TODO,
    EDIT_TODO,
    TOGGLE_TODO, 
    INITIALISE_TAGS,
    ADD_TAG,
    DELETE_TAG,
    EDIT_TAG 
} from './types'



// TASK ACTION CREATORS
export function initialiseTodos(todos: ITask[]): TaskActionTypes {
  return {
    type: INITIALISE_TODOS,
    todos: todos,
  }
}

export function addTodo(newTask: ITask): TaskActionTypes {
  return {
    type: ADD_TODO,
    newTask: newTask
  }
}
export function deleteTodo(index: number): TaskActionTypes {
  return {
    type: DELETE_TODO,
    id: index
  }
}

export function editTodo(editTask: ITask): TaskActionTypes {
  return {
    type: EDIT_TODO,
    editTask: editTask
  }
}

export function toggleTodo(index: number): TaskActionTypes {
  return {
    type: TOGGLE_TODO,
    id: index
  }
}

// TAG ACTION CREATORS

export function initialiseTags(tags: ITag[]): TagActionTypes {
  return {
    type: INITIALISE_TAGS,
    tags: tags,
  }
}

export function addTag(newTag: ITag): TagActionTypes {
  return {
    type: ADD_TAG,
    newTag: newTag
  }
}
export function deleteTag(index: number, name: string): TagActionTypes {
  return {
    type: DELETE_TAG,
    id: index,
    name: name
  }
}

export function editTag(editedTag: ITag): TagActionTypes {
  return {
    type: EDIT_TAG,
    editedTag: editedTag
  }
}