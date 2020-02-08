import * as React from 'react';
import * as PropTypes from 'prop-types'
import { ITask, ITag, ITagDropdownOptions } from '../../redux/types'
import Task from './Task'
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';


import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";


import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = (theme:Theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
      },
      selectEmpty: {
        marginTop: theme.spacing(2)
    }
});

type Props = {
    displayedTasks: ITask[]
    tags: ITag[]
    tagoptions: ITagDropdownOptions[]
    initialiseTodos: (todos:ITask[]) => void
    addTask: (task:ITask) => void
    deleteTask: (id:number) => void
    editTask:(editTask:ITask) => void
    toggleTask: (id:number) => void
    classes: any
}

type State = {
    openAddDialog: boolean
    newTaskName: string
    newTaskTags: number[]
}

class Tasklist extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.handleAddTaskSubmit = this.handleAddTaskSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {
            openAddDialog: false,
            newTaskName: "",
            newTaskTags:[],
        };
    }
    
    // Load all tasks
    componentDidMount() {
        // fetch('/api/v1/tasks.json')
        //     .then((response) => { return response.json() })
        //     .then((data) => { this.setState({ tasks: data }) });
    }

    // OPEN/CLOSE MODAL FUNCTIONS
    handleClickOpen = () => {
        this.setState({openAddDialog: true});
        this.setState({newTaskTags: []});
    };

    handleClose = () => {
        this.setState({openAddDialog: false});
    };

    // UPDATE REDUX STORE
    // RETRIEVE ONLY LAST OBJECT?
    updateStore() {
        fetch('/api/v1/tasks.json')
            .then((response) => { return response.json() })
            .then((data) => {
                this.props.addTask(data[data.length - 1])
            });
    }

    // ADD TASK FUNCTIONS

    handleTextFieldChange(e:string){
        this.setState({ newTaskName: e });
    }

    handleTagDisplay(selected:number[]){
        let tagdisplay:string[] = [];
        selected.forEach(
            id => tagdisplay.push(this.props.tagoptions.find(tag => tag.value == id)!.label)      
        )
        return tagdisplay;
    }

    handleChange(e:any){
        this.setState({newTaskTags: e});
    }

    handleAddTaskSubmit(){
        this.handleAddTask(this.state.newTaskName, this.state.newTaskTags);
        this.handleClose();
    }

    handleAddTask(name:string, tags:number[]){
        let body = JSON.stringify({ task: { name: name, done: false, tag_ids: tags } })
        fetch('/api/v1/tasks.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((response) => {
            return response.json()
        }).then(() => this.updateStore());        
    }

    // DELETE TASK FUNCTION

    handleDelete(id:number){
        fetch(`/api/v1/tasks/${id}`, 
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => { 
            this.props.deleteTask(id);
        })
    }

    // EDIT TASK FUNCTIONS

    handleEditTask(task:ITask, tag_ids:number[]){
        let tags:ITag[] = [];

        if(tag_ids.length > 0){
            tag_ids.forEach(
                id => tags.push(this.props.tags.find(tag => tag.id == id)!)
            )
        }

        let storeTask = Object.assign({}, task)
        storeTask.tags = tags
        
        fetch(`/api/v1/tasks/${task.id}`, 
        {
          method: 'PUT',
          body: JSON.stringify({task: {name: task.name, id: task.id, done: task.done, tag_ids: tag_ids}}),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => { 
            this.props.editTask(storeTask);
        })
    }

    // TOGGLE TASK
    handleToggle(task:ITask){
        fetch(`/api/v1/tasks/${task.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({task: task}),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => { 
            this.props.toggleTask(task.id);
        })
    }

    // RENDERED COMPONENTS
    render() {
        var tasks = this.props.displayedTasks.map((task) => {
            return (
                <React.Fragment key={task.id}>
                    <Task task={task} tagoptions={this.props.tagoptions} handleDelete={this.handleDelete} 
                    handleEditTask={this.handleEditTask} handleToggle={this.handleToggle}/>
                </React.Fragment>
            )
        })

        const { classes } = this.props;

        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };

        return (            
            <div className="tasklist">

                {tasks}

                {/* ADD DIALOG */}
                <Button
                    // className={classes.root}
                    color="primary" size="small" onClick={this.handleClickOpen}>
                    Add Task
                    </Button>

                <Dialog
                    open={this.state.openAddDialog}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth="md"
                >
                    <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Task Name"
                            type="string"
                            helperText="Name must be between 1 and 100 characters."
                            fullWidth
                            onChange={(e) => this.handleTextFieldChange(e.target.value)}
                        />

                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="demo-mutiple-checkbox-label">Tags</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={this.state.newTaskTags}
                                onChange={e => this.handleChange(e.target.value)}
                                input={<Input />}
                                renderValue={selected => (this.handleTagDisplay(selected as number[])).join(', ')}
                                MenuProps={MenuProps}
                            >
                                {this.props.tagoptions.map(tag => (
                                    <MenuItem key={tag.value} value={tag.value}>
                                        <Checkbox 
                                        checked={this.state.newTaskTags.find(t => t == tag.value) != undefined} />
                                        <ListItemText primary={tag.label} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAddTaskSubmit} color="primary" 
                        disabled={this.state.newTaskName.length <= 0 || this.state.newTaskName.length > 100}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}

export default withStyles(useStyles)(Tasklist)
