import React from 'react';
class App extends React.Component {
  render() {
    let Style = {'text-align': 'center'};
    return (
      <div style={Style}>
        <h1>This is TEST demo</h1>
        <content>
          CN:这是一个测试的案例
        </content>
      </div>
    );
  }
}
export  {App};

export  function test(a) {
  return a
}
