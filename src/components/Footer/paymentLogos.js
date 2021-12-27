import React from 'react';
import { injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import cn from 'classnames';

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
    this.setState({
      paymentLogos: logos
    });
  }
  render() {
    const {
      intl: { messages },
      className
    } = this.props;
    const { paymentLogos } = this.state;
    return (
      <>
        {/* payment logos */}
        {paymentLogos?.length ? (
          <div className={cn(className)}>
            <div className={cn(`rc-espilon rc-text--inverse`)}>
              {messages['footer.securePaymentMethods']}
            </div>
            <div className={`rc-text--inverse`}>
              <div
                className={`flex flex-wrap justify-content-start items-center`}
                style={{ fontSize: '0' }}
              >
                {paymentLogos.map((img, i) => (
                  <LazyLoad
                    key={i}
                    className={`mb-2 ${(i + 1) % 4 == 0 ? '' : 'mr-2'}`}
                  >
                    <img src={img.imgUrl} alt={i} style={{ width: '2.7rem' }} />
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
