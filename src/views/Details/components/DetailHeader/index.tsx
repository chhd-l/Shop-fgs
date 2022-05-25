import React from 'react';
import { getDeviceType, getElementToPageTop } from '@/utils/utils';
import ErrMsgForCheckoutPanel from '../ErrMsgForCheckoutPanel';
import Rate from '@/components/Rate';
import InstockStatusComp from '@/components/InstockStatusComp';
import BazaarVoiceRatingSummary from '@/components/BazaarVoice/ratingSummary';

const isMobile = getDeviceType() === 'H5' || getDeviceType() === 'Pad';
const createMarkup = (text: 'string') => ({ __html: text });
const Ru = window.__.env.REACT_APP_COUNTRY === 'ru';

interface Props {
  checkOutErrMsg: string;
  goodHeading: string;
  details: any;
  productRate: string | number;
  replyNum: string | number;
  selectedSpecItem: any;
  instockStatus:any;
  vet: any;
}
const DetailHeader = ({
  checkOutErrMsg,
  goodHeading,
  details,
  productRate,
  replyNum,
  selectedSpecItem,
  instockStatus,
  vet
}: Props) => {
  const handleAClick = () => {
    if (replyNum > 0) {
      let el = document.getElementById('review-container');
      let length = getElementToPageTop(el);
      window.scrollTo({
        top: length - 80,
        behavior: 'smooth'
      });
    }
  };

  const stockDom = () =>{
    return (
      <div className="align-left flex rc-margin-bottom--xs">
      <p className="rc-margin-right--xs" aria-hidden="true">
        <InstockStatusComp status={instockStatus} />
      </p>
      {window.__.env.REACT_APP_COUNTRY === 'ru' && selectedSpecItem ? (
        <p>Артикул:{selectedSpecItem?.externalSku}</p>
      ) : null}
    </div>
    )
  }
  return isMobile ? (
    <div className="detailHeader">
      {/* <ErrMsgForCheckoutPanel checkOutErrMsg={checkOutErrMsg} /> */}
      <div dangerouslySetInnerHTML={{ __html: goodHeading }} />
      {!vet?<>
      <div className="desAndStars">
        <div className="des">
          <h2 className="text-break mb-1" style={{ fontSize: '1.17rem' }}>
            {details.goodsSubtitle}
          </h2>
        </div>
        {(window.__.env.REACT_APP_COUNTRY === 'de' ||
          window.__.env.REACT_APP_COUNTRY === 'mx') && (
          <div className="stars">
            <div className="rc-card__price flex-inline">
              <div
                className="display-inline"
                style={{ verticalAlign: 'middle' }}
              >
                <Rate
                  key={productRate}
                  def={productRate}
                  disabled={true}
                  marginSize="sRate"
                />
              </div>
              <span
                className="comments rc-margin-left--xs rc-text-colour--text"
                onClick={handleAClick.bind(this)}
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
      {stockDom()}
      {!!+window.__.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS &&
        !!details.goodsNo && (
          <BazaarVoiceRatingSummary productId={details.goodsNo} />
        )}
      </>
      :null}
    </div>
  ) : (
    <div className="detailHeader">
      <div
        dangerouslySetInnerHTML={{
          __html: goodHeading
        }}
      />
      {!vet?<>
      {!isMobile &&
        !!+window.__.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS &&
        !!details.goodsNo && (
          <BazaarVoiceRatingSummary productId={details.goodsNo} />
        )}
          {(window.__.env.REACT_APP_COUNTRY === 'de' ||
          window.__.env.REACT_APP_COUNTRY === 'mx') && (
          <div className="stars text-nowrap">
            <div className="rc-card__price flex">
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
                onClick={handleAClick.bind(this)}
              >
                ({replyNum}){/* <FormattedMessage id="reviews" /> */}
              </a>
            </div>
          </div>
        )}
        {stockDom()}
      <div className="desAndStars rc-margin-bottom--xs d-flex flex-wrap flex-md-nowrap justify-content-between">
        <div className="des">
          <h2 className="text-break mb-1 mt-2" style={{ fontSize: '1.17rem' }}>
            {details.goodsSubtitle}
          </h2>
        </div>
      </div>
      <div
        className="description"
        dangerouslySetInnerHTML={createMarkup(details.goodsDescription)}
      />
      </>:null}
    </div>
  );
};

export default DetailHeader;
