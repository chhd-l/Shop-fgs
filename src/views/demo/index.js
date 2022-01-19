import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import './index.less';
import ImageMagnifier from './ImageMagnifier';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--next iconfont font-weight-bold icon-direction ui-cursor-pointer`}
      style={{
        ...style,
        right: '-5%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    >
      <span className="iconjiantouyou1 iconfont rc-text-colour--text font-weight-bold ui-cursor-pointer" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} d-none d-md-block rc-carousel__direction rc-carousel__direction--prev icon-direction ui-cursor-pointer`}
      style={{
        ...style,
        left: '-5%',
        zIndex: 1,
        top: '50%',
        position: 'absolute',
        transform: 'translateY(-50%)'
      }}
      onClick={onClick}
    >
      <span className="iconjiantouzuo1 iconfont rc-text-colour--text font-weight-bold ui-cursor-pointer" />
    </div>
  );
}
const AsNavFor = (props) => {
  const dataList = [
    {
      imageId: 381892,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'master',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_master.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    },
    {
      imageId: 381893,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'other',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_other_328049.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    },
    {
      imageId: 381894,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'hero',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_hero_508324.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    },
    {
      imageId: 381895,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'other',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_other_508353.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    },
    {
      imageId: 381896,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'bag',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_bag_498159.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    },
    {
      imageId: 381897,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'other',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_other_633479.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    },
    {
      imageId: 381898,
      goodsId: '2c918085768f3a4101768f3e1e9a0029',
      imageType: 'kibble',
      goodsInfoId: null,
      artworkUrl:
        'https://d2cstgstorage.z13.web.core.windows.net/FR_129171_kibble_328050.jpg',
      middleUrl: null,
      thumbUrl: null,
      bigUrl: null,
      createTime: '2022-01-13 08:26:01.000',
      updateTime: '2022-01-13 08:26:01.000',
      delFlag: 0
    }
  ];
  const [currentSliderSize, setCurrentSliderSize] = useState({});
  const [idx, setIdx] = useState(0);
  const sliderImageMagnifierBox = useRef({});
  const sliderRef = useRef({});
  const navToSlide = (idx) => {
    console.info('idx', idx);
    setIdx(idx);
    sliderRef.current.slickGoTo(idx);
    let currentSlider = document.querySelectorAll('.slick-list img')[idx];
    let width = currentSlider.clientWidth;
    let height = currentSlider.clientHeight;
    setCurrentSliderSize({ width, height });
  };
  return (
    <div ref={sliderImageMagnifierBox}>
      <div className="demo-css">
        <div className="relative">
          <Slider
            ref={(slider) => (sliderRef.current = slider)}
            swipeToSlide={false}
            arrows={false}
            touchMove={false}
            swipe={false}
            infinite={false}
          >
            {dataList.map((item, index) => (
              <img src={item.artworkUrl} />
            ))}
          </Slider>
          <div
            className="absolute"
            style={{
              top: 0,
              marginLeft: '50%',
              transform: 'translate(-50%)',
              zIndex: 999
            }}
          >
            <ImageMagnifier
              minImg={dataList[idx].artworkUrl}
              magnifierContainerLeft={
                sliderImageMagnifierBox.current.clientWidth
              }
              currentSliderSize={currentSliderSize}
              maxImg={dataList[idx].artworkUrl}
            />
          </div>
        </div>
        <Slider
          slidesToShow={5}
          swipeToSlide={false}
          arrows={true}
          infinite={false}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {dataList.map((item, index) => (
            <div
              className={`slider-item`}
              onMouseOver={() => {
                navToSlide(index);
              }}
            >
              <div className={`pic-item-box ${index == idx ? 'active' : ''}`}>
                <div
                  className={`pic-item`}
                  style={{
                    height: 0,
                    paddingTop: '100%',
                    backgroundImage: `url('${item.artworkUrl}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default AsNavFor;
// export default class AsNavFor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     };
//   }

//   componentDidMount() {
//     this.setState({});
//   }

//   render() {
//     let switchSides = false;

//   }
// }
