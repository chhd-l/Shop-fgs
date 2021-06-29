import React from 'react';
import Loading from '@/components/Loading';
import './index.less';

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
    // 初始化地图控件。在完全绘制页面后调用。
    document.addEventListener('DOMContentLoaded', (e) => {
      kaktusMap({
        domain: 'shop3505331', // shop3505331  shop4995727
        host: '//app.kak2c.ru'
      });
    });
    // 地图控件点击事件
    document.addEventListener('kaktusEvent', (e) => {
      try {
        // 传递给父页面
        window.parent.postMessage(e.detail, '*');
      } catch (error) {
        console.log('error >>: ', error);
      }
    });

    window.addEventListener('load', () => {
      this.setState({
        mapLoading: false
      });
      this.sendMsgLoadComplete();

      // 接收父组件发来的数据
      window.addEventListener(
        'message',
        (e) => {
          if (e?.data?.city) {
            let pkcity = e.data.city;
            this.setState({
              city: pkcity
            });
            this.openKaktusWidget(pkcity);
          }
        },
        false
      );
    });
  }
  // 打开地图
  openKaktusWidget = (city) => {
    console.log('666 ', city);
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
        <div className="pickup_map_box">
          <div id="kaktusMap"></div>
        </div>
      </>
    );
  }
}

export default PickupMap;
