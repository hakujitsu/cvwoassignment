import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TasklistConnector } from '../../redux/store'
import { ITask } from '../../redux/types'


type Props = {
    displayedTasks: ITask[]
}

type State = {

}

class TasklistHeader extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    // RENDERED COMPONENTS
    render() {

        return (
            <div className="main">
                <div className="taskheader">Today</div>
                <TasklistConnector displayedTasks={this.props.displayedTasks} />
            </div>
        );
    }
}

export default TasklistHeader
