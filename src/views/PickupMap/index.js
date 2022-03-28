import React from 'react';
import Loading from '@/components/Loading';
import './index.less';
import { getDeviceType, loadJS } from '@/utils/utils';

const isMobile = getDeviceType() !== 'PC' || getDeviceType() === 'Pad';

class PickupMap extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      mapLoading: true,
      city: ''
    };
  }
  componentDidMount() {
    loadJS({
      url: 'https://static.kak2c.ru/kak2c.pvz-map.js',
      // integrity: 'sha256-NvjFXtXzlwWv1DpQ563HJipP40Td3baM1Ucd9JCwAOY=',//跨域报错，暂时不做处理
      // crossOrigin: 'anonymous',
      callback: () => {
        // 初始化地图控件。在完全绘制页面后调用。
        // document.addEventListener('DOMContentLoaded', (e) => {
        window.kaktusMap({
          domain: 'shop3505331', // shop3505331  shop4995727
          host: '//app.kak2c.ru'
        });
        // });

        // 地图控件点击事件
        document.addEventListener('kaktusEvent', (e) => {
          try {
            // 传递给父页面
            window.parent.postMessage(e.detail, '*');
          } catch (error) {
            console.log('666 error >>: ', error);
          }
        });

        // 页面加载完后打开地图
        window.addEventListener('load', () => {
          this.setState({
            mapLoading: false
          });
          this.sendMsgLoadComplete();

          // 接收父页面发来的数据
          window.addEventListener(
            'message',
            (e) => {
              // console.log('666 ★ 接收组件发来的数据: ', e.data?.msg);
              if (e?.data?.msg) {
                let msg = e.data.msg;
                if (msg == 'clearMap') {
                  // 关闭地图，避免下次打开地图数据异常
                  if (document.getElementsByClassName('close-button')[0]) {
                    document.getElementsByClassName('close-button')[0].click();
                  }
                } else {
                  this.setState({
                    city: msg
                  });
                  this.openKaktusWidget(msg);
                }
              }
            },
            false
          );
        });
      }
    });
  }
  // 打开地图
  openKaktusWidget = (city) => {
    console.log('homeDeliveryAndPickup');
    try {
      let homeDeliveryAndPickup = JSON.parse(
        window.__.sessionItemRoyal.get('rc-homeDeliveryAndPickup')
      );
      let { dimensions, weight } = homeDeliveryAndPickup.cityData;
      // window.kaktusMap &&
      //   window.kaktusMap.openWidget({
      //     city_from: 'Москва',
      //     city_to: city,
      //     dimensions: {
      //       height: dimensions.height,
      //       width: dimensions.width,
      //       depth: dimensions.depth
      //     },
      //     weight: weight
      //   });
      window.kaktusMap &&
        window.kaktusMap.openWidget({
          city_from: 'Москва',
          city_to: city,
          dimensions: {
            height: 10,
            width: 10,
            depth: 10
          },
          weight: 600
        });
    } catch (error) {
      console.log('666 ★ 打开地图city: ', city);
      window.kaktusMap &&
        window.kaktusMap.openWidget({
          city_from: 'Москва',
          city_to: city,
          dimensions: {
            height: 10,
            width: 10,
            depth: 10
          },
          weight: 600
        });
    }
  };
  // 页面加载完成后向父级发送数据
  sendMsgLoadComplete = () => {
    try {
      window.parent.postMessage({ loading: 'succ' }, '*');
    } catch (error) {
      console.log('error >>: ', error);
    }
  };
  render() {
    const { mapLoading } = this.state;
    return (
      <>
        {mapLoading && (
          <Loading positionAbsolute="true" customStyle={{ zIndex: 9 }} />
        )}
        <div className={`pickup_map_box ${isMobile ? 'mobile_map_box' : ''}`}>
          <div id="kaktusMap"></div>
        </div>
      </>
    );
  }
}

export default PickupMap;
