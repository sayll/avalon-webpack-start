import React, {PropTypes, Component} from 'react';
import './slider.pcss';
import Img_1 from '../../../../source/img/carousel/bing-1.jpg';
import Img_2 from '../../../../source/img/carousel/bing-2.jpg';
import Img_3 from '../../../../source/img/carousel/bing-3.jpg';
import Img_4 from '../../../../source/img/carousel/bing-4.jpg';

class Slider extends Component {
  constructor() {
    super();
    this.state = {
      slider  : {
        showPage: 0, // 当前活动的轮播图
        pages   : 1, // 总页数
      },
      listData: []
    }
  }
  
  componentDidMount() {
    this.setState({
      listData: [
        {img: Img_1, url: '#1'},
        {img: Img_2, url: '#2'},
        {img: Img_3, url: '#3'},
        {img: Img_4, url: '#4'}
      ],
      slider  : Object.assign(this.state.slider, {pages: 4})
    });
  }
  
  handleChange(int) {
    let slider   = this.state.slider,
        // 此处添加pages是为了防止负数的出现
        showPage = (slider.showPage + slider.pages + int) % slider.pages;
    this.setState({
      slider: Object.assign(slider, {showPage: showPage})
    });
  }
  
  test(e){
    console.log(e.touches);
  }
  
  render() {
    let list = this.state.listData.map((val, key) => {
      return (
        <li key={'li' + key}
            className={this.state.slider.showPage === key ? 'active' : ''}>
          <a href={val.url}>
            <img src={val.img}/>
          </a>
        </li>
      );
    });
    
    return (
      <div className="tSlider">
        <ul onTouchStart={this.test.bind(this)}>
          {list}
        </ul>
        <i className="icon icon-sliderL"
           onClick={() => {this.handleChange.bind(this)(1)}}/>
        <i className="icon icon-sliderR"
           onClick={() => {this.handleChange.bind(this)(-1)}}/>
      </div>
    );
  }
  
  static propTypes = {
    count: PropTypes.shape({
      int             : PropTypes.number.isRequired,
      onIncrement     : PropTypes.object.isRequired,
      onDecrement     : PropTypes.object.isRequired,
      onIncrementIfOdd: PropTypes.object.isRequired,
      onIncrementAsync: PropTypes.object.isRequired
    })
  };
}

export default Slider;
