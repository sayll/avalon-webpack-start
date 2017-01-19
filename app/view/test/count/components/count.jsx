import React, {PropTypes} from 'react';

export default class Count extends React.Component {
  
  static propTypes = {
    /*count: PropTypes.shape({
      init: PropTypes.number.isRequired
    }),*/
    count      : PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
  };
  
  render() {
    const {count, onIncrement, onDecrement} = this.props;
    return (
      <p>
        Clicked: {count}
        {' '}
        <button onClick={onIncrement}>+</button>
        {' '}
        <button onClick={onDecrement}>-</button>
      </p>
    );
  }
};
