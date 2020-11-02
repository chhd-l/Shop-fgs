import React, { Component } from "react";
import Slider from 'react-slick';
import { getGoodsRelation } from '@/api/details';
import Rate from '@/components/Rate';
import { formatMoney } from '@/utils/utils';
import { FormattedMessage } from 'react-intl';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--next rc-btn rc-btn--icon rc-icon rc-interactive rc-right rc-iconography`}
            style={{
                ...style,
                right: '0%',
                zIndex: 1,
                top: '50%',
                position: 'absolute',
                transform: 'translateY(-50%) translateX(-50px)'
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--prev rc-btn rc-btn--icon rc-icon rc-interactive rc-left rc-iconography`}
            style={{
                ...style,
                left: '0%',
                zIndex: 1,
                top: '50%',
                position: 'absolute',
                transform: 'translateY(-50%) translateX(-50px)'
            }}
            onClick={onClick}
        />
    );
}

export default class MultipleItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            goodsList:[1,2,3,4,5,6],
            //goodsList: [],
            goodsId: ''
        }
    }
    // componentWillReceiveProps(nextProps, nextContext) {
    //     if (nextProps.goodsId && nextProps.goodsId !== this.state.goodsId) {
    //         this.setState(
    //             {
    //                 goodsId: nextProps.goodsId
    //             },
    //             () => {
    //                 getGoodsRelation(this.state.goodsId).then((res) => {
    //                     console.log(333, res)
    //                     this.setState({
    //                         goodsList: res.context.goods
    //                     })
    //                 })
    //             }
    //         );
    //     }
    // }
    componentDidMount() {
        //定义变量获取屏幕视口宽度
        // var windowWidth = document.body.clientWidth
        // this.setState({
        //     windowWidth
        // })
        // const { goodsId } = this.props
        // if (goodsId) {
        //     getGoodsRelation(goodsId).then((res) => {
        //         console.log(333, res)
        //         this.setState({
        //             goodsList: res.context.goods
        //         })
        //     })
        // }
    }
    hanldeClick = (item) => {
        console.log(item)
        //   sessionItemRoyal.set(
        //     'rc-goods-cate-name',
        //     this.state.currentCatogery || ''
        //   );
        //   sessionItemRoyal.set('recomment-preview', this.props.location.pathname|);
        //   sessionItemRoyal.set('rc-goods-name', item.goodsName);
        const { history } = this.props;
        history.push('/details/' + item.goodsInfoIds[0]);
    }
    render() {
        //if(this.state.goodsList.length===0) return(<div></div>)
        console.log('render render')
        console.log(2222,this.state.goodsList)
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };
        return (
            <div>
                <Slider {...settings}>
                    {
                        this.state.goodsList.map((item, index) => {
                            return (
                                <div qindex={index}>
                                    <h3>{index}</h3>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        );
    }
}
