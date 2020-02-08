import * as React from 'react';
import * as PropTypes from 'prop-types'
import { ITag, IColorDropdownOptions } from '../../redux/types'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = (theme:Theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: 200
        }
    },    
});

type Props = {
    classes: any
    tag: ITag
    tagcolors: IColorDropdownOptions[]
    handleDelete: (id:number, name:string) => void
    handleEdit: (tag:ITag) => void
}

type State = {
    openDeleteDialog: boolean
    openEditDialog: boolean,
    editTagName: string,
    editTagColor: string
}

class Tag extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.handleDeleteTask = this.handleDeleteTask.bind(this)
        this.handleEdit = this.handleEdit.bind(this);
        this.state = {
            openDeleteDialog: false,
            openEditDialog: false,
            editTagName: "",
            editTagColor: ""
            
        };
    }

    handleClose = () => {
        this.setState({openEditDialog: false});
        this.setState({openDeleteDialog: false});
    };

    // EDIT DIALOG

    handleClickOpenEditDialog = () => {
        this.setState({openEditDialog: true});
        this.setState({ editTagName: this.props.tag.name});
        this.setState({ editTagColor: this.props.tag.color});
    };

    handleTextFieldChange(e:string){
        this.setState({ editTagName: e });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({editTagColor: event.target.value as string});
    };

    handleEdit(){   
        let name = this.state.editTagName
        let id = this.props.tag.id
        let color = this.state.editTagColor
        let tag = {id: id, name: name, color: color, tasks: []}
        this.props.handleEdit(tag);
        this.handleClose();
    }

    // DELETE DIALOG

    handleClickOpenDeleteDialog = () => {
        this.setState({openDeleteDialog: true});
    };

    handleDeleteTask(){
        this.props.handleDelete(this.props.tag.id, this.props.tag.name);
        this.handleClose();
    }


    render () {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div className = "task" key={this.props.tag.id}>
                    <div className="circle" style={{backgroundColor: this.props.tag.color}}></div>
                    <span className = "taskname">{this.props.tag.name}</span>
                    <DeleteIcon className="delete" color="disabled" onClick={this.handleClickOpenDeleteDialog}/>
                    <EditIcon className="edit" color="disabled" onClick={this.handleClickOpenEditDialog}/>
                    <hr/>

                </div>


                {/* EDIT DIALOG */}
                    <Dialog
                        open={this.state.openEditDialog}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Edit Tag</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Task Name"
                                type="string"
                                helperText="Name must be between 1 and 20 characters."
                                fullWidth
                                defaultValue={this.props.tag.name}
                                onChange={(e) => this.handleTextFieldChange(e.target.value)}
                            />
                            <TextField
                                id="standard-select-currency"
                                fullWidth
                                select
                                label="Select"
                                value={this.state.editTagColor}
                                onChange={this.handleChange}
                            >
                                {this.props.tagcolors.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                        </Button>
                            <Button onClick={this.handleEdit} color="primary"
                            disabled={this.state.editTagName.length <= 0 || this.state.editTagName.length > 20 
                            || this.state.editTagColor == ""}>
                                Confirm
                        </Button>
                        </DialogActions>
                    </Dialog>


                {/* DELETE DIALOG */}

                <Dialog open={this.state.openDeleteDialog} onClose={this.handleClose} aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    
                    <DialogTitle id="alert-dialog-title">Delete Tag</DialogTitle>
        
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this tag?
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

export default withStyles(useStyles)(Tag)
