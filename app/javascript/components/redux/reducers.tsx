import { combineReducers } from 'redux';
import {
    TaskTagListState,
    TaskActionTypes,
    TagActionTypes,
    INITIALISE_TODOS,
    ADD_TODO,
    EDIT_TODO,
    DELETE_TODO,
    TOGGLE_TODO,
    INITIALISE_TAGS,
    ADD_TAG,
    DELETE_TAG,
    EDIT_TAG, 
    ITagDropdownOptions
} from './types'


//INITIAL STATE
const initialState:TaskTagListState = {
    tasks: [],
    tags: [],
    tagcolors: [
        {
            label: "Red",
            value: "#DC9393"
        },
        {
            label: "Pink",
            value: "#FFCECE"
        },
        {
            label: "Purple",
            value: "#E0B9F5"
        },
        {
            label: "Yellow",
            value: "#ECED9D"
        },
        {
            label: "Green",
            value: "#A8D8A5"
        },
        {
            label: "Blue",
            value: "#93D1DC"
        }, 
    ],
    tagoptions:[]
}

//HANDLES ACTIONS MADE TO STATE, RETURNS STATE
export function taskReducer(state = initialState, action: TaskActionTypes | TagActionTypes)
    : TaskTagListState {
        switch(action.type){
            case INITIALISE_TODOS:
                return Object.assign({}, state, {
                    tasks: action.todos,
                })
            case ADD_TODO:
                return Object.assign({}, state, {
                    tasks: [
                        ...state.tasks,
                        action.newTask
                    ]
                })
            case DELETE_TODO:
                return Object.assign({}, state, {
                    tasks: state.tasks.filter(task => task.id !== action.id)   
                })
            case EDIT_TODO:                
                return Object.assign({}, state, {
                    tasks: state.tasks.map((task) => {
                        if (task.id === action.editTask.id) {
                            return Object.assign({}, task, {
                                name: action.editTask.name,
                                done: action.editTask.done,
                                tags: action.editTask.tags
                            })
                        }
                        return task;
                    })
                })
            case TOGGLE_TODO:
                return Object.assign({}, state, {
                    tasks: state.tasks.map((task) => {
                        if (task.id === action.id) {
                            return Object.assign({}, task, {
                                done: !task.done
                            })
                        }
                        return task;
                    })
                })
            case INITIALISE_TAGS:
                let options:ITagDropdownOptions[] = [];
                action.tags.forEach( (tag) => options.push({ label: tag.name, value: tag.id }) )
                return Object.assign({}, state, {
                    tags: action.tags,
                    tagoptions: options
                })
            case ADD_TAG:
                return Object.assign({}, state, {
                    tags: [
                        ...state.tags,
                        action.newTag
                    ],
                    tagoptions: [
                        ...state.tagoptions,
                        {
                            label: action.newTag.name, 
                            value: action.newTag.id
                        }
                    ]
                })
            case DELETE_TAG:
                return Object.assign({}, state, {
                    tasks: state.tasks.map( task => {
                        return Object.assign({}, task, {
                            tags: task.tags.filter(tag => tag.name !== action.name)
                        })
                    }),
                    tags: state.tags.filter(tag => tag.id !== action.id),   
                    tagoptions: state.tagoptions.filter(tagoption => tagoption.value !== action.id)
                })
            case EDIT_TAG:
                return Object.assign({}, state, {
                    tasks: state.tasks.map((task) => {
                        if (task.tags !== undefined) {
                            task.tags.map(
                                tag => {
                                    if (tag.id === action.editedTag.id) {
                                        tag.name = action.editedTag.name
                                        tag.color = action.editedTag.color
                                    }
                                }
                            )
                        }
                        return task;
                    }),
                    tags: state.tags.map((tag) => {
                        if (tag.id === action.editedTag.id) {
                            return Object.assign({}, tag, {
                                name: action.editedTag.name,
                                color: action.editedTag.color,
                            })
                        }
                        return tag;
                    }),
                    tagoptions: state.tagoptions.map((tagoption) => {
                        if (tagoption.value === action.editedTag.id) {
                            return Object.assign({}, tagoption, {
                                label: action.editedTag.name,
                            })
                        }
                        return tagoption;
                    })
                })
            default:
                return state;
        }
}

const TaskList = combineReducers({
    taskReducer
})

export default TaskList