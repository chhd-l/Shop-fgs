import React from 'react';
import { getDeviceType } from '@/utils/utils';
import ErrMsgForCheckoutPanel from '../ErrMsgForCheckoutPanel/index.tsx'
import Rate from '@/components/Rate';
import BazaarVoiceRatingSummary from '@/components/BazaarVoice/ratingSummary';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const createMarkup = (text: 'string') => ({ __html: text });
const Ru = process.env.REACT_APP_COUNTRY === 'RU';
interface Props {
  checkOutErrMsg: string
  goodHeading: string
  details: any
  productRate: string | number
  replyNum: string | number
  selectedSpecItem: any
}
const DetailHeader = ({checkOutErrMsg, goodHeading, details, productRate, replyNum, selectedSpecItem}: Props) => {
  return isMobile ? (
    <div className="detailHeader mt-3">
      <ErrMsgForCheckoutPanel checkOutErrMsg={checkOutErrMsg} />
      <div dangerouslySetInnerHTML={{ __html: goodHeading }} />
      <div className="desAndStars">
        <div className="des">
          <h2 className="text-break mb-1 mt-2" style={{ fontSize: '1.17rem' }}>
            {details.goodsSubtitle}
          </h2>
        </div>
        {!!+process.env.REACT_APP_PDP_RATING_VISIBLE && (
          <div className="stars">
            <div className="rc-card__price flex-inline">
              <div
                className="display-inline"
                style={{ verticalAlign: 'middle' }}
              >
                <Rate def={productRate} disabled={true} marginSize="sRate" />
              </div>
              <span
                className="comments rc-margin-left--xs rc-text-colour--text"
                onClick={this.handleAClick.bind(this)}
              >
                ({replyNum}){/* <FormattedMessage id="reviews" /> */}
              </span>
            </div>
          </div>
        )}
      </div>
      <div
        className="description"
        dangerouslySetInnerHTML={createMarkup(details.goodsDescription)}
      />
    </div>
  ) : (
    <div className="detailHeader">
      <div
        dangerouslySetInnerHTML={{
          __html: goodHeading
        }}
      />
      {!isMobile &&
        !!+process.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS &&
        !!details.goodsNo && (
          <BazaarVoiceRatingSummary productId={details.goodsNo} />
        )}
      {Ru && selectedSpecItem ? (
        <p>Артикул:{selectedSpecItem?.goodsInfoNo}</p>
      ) : null}
      <div className="desAndStars rc-margin-bottom--xs d-flex flex-wrap flex-md-nowrap justify-content-between">
        <div className="des">
          <h2 className="text-break mb-1 mt-2" style={{ fontSize: '1.17rem' }}>
            {details.goodsSubtitle}
          </h2>
        </div>
        {!!+process.env.REACT_APP_PDP_RATING_VISIBLE && (
          <div className="stars text-nowrap">
            <div className="rc-card__price flex-inline">
              <div
                className="display-inline"
                style={{ verticalAlign: 'middle' }}
              >
                <Rate
                  def={productRate}
                  key={productRate}
                  disabled={true}
                  marginSize="sRate"
                />
              </div>
              <a
                className="comments rc-margin-left--xs rc-text-colour--text"
                onClick={this.handleAClick.bind(this)}
              >
                ({replyNum}){/* <FormattedMessage id="reviews" /> */}
              </a>
            </div>
          </div>
        )}
      </div>
      <div
        className="description"
        dangerouslySetInnerHTML={createMarkup(details.goodsDescription)}
      />
    </div>
  );
};

export default DetailHeader