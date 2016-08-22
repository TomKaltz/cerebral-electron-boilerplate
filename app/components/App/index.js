import React, { PropTypes } from 'react'
import {connect} from 'cerebral-view-react'

export default connect({
  someState:'someState'
},
  class App extends React.Component {
    render() {
      return (
        <div>
          {this.props.someState}
        </div>
      );
    }
  }
)
