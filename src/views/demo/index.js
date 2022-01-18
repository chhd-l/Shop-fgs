import React, { Component } from 'react';
import Slider from 'react-slick';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import './index.less';
export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [
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
      ]
    };
  }

  componentDidMount() {
    this.setState({});
  }
  navToSlide = (idx) => {
    console.info('idx', idx);
    this.slider.slickGoTo(idx);
  };

  render() {
    let switchSides = false;
    return (
      <div className="demo-css">
        <Slider
          ref={(slider) => (this.slider = slider)}
          swipeToSlide={false}
          arrows={false}
          touchMove={false}
          swipe={false}
          infinite={false}
        >
          {this.state.dataList.map((item, idx) => (
            <div>
              <h3
                className="current-img flex items-center justify-center"
                onMouseOver={() => {
                  console.info('........');
                }}
              >
                <SideBySideMagnifier
                  className="input-position"
                  style={{ order: switchSides ? '1' : '0' }}
                  imageSrc={item.artworkUrl}
                  // imageSrc='https://d2cstgstorage.z13.web.core.windows.net/FR_129171_master.jpg'
                  // largeImageSrc='https://d2cstgstorage.z13.web.core.windows.net/FR_129171_master.jpg'
                  alwaysInPlace={false}
                  overlayBackgroundColor="transparent"
                  overlayBoxOpacity={0.7}
                  overlayBoxColor="#000"
                  switchSides={switchSides}
                  zoomPosition="left"
                  overlayBoxImageSize=""
                  inPlaceMinBreakpoint={400}
                  fillAvailableSpace={false}
                  fillAlignTop={false}
                  fillGapTop={10}
                  fillGapRight={10}
                  fillGapBottom={10}
                  fillGapLeft={0}
                  zoomContainerBorder="1px solid #ccc"
                  zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
                />
                {/* <img src={item.artworkUrl} /> */}
              </h3>
            </div>
          ))}
        </Slider>
        <Slider
          slidesToShow={5}
          swipeToSlide={false}
          arrows={true}
          infinite={false}
        >
          {this.state.dataList.map((item, idx) => (
            <div
              onClick={() => {
                this.navToSlide(idx);
              }}
            >
              <h3
                className="pic-item"
                style={{
                  height: 0,
                  paddingTop: '100%',
                  backgroundImage: `url('${item.artworkUrl}')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%'
                }}
              >
                {/* <img src={item.artworkUrl}/> */}
              </h3>
            </div>
          ))}
        </Slider>

        <br />
        <SideBySideMagnifier
          className="input-position"
          style={{ order: switchSides ? '1' : '0' }}
          imageSrc="https://d2cstgstorage.z13.web.core.windows.net/FR_129171_master.jpg"
          // largeImageSrc='https://d2cstgstorage.z13.web.core.windows.net/FR_129171_master.jpg'
          alwaysInPlace={false}
          overlayBackgroundColor="transparent"
          overlayBoxOpacity={0.7}
          overlayBoxColor="#000"
          switchSides={switchSides}
          zoomPosition="left"
          overlayBoxImageSize=""
          inPlaceMinBreakpoint={400}
          fillAvailableSpace={false}
          fillAlignTop={false}
          fillGapTop={10}
          fillGapRight={10}
          fillGapBottom={10}
          fillGapLeft={0}
          zoomContainerBorder="1px solid #ccc"
          zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
        />
      </div>
    );
  }
}
