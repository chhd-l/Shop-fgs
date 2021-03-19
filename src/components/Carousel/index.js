import React, { Component } from 'react';
import Skeleton from 'react-skeleton-loader';
import { FormattedMessage } from 'react-intl';

class Carousel extends Component {
  static defaultProps = {
    relatedGoods: [1, 2, 3]
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    window.onload = () => {
      this.setState({ isLoading: false });
    };
  }
  render() {
    const { relatedGoods } = this.props;
    console.log({ relatedGoods });
    return (
      <>
        <div
          style={{
            textAlign: 'center',
            color: 'rgb(236, 0, 26)',
            height: '50px',
            lineHeight: '50px',
            fontSize: '1.4rem'
          }}
        >
          <FormattedMessage id="recommandedForyou" />
        </div>
        <div
          className="rc-carousel rc-carousel--cards rc-match-heights"
          data-js-carousel=""
          data-rc-cards="true"
          data-rows="6"
          data-rc-prev="prev"
          data-rc-next="next"
        >
          <div className="rc-carousel__card-gal">
            {relatedGoods.map((item, index) => {
              return (
                <article
                  className="rc-card rc-card--b"
                  key={index}
                  style={{ border: '1px solid #E5E5E5', margin: '0 20px' }}
                >
                  <picture
                    className="rc-card__image"
                    style={{
                      width: '150px',
                      height: '180px',
                      margin: '10px auto'
                    }}
                  >
                    <img src={item.goodsImg} alt="alt text" />
                  </picture>
                  <div className="rc-card__body">
                    <header>
                      <p className="rc-card__meta">{item.goodsName}</p>
                      <h1 className="rc-card__title">{item.minLinePrice}</h1>
                    </header>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
export default Carousel;
