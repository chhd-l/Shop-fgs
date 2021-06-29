import React from 'react';
import Loading from '@/components/Loading';
import './index.less';

class PickupMap extends React.Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.state = {
      mapLoading: true
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
    document.addEventListener('kaktusEvent', (event) => {
      console.log('666 传递给父页面: ', event.detail);
      // 传递给父页面
      window.parent.postMessage(event.detail, '*');
    });

    window.addEventListener('load', () => {
      this.setState(
        {
          mapLoading: false
        },
        () => {
          this.openKaktusWidget();
        }
      );
    });
  }
  openKaktusWidget = () => {
    window.kaktusMap.openWidget({
      city_from: 'Москва',
      city_to: 'Москва',
      dimensions: {
        height: 10,
        width: 10,
        depth: 10
      },
      weight: 600
    });
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
