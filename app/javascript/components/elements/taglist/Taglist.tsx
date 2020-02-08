import * as React from 'react';
import * as PropTypes from 'prop-types'
import { ITag, IColorDropdownOptions } from '../../redux/types'
import Tag from './Tag'
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
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
    classes:any
    tags: ITag[]
    tagcolors: IColorDropdownOptions[]
    initialiseTags: (tags:ITag[]) => void
    addTag: (tag:ITag) => void
    deleteTag: (id:number, name:string) => void
    editTag: (editTag:ITag) => void
}

type State = {
    tags: ITag[],
    openAddDialog: boolean,
    newTagName: string,
    newTagColor: string
}

class Taglist extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.handleAddTagSubmit = this.handleAddTagSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.state = {
            tags: [],
            openAddDialog: false,
            newTagName: "",
            newTagColor: ""
        };
    }

    // Load all tags
    componentDidMount() {
        fetch('/api/v1/tags.json')
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ tags: data }) });
    }

    // OPEN/CLOSE MODAL
    handleClickOpen = () => {
        this.setState({openAddDialog: true});
    };

    handleClose = () => {
        this.setState({openAddDialog: false});
    };

    // UPDATE REDUX STORE
    updateStore() {
        fetch('/api/v1/tags.json')
            .then((response) => { return response.json() })
            .then((data) => { this.props.addTag(data[data.length - 1])});
    }

    // ADD TAG
    handleTextFieldChange(e:string){
        this.setState({ newTagName: e });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({newTagColor: event.target.value as string});
    };

    handleAddTagSubmit(){
        this.handleAddTag(this.state.newTagName, this.state.newTagColor);
        this.handleClose();
    }

    handleAddTag(name:string, color:string){
        let body = JSON.stringify({tag: {name: name, color:color} })
            fetch('/api/v1/tags.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((response) => {
            return response.json()
        })
        .then((tag)=> {
          this.updateStore();
        })   
    }

    // DELETE TAG
    handleDelete(id:number, name:string){
        fetch(`/api/v1/tags/${id}`, 
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => { 
            this.props.deleteTag(id, name);
        })
    }


    // EDIT TAG
    handleEdit(tag:ITag){
        fetch(`/api/v1/tags/${tag.id}`, 
        {
          method: 'PUT',
          body: JSON.stringify({tag: tag}),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => { 
            this.props.editTag(tag);
        })
    }

    // RENDERED COMPONENTS
    render() {
        var tags = this.props.tags.map((tag) => {
            return (
                <React.Fragment key={tag.id}>
                    <Tag tag={tag} tagcolors={this.props.tagcolors} handleDelete={this.handleDelete} handleEdit={this.handleEdit}/>
                </React.Fragment>
            )
        })
            
        const { classes } = this.props;

        return (
            <div className="main">
                <div className="taskheader">Tag List</div>

                <div className="tasklist">

                    {tags}

                    {/* ADD DIALOG */}
                    <Button className={classes.root}
                    color="primary" size="small" onClick={this.handleClickOpen}>
                        Add Tag
                    </Button>

                    <Dialog
                        open={this.state.openAddDialog}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Add Tag</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Tag Name"
                                type="string"
                                helperText="Name must be between 1 and 20 characters."
                                fullWidth
                                onChange={(e) => this.handleTextFieldChange(e.target.value)}
                            />

                            <TextField
                                id="standard-select-currency"
                                fullWidth
                                select
                                label="Select"
                                value={this.state.newTagColor}
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
                            <Button onClick={this.handleAddTagSubmit} color="primary"
                            disabled={this.state.newTagName.length <= 0 || this.state.newTagName.length > 20 || this.state.newTagColor == ""}>
                                Confirm
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default withStyles(useStyles)(Taglist)
