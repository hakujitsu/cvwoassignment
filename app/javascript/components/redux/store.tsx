import { connect } from 'react-redux'
import { TaskTagListState } from './types'
import App from '../App'
import Tasklist from '../elements/tasklist/Tasklist'
import Taglist from '../elements/taglist/Taglist'
import { initialiseTodos, addTodo, deleteTodo, editTodo, toggleTodo, initialiseTags, addTag, editTag, deleteTag } from './actions';

const mapStateToProps = (state: {taskReducer: TaskTagListState}) =>  ({
    tasks: state.taskReducer.tasks,
    tags: state.taskReducer.tags,
    tagcolors: state.taskReducer.tagcolors,
    tagoptions: state.taskReducer.tagoptions
})

const mapDispatchToProps = {
    initialiseTodos: initialiseTodos,
    addTask: addTodo,
    deleteTask: deleteTodo,
    editTask: editTodo,
    toggleTask: toggleTodo,
    initialiseTags: initialiseTags,
    addTag: addTag,
    editTag: editTag,
    deleteTag: deleteTag
}

export const AppConnector = connect(mapStateToProps, mapDispatchToProps)(App)
export const TasklistConnector = connect(mapStateToProps, mapDispatchToProps)(Tasklist)
export const TaglistConnector = connect(mapStateToProps, mapDispatchToProps)(Taglist)