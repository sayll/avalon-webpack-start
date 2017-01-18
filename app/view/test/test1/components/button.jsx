class Count extends React.Component {
  
  static propTypes = {
    count: PropTypes.shape({
      text   : PropTypes.string,
      onClick: PropTypes.func.isRequired
    })
  };
  
  render() {
    let props = this.props;
    return (
      <button onClick={props.onClick}>{props.text}</button>
    );
  }
}

export default Count;
