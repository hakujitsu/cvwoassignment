import * as React from 'react';
import * as PropTypes from 'prop-types'
import { ITask } from '../../redux/types'
import { TasklistConnector } from '../../redux/store'

type Props = {
    tagname: string
    taggedTasks: ITask[]
}

type State = {
}

class TaggedTasklist extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
        
    }
    

    // RENDERED COMPONENTS
    render() {
        
        return (
            <div className="main">
                <div className="taskheader">{this.props.tagname}</div>
                    <TasklistConnector displayedTasks={this.props.taggedTasks}/>
                
            </div>
        );
    }
}

export default TaggedTasklist
