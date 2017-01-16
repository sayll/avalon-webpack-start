import Footer from './footer';
class App extends React.Component {
  
  render() {
    return (
      <div>
        <Footer />
      </div>
    );
  }
}

export default ReactRedux.connect()(App);