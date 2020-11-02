import React from 'react';
import "./Carousel.css"
import { getGoodsRelation } from '@/api/details';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList:[],
      windowWidth:0
    };
  }
  componentDidMount(){
       //定义变量获取屏幕视口宽度
    var windowWidth = document.body.clientWidth
    this.setState({
        windowWidth
    })
    const {goodsId} = this.props
      if(goodsId){
        getGoodsRelation(goodsId).then((res)=>{
            console.log(333,res)
            this.setState({
                goodsList: res.context.goods
            })
        })
      }
  }
  render() {
    return (
      <div>
          <div class="gundong-wrapper">
                <ul id="gundong">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                </ul>
	        </div>
      </div>
    );
  }
}

export default Carousel;
