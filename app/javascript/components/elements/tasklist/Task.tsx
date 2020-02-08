import * as React from 'react';
import * as PropTypes from 'prop-types'
import { ITask, ITagDropdownOptions } from '../../redux/types'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Chip from '@material-ui/core/Chip';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from "@material-ui/core/MenuItem";


import { Theme } from '@material-ui/core';
import clsx from 'clsx';


const useStyles = (theme:Theme) => ({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: 3,
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
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
    classes: any
    task: ITask
    tagoptions: ITagDropdownOptions[]
    handleDelete: (id:number) => void
    handleEditTask: (task:ITask, tag_ids:number[]) => void
    handleToggle: (task:ITask) => void    
}

type State = {
    openDeleteDialog: boolean
    openEditDialog: boolean,
    editTaskName: string
    editTaskTags: number[] 
}

class Task extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.handleDeleteTask = this.handleDeleteTask.bind(this)
        this.handleEdit = this.handleEdit.bind(this);
        this.handleToggleTask = this.handleToggleTask.bind(this);
        this.state = {
            openDeleteDialog: false,
            openEditDialog: false,
            editTaskName: "", 
            editTaskTags: [] 
        };
    }

    handleClose = () => {
        this.setState({openEditDialog: false});
        this.setState({openDeleteDialog: false});
    };


    // EDIT DIALOG

    handleClickOpenEditDialog = () => {
        this.setState({openEditDialog: true});
        this.setState({ editTaskName: this.props.task.name});
        let tasktags:number[] = [];
        this.props.task.tags.forEach(
            tag => tasktags.push(tag.id)
        )
        this.setState({ editTaskTags: tasktags});
    };

    handleTextFieldChange(e:string){
        this.setState({ editTaskName: e });
    }

    handleTagDisplay(selected:number[]){
        let tagdisplay:string[] = [];
        selected.forEach(
            id => tagdisplay.push(this.props.tagoptions.find(tag => tag.value == id)!.label)      
        )
        return tagdisplay;
    }

    handleChange(e:any){
        this.setState({editTaskTags: e});
    }

    handleEdit(){   
        let name = this.state.editTaskName
        let id = this.props.task.id
        let done = this.props.task.done
        let tag_ids = this.state.editTaskTags
        let task = {id: id, name: name, done: done, tags: []}
        this.props.handleEditTask(task, tag_ids)
        this.handleClose();
    }

    // DELETE DIALOG

    handleClickOpenDeleteDialog = () => {
        this.setState({openDeleteDialog: true});
    };

    handleDeleteTask(){
        this.props.handleDelete(this.props.task.id);
        this.handleClose();
    }

    // TOGGLE TASK

    handleToggleTask(){
        let task = {id: this.props.task.id, 
            name: this.props.task.name, 
                        done: !this.props.task.done, 
                        tags: []}
        this.props.handleToggle(task);
    }


    render () {
        let tags = this.props.task.tags.map((tag) => {
            return (
                <React.Fragment key={tag.id}>
                    <Chip variant="outlined" size="small" label={tag.name} />
                </React.Fragment>
            )
        });

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
            <React.Fragment>
                <div className="task" key={this.props.task.id}>
                    <Checkbox
                        className={classes.root}
                        disableRipple
                        color="default"
                        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                        icon={<span className={classes.icon} />}
                        inputProps={{ 'aria-label': 'decorative checkbox' }}
                        size="small"
                        checked={this.props.task.done}
                        onChange={this.handleToggleTask}
                    // {...this.props}
                    />
                    <span className="taskname">{this.props.task.name}</span>

                    <DeleteIcon className="delete" color="disabled" onClick={this.handleClickOpenDeleteDialog} />

                    <EditIcon className="edit" color="disabled" onClick={this.handleClickOpenEditDialog} />   
                        
                    
                    
                    <div className="tag"> {tags} </div>
                    <hr />

                </div>


                {/* EDIT DIALOG */}
                <Dialog
                    open={this.state.openEditDialog}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth="md"
                >
                    <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Task Name"
                            type="string"
                            helperText="Name must be between 1 and 100 characters."
                            fullWidth
                            defaultValue={this.props.task.name}
                            onChange={(e) => this.handleTextFieldChange(e.target.value)}
                        />

                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="demo-mutiple-checkbox-label">Tags</InputLabel>
                            <Select
                                labelId="demo-mutiple-checkbox-label"
                                id="demo-mutiple-checkbox"
                                multiple
                                value={this.state.editTaskTags}
                                onChange={e => this.handleChange(e.target.value)}
                                input={<Input />}
                                renderValue={selected => (this.handleTagDisplay(selected as number[])).join(', ')}
                                MenuProps={MenuProps}
                            >
                                {this.props.tagoptions.map(tag => (
                                    <MenuItem key={tag.value} value={tag.value}>
                                        <Checkbox checked={
                                            this.state.editTaskTags.find(t => t == tag.value) != undefined} />
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
                        <Button onClick={this.handleEdit} color="primary" 
                        disabled={this.state.editTaskName.length <= 0 || this.state.editTaskName.length > 100}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>


                {/* DELETE DIALOG */}
                <Dialog open={this.state.openDeleteDialog} onClose={this.handleClose} aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">

                    <DialogTitle id="alert-dialog-title">Delete Task</DialogTitle>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this task?
                          </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDeleteTask} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>

        );
    }
}

export default withStyles(useStyles)(Task)
