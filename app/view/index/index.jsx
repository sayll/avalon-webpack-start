import '../../source/css/index.pcss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Tab, TabBarItem, Article} from 'react-weui';

import IconMsg from '../../source/img/test1.jpeg';
import Slider from './components/slider/slider';
import * as Redux from 'redux';
console.log(React);

class App extends React.Component {
  render() {
    return (
      <Tab type="tabbar">
        <TabBarItem icon={<img src={IconMsg}/>} label="Tab1">
          <Slider />
          <Article>
            <h1 style={{fontSize: '1rem'}}>Page 2</h1>
            <section>
              <h2 className="title">Heading</h2>
              <section>
                <h3>1.1 Title</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute</p>
              </section>
            </section>
          </Article>
        </TabBarItem>
        <TabBarItem icon={<img src={IconMsg}/>} label="Tab2">
          <Article>
            <h1>Page 2</h1>
            <section>
              <h2 className="title">Heading</h2>
              <section>
                <h3>2.1 Title</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute</p>
              </section>
            </section>
          </Article>
        </TabBarItem>
        <TabBarItem icon={<img src={IconMsg}/>} label="Tab3">
          <Article>
            <h1>Page 3</h1>
            <section>
              <h2 className="title">Heading</h2>
              <section>
                <h3>3.1 Title</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute</p>
              </section>
            </section>
          </Article>
        </TabBarItem>
      </Tab>
    );
  }
}
ReactDOM.render(
  <App/>,
  document.getElementById('body')
);