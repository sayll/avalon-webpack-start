console.time('start');
fetch('http://www.lafilm.cn/api/v1/cms',{
	method:'GET'
}).then(function (response) {
	console.log(22121);
})

console.timeEnd('start');


/*class Demo extends React.Component {
 constructor(props) {
 super(props);
 this.state = {data: true};
 }
 
 componentDidMount() {
 console.log('start');
 }
 
 componentWillUnmount() {
 console.log('remove');
 }
 
 tick(e) {
 
 this.setState(prevState=> {
 console.log(prevState);
 return {data: !prevState.data}
 });
 e.preventDefault();
 }
 
 render() {
 return (
 <a href={this.state.data} onClick={(e)=>this.tick(e)}>
 {this.state.data ? 'ON' : 'OFF'}
 </a>
 );
 }
 
 }
 let t = new Demo();
 console.log(t);
 ReactDOM.render(
 <Demo />,
 $$('#content')[0]
 );*/

/*class RangeIterator {
 constructor(start, stop) {
 this.value = start;
 this.stop = stop;
 }
 
 [Symbol.iterator]() { return this; }
 
 next() {
 var value = this.value;
 if (value < this.stop) {
 this.value++;
 return {done: false, value: value};
 } else {
 return {done: true, value: undefined};
 }
 }
 }
 
 // Return a new iterator that counts up from 'start' to 'stop'.
 function range(start, stop) {
 return new RangeIterator(start, stop);
 }
 
 for (var value of range(1, 4)) {
 alert("Ding! at floor #" + value);
 }*/