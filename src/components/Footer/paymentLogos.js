import React from 'react';
import { injectIntl } from 'react-intl-phraseapp';
import { inject, observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import cn from 'classnames';
import { optimizeImage } from '@/utils/utils';

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
    const logos = await this.props.configStore.queryPaymentMethodCfg();
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
                  <LazyLoad key={i} className={`mb-2 mr-2`}>
                    <img
                      src={optimizeImage({
                        originImageUrl: img.imgUrl,
                        width: 80
                      })}
                      alt={i}
                      style={{ maxWidth: '2.7rem', maxHeight: '2rem' }}
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
