import * as React from 'react'
import * as PropTypes from 'prop-types'

import Header from './elements/header/Header'
import Sidebar from './elements/sidebar/Sidebar'
import TaskListHeader from './elements/tasklist/TasklistHeader'
import { TaglistConnector } from '../components/redux/store'
import { TagReceiver } from './elements/taggedtasklist/TagReceiver'

import { ITask, ITag } from './redux/types'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"


type Props = {
  tasks: ITask[]
  tags: ITag[]
  initialiseTodos: (todos:ITask[]) => void
  initialiseTags: (tags:ITag[]) => void
}

class App extends React.Component<Props>{
  constructor(props:Props) {
    super(props);
  }

  componentDidMount() {
    fetch('/api/v1/tasks.json')
      .then((response) => { return response.json() })
      .then((data) => { 
        // console.log(data);
        return this.props.initialiseTodos(data) 
      });

    fetch('/api/v1/tags.json')
      .then((response) => { return response.json() })
      .then((data) => { 
        // console.log(data);
        return this.props.initialiseTags(data) 
      });
  }

  render () {
    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></link>
        <div className = "container">
          <Router>
            <Header/>

            <Sidebar tags={this.props.tags}/>

            <Switch>

              <Route exact path="/">
                <TaskListHeader displayedTasks={this.props.tasks}/>
              </Route>

              <Route path="/tags">
                <TaglistConnector/>
              </Route>

              <Route path="/tag/:tagid">
                <TagReceiver tasks={this.props.tasks} tags={this.props.tags}/>
              </Route>

            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App
