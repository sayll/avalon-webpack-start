import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions/index';
import Count from '../components/count';

class App extends React.Component {
  render() {
    let Style = {'textAlign': 'center'},
        props = this.props;
    return (
      <div style={Style}>
        <h1>This is TEST demo</h1>
        <Count count={props.count}
               onIncrement={props.onIncrement}
               onDecrement={props.onDecrement}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => dispatch(Actions.COUNT('INCREMENT')),
    onDecrement: () => dispatch(Actions.COUNT('DECREMENT'))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
