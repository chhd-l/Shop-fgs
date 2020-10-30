import { FormattedMessage, injectIntl } from 'react-intl';
import React from 'react';
import Rate from '@/components/Rate';
import ImgUpload from '@/components/ImgUpload';
import '../index.css';
@injectIntl
class ReviewList extends React.Component {
  constructor() {
    super();
    this.state = {
      detail: []
    };
  }
  componentDidMount() {
    let mock = [
      { id: 1, name: 'Large Dog', description: 'Perro de', isActive: true },
      { id: 2, name: 'Large Dog1', description: 'Perro de2', isActive: false },
      { id: 3, name: 'Large Dog2', description: 'Perro de3', isActive: false }
    ];
    this.setState({
      detail: mock
    });
  }
  selectProduct(item) {
    let datas = this.state.detail;
    datas.forEach((every) => {
      if (item.id === every.id) {
        every.isActive = true;
      } else {
        every.isActive = false;
      }
    });
    this.setState({
      detail: datas
    });
    this.props.update(item.id);
  }
  render() {
    return (
      <div>
        {this.state.detail
          ? this.state.detail.map((item) => (
              <div
                className={item.isActive ? 'product-active' : 'noActive'}
                onClick={() => this.selectProduct(item)}
              >
                <div className="rc-layout-container rc-five-column rc-padding-bottom--xs rc-border-colour--interface">
                  <div className="rc-column">
                    <div className="rc-full-width">
                      <div className="d-flex justify-content-center ui-margin-top-1-md-down">
                        <div className="details-img-container">
                          <div className="">
                            <img src="https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202004291813187993.png" alt=""/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rc-column">
                    <div className="wrap-short-des rc-padding-top--sm">
                      <div className="rc-gamma ui-text-overflow-line2 text-break">
                        <h5>{item.name}</h5>
                      </div>
                      <div className="text-break">
                        <span>{item.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default ReviewList;
