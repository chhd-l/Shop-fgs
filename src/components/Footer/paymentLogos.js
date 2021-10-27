import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { getDeviceType } from '@/utils/utils';
import LazyLoad from 'react-lazyload';
import { toJS } from 'mobx';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';

@inject('configStore')
@injectIntl
@observer
class PaymentLogos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentLogos: []
    };
  }
  async componentDidMount() {
    // 查询 payment logos
    let logos = await this.props.configStore.queryPaymentMethodCfg();
    this.setState(
      {
        paymentLogos: toJS(logos)
      },
      () => {
        // console.log('666 >>> paymentLogos hub: ', this.state.paymentLogos);
      }
    );
  }
  render() {
    const { paymentLogos } = this.state;
    return (
      <>
        {/* payment logos */}
        {paymentLogos?.length ? (
          <div className="rc-column rc-padding-bottom--none rc-padding-top--lg--mobile">
            <p
              className={`rc-espilon rc-text--inverse ${
                isMobile ? '' : 'text-right'
              }`}
            >
              <FormattedMessage id="footer.securePaymentMethods" />
            </p>
            <div
              className={`rc-text--inverse flex ${
                isMobile ? 'justify-content-start' : 'justify-content-end'
              }`}
            >
              <div
                className={`flex flex-wrap justify-content-start`}
                style={{ fontSize: '0', width: '12.5rem' }}
              >
                {paymentLogos.map((img, i) => (
                  <LazyLoad
                    className={`mb-2 ${(i + 1) % 4 == 0 ? '' : 'mr-2'}`}
                  >
                    <img
                      src={img.imgUrl}
                      alt={i}
                      style={{ width: '2.7rem', height: '1.6rem' }}
                    />
                  </LazyLoad>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
export default PaymentLogos;
