import * as React from 'react';
import * as PropTypes from 'prop-types'
import { AppConnector } from './redux/store'

import { Provider } from 'react-redux'
import { createStore} from 'redux'
import TaskList from './redux/reducers'

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION__: Function | undefined }
}
const store = createStore(TaskList,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class Index extends React.Component{

  render () {
    return (
        <React.Fragment>
            <Provider store={store}>
                <AppConnector/>
            </Provider>
        </React.Fragment>
    );
  }
}

export default Index
