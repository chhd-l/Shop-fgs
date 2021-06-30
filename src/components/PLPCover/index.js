import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { inject } from 'mobx-react';
import Rate from '@/components/Rate';
import DistributeHubLinkOrATag from '@/components/DistributeHubLinkOrATag';
import { FormattedMessage } from 'react-intl';
import { getDeviceType, formatMoney } from '@/utils/utils';
import { IMG_DEFAULT } from '@/utils/constant';
import InlineRatings from '@/components/BazaarVoice/inlineRatings';

const isMobilePhone = getDeviceType() === 'H5';
const retailDog =
  'https://cdn.royalcanin-weshare-online.io/zWkqHWsBG95Xk-RBIfhn/v1/bd13h-hub-golden-retriever-adult-black-and-white?w=1280&auto=compress&fm=jpg';

function ListItemH5ForGlobalStyle(props) {
  const {
    item,
    GAListParam,
    breadListByDeco,
    sourceParam,
    isDogPage,
    link,
    showBorder,
    className
  } = props;

  return item && item.productFinder ? (
    <article
      className="rc-card--product overflow-hidden"
      style={{ minHeight: '120px' }}
    >
      <div className="fullHeight">
        <span className="ui-cursor-pointer-pure">
          <article className="rc-card--a  margin-top--5">
            <div className="rc-card__body rc-padding-top--md pb-0 justify-content-start d-flex flex-wrap">
              <div className="height-product-tile-plpOnly margin-top-mobile-20">
                <h3 className="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop product-title text-break ">
                  <FormattedMessage id="plp.retail.cat.product.finder.title" />
                </h3>
              </div>
              <div>
                <div
                  className="d-flex rc-padding-top--md margin-top-mobile-20 position-relative"
                  style={{ fontSize: 'large', zIndex: 2 }}
                >
                  <FormattedMessage
                    id="plp.retail.cat.product.finder.detail"
                    values={{
                      val: <br />
                    }}
                  />
                </div>
                <DistributeHubLinkOrATag
                  href="/product-finder"
                  to="/product-finder"
                >
                  <button
                    className="rc-btn rc-btn--two margin-top-mobile-20"
                    style={{ marginTop: '1.1875rem' }}
                  >
                    <FormattedMessage id="plp.retail.cat.product.finder.button" />
                  </button>
                </DistributeHubLinkOrATag>
              </div>
              <picture className="rc-card__image" style={{ flex: 1 }}>
                <div className="rc-padding-bottom--xs justify-content-center ">
                  <div
                    className="lazyload-wrapper"
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    {isDogPage ? (
                      <img
                        src={retailDog}
                        className=" pt-3 "
                        style={{
                          maxHeight: '100%',
                          width: '70%',
                          height: 'auto',
                          margin: 'auto'
                        }}
                        alt="Retail Products"
                      />
                    ) : (
                      <img
                        src={`${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/product-finder/product-finder-recomend-retail-cat-find@2x.jpeg`}
                        className=" pt-3 ImgForMobile"
                        style={{
                          maxHeight: '100%',
                          height: 'auto',
                          margin: 'auto'
                        }}
                        alt="Retail Products"
                      />
                    )}
                  </div>
                </div>
              </picture>
            </div>
          </article>
        </span>
      </div>
    </article>
  ) : (
    <article
      className={`rc-card rc-card--b rc-padding--sm--mobile rc-padding--xs--desktop rc-padding-x--xs h-100 priceRangeFormat product-tiles-container fr-mobile overflow-hidden ${className} ${
        showBorder ? '' : 'border-none'
      }`}
      style={{ minHeight: '120px' }}
    >
      {props.leftPromotionJSX}
      {props.rightPromotionJSX}
      <div className="h-100">
        <Link
          className="ui-cursor-pointer-pure"
          to={
            link || {
              pathname: item
                ? `/${
                    item.lowGoodsName?.split(' ').join('-').replace('/', '') ||
                    ''
                  }-${item.goodsNo}` + sourceParam
                : '',
              state: { GAListParam, historyBreads: breadListByDeco }
            }
          }
          onClick={props.onClick}
        >
          <article
            className="rc-card--a rc-text--center text-center d-flex"
            style={{ flexWrap: 'wrap' }}
          >
            {item ? (
              <picture
                className="col-4 col-sm-3 col-md-12 rc-margin-bottom--xs--desktope"
                style={{
                  marginLeft: '-.625rem',
                  paddingLeft: '5px',
                  paddingRight: '.9375rem',
                  fontSize: '0'
                }}
              >
                {/*循环遍历的图片*/}
                <LazyLoad style={{ width: '100%', height: '100%' }}>
                  <img
                    src={
                      item.goodsImg || item.goodsInfos
                        ? item.goodsImg ||
                          item.goodsInfos.sort(
                            (a, b) => a.marketPrice - b.marketPrice
                          )[0].goodsInfoImg ||
                          IMG_DEFAULT
                        : ''
                    }
                    alt={item.goodsName}
                    title={item.goodsName}
                    className="ImgFitScreen"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      margin: 'auto'
                    }}
                  />
                </LazyLoad>
              </picture>
            ) : null}
            {props.children}

            {item && item.goodsNewSubtitle ? (
              <div className="rc-card__meta text-center col-12 ui-text-overflow-line2 m-0">
                {item.goodsNewSubtitle}
              </div>
            ) : null}
          </article>
        </Link>
      </div>
    </article>
  );
}

function ListItemForDefault(props) {
  const {
    item,
    GAListParam,
    breadListByDeco,
    sourceParam,
    isDogPage,
    link,
    showBorder,
    className
  } = props;
  return item && item.productFinder ? (
    <article
      className="rc-card--product overflow-hidden"
      style={{ minHeight: '120px' }}
    >
      <div className="fullHeight">
        <span className="ui-cursor-pointer-pure">
          <article className="rc-card--a rc-text--center text-center">
            <div className="pb-0 justify-content-start rc-padding-top--md">
              <div className="height-product-tile-plpOnly">
                <FormattedMessage id="plp.retail.cat.product.finder.title">
                  {(txt) => (
                    <h3
                      className="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop product-title text-break text-center"
                      title={txt}
                    >
                      {txt}
                    </h3>
                  )}
                </FormattedMessage>
              </div>
              <div
                className=" text-center rc-padding-top--xs"
                style={{ fontSize: 'large' }}
              >
                <FormattedMessage
                  id="plp.retail.cat.product.finder.detail"
                  values={{
                    val: <br />
                  }}
                />
              </div>
              <div style={{ margin: '0 auto' }}>
                <DistributeHubLinkOrATag
                  href="/product-finder"
                  to="/product-finder"
                >
                  <button
                    className="rc-btn rc-btn--two "
                    style={{ marginTop: '1.1875rem' }}
                  >
                    <FormattedMessage id="plp.retail.cat.product.finder.button" />
                  </button>
                </DistributeHubLinkOrATag>
              </div>
            </div>
            <picture className="rc-card__image">
              <div className="rc-padding-bottom--xs d-flex justify-content-center align-items-center ImgBoxFitScreen">
                <div
                  className="lazyload-wrapper"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <img
                    src={
                      isDogPage
                        ? retailDog
                        : `${window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX}/img/product-finder/product-finder-recomend-retail-cat-find@2x.jpeg`
                    }
                    alt="product finder recomend retail cat find"
                    title=""
                    className="ImgFitScreen pt-3"
                    style={{
                      maxHeight: '100%',
                      width: isDogPage ? '175px' : '150px',
                      height: 'auto',
                      margin: 'auto'
                    }}
                  />
                </div>
              </div>
            </picture>
          </article>
        </span>
      </div>
    </article>
  ) : (
    <article
      className={`rc-card rc-card--product overflow-hidden ${className} ${
        showBorder ? 'border border-d7d7d7' : ''
      }`}
      style={{ minHeight: '120px' }}
    >
      {props.leftPromotionJSX}
      {props.rightPromotionJSX}
      <div className="fullHeight">
        <Link
          className="ui-cursor-pointer-pure"
          to={
            link || {
              pathname: item
                ? `/${item.lowGoodsName
                    .split(' ')
                    .join('-')
                    .replace('/', '')}-${item.goodsNo}` + sourceParam
                : '',
              state: {
                GAListParam,
                historyBreads: breadListByDeco
              }
            }
          }
          onClick={props.onClick}
        >
          <article className="rc-card--a rc-text--center text-center">
            {item ? (
              <picture className="rc-card__image">
                <div
                  className="d-flex justify-content-center align-items-center ImgBoxFitScreen"
                  style={{ height: '13rem' }}
                >
                  {/*循环遍历的图片*/}
                  <LazyLoad
                    style={{ width: '100%', height: '100%' }}
                    classNamePrefix="w-100 h-100 d-flex align-items-center"
                  >
                    <img
                      src={
                        item.goodsImg ||
                        item.goodsInfos.sort(
                          (a, b) => a.marketPrice - b.marketPrice
                        )[0].goodsInfoImg ||
                        IMG_DEFAULT
                      }
                      // srcSet={item ? getMuntiImg(item) : IMG_DEFAULT}
                      alt={`${item.goodsName} product image`}
                      title={item.goodsName}
                      className="ImgFitScreen "
                      style={{
                        maxWidth: '50%',
                        maxHeight: '100%',
                        width: '150px',
                        height: 'auto',
                        margin: 'auto'
                      }}
                    />
                  </LazyLoad>
                </div>
              </picture>
            ) : null}
            {props.children}
          </article>
        </Link>
      </div>
    </article>
  );
}

function ListItemBodyH5ForGlobalStyle({ item, configStore }) {
  return (
    <div className="fr-mobile-product-list text-left text-md-center col-8 col-sm-9 col-md-12 d-flex flex-column rc-padding-left--none--mobile align-self-center align-self-md-start pr-0">
      <div className="product-name" title={item.goodsName}>
        {item.goodsName}
      </div>
      {item.technologyOrBreedsAttr ? (
        <div className="rc-card__meta">{item.technologyOrBreedsAttr}</div>
      ) : null}
      {!!+window.__.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS && (
        <InlineRatings productId={item.goodsNo} />
      )}
      <PriceItemShow item={item} configStore={configStore} />
    </div>
  );
}

const PriceItemShow = ({ item, configStore }) => {
  const priceDisplayMethod = configStore?.info?.storeVO?.priceDisplayMethod;
  // const priceDisplayMethod = 0;
  const PriceItemShowForH5 = (
    <>
      {item.fromPrice &&
      (priceDisplayMethod == 0 || priceDisplayMethod == 1) ? (
        <div className="product-price">
          <div className="card--product-contaner-price">
            {priceDisplayMethod == 0 &&
              (item.toPrice ? (
                <FormattedMessage
                  id="pirceRange"
                  values={{
                    fromPrice: (
                      <span className="contaner-price__value">
                        {formatMoney(item.fromPrice)}
                      </span>
                    ),
                    toPrice: (
                      <span className="contaner-price__value">
                        {formatMoney(item.toPrice)}
                      </span>
                    )
                  }}
                />
              ) : (
                <span className="contaner-price__value">
                  {formatMoney(item.fromPrice)}
                </span>
              ))}
            {priceDisplayMethod == 1 &&
              (window.__.env.REACT_APP_PLP_STYLE === 'layout-global' ? (
                <>
                  <div
                    className="text-left NameFitScreen"
                    style={{ color: 'rgb(74, 74, 74)', opacity: 2 }}
                  >
                    <FormattedMessage id="plpFromText" />
                  </div>
                  <div className="d-flex justify-content-center">
                    <div
                      className="rc-full-width PriceFitScreen"
                      style={{ fontSize: '1.25rem' }}
                    >
                      <span className="value sales card--product-contaner-price">
                        <span
                          className="contaner-price__value"
                          style={{
                            color: '#323232',
                            fontWeight: 400
                          }}
                        >
                          {formatMoney(item?.fromPrice)}
                        </span>
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="text-center NameFitScreen"
                    style={{
                      color: '#4a4a4a',
                      opacity: item?.goodsInfos
                        ? item?.goodsInfos.length
                        : '' > 1
                        ? 1
                        : 0
                    }}
                  >
                    <FormattedMessage id="startFrom" />
                  </div>
                  <div className=" text-center">
                    <span
                      style={{
                        color: '#323232',
                        fontWeight: 400
                      }}
                      className="contaner-price__value"
                    >
                      {formatMoney(item?.fromPrice)}
                    </span>
                  </div>
                </>
              ))}
          </div>
        </div>
      ) : null}
    </>
  );
  const PriceItemShowForPc = (
    <>
      {item?.fromPrice &&
      (priceDisplayMethod == 0 || priceDisplayMethod == 1) ? (
        <div className="d-flex justify-content-center">
          <div className="rc-card__price text-left PriceFitScreen">
            <div className={`rc-full-width PriceFitScreen`}>
              <span className="value sales card--product-contaner-price">
                {priceDisplayMethod == 0 &&
                  (item.toPrice ? (
                    <FormattedMessage
                      id="pirceRange"
                      values={{
                        fromPrice: (
                          <span className="contaner-price__value">
                            {formatMoney(item.fromPrice)}
                          </span>
                        ),
                        toPrice: (
                          <span className="contaner-price__value">
                            {formatMoney(item.toPrice)}
                          </span>
                        )
                      }}
                    />
                  ) : (
                    <span className="contaner-price__value">
                      {formatMoney(item.fromPrice)}
                    </span>
                  ))}
                {priceDisplayMethod == 1 &&
                  (window.__.env.REACT_APP_PLP_STYLE === 'layout-global' ? (
                    <>
                      <div
                        className="text-center NameFitScreen"
                        style={{ color: 'rgb(74, 74, 74)', opacity: 2 }}
                      >
                        <FormattedMessage id="plpFromText" />
                      </div>
                      <div className="d-flex justify-content-center">
                        <div
                          className="rc-full-width PriceFitScreen"
                          style={{ fontSize: '1.25rem' }}
                        >
                          <span className="value sales card--product-contaner-price">
                            <span
                              className="contaner-price__value"
                              style={{
                                color: '#323232',
                                fontWeight: 400
                              }}
                            >
                              {formatMoney(item?.fromPrice)}
                            </span>
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="text-center NameFitScreen"
                        style={{
                          color: '#4a4a4a',
                          opacity: item?.goodsInfos
                            ? item?.goodsInfos.length
                            : '' > 1
                            ? 1
                            : 0
                        }}
                      >
                        <FormattedMessage id="startFrom" />
                      </div>
                      <span
                        style={{
                          color: '#323232',
                          fontWeight: 400
                        }}
                        className="contaner-price__value"
                      >
                        {formatMoney(item?.fromPrice)}
                      </span>
                    </>
                  ))}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
  return (
    <>
      {isMobilePhone ? PriceItemShowForH5 : PriceItemShowForPc}
      {priceDisplayMethod == 2 ? (
        <div className={`d-flex justify-content-center for-no-global-price-h5`}>
          <div className="rc-card__price text-left PriceFitScreen">
            <div
              className={`rc-full-width PriceFitScreen flex justify-content-center for-no-global-price-h5`}
            >
              <span
                style={{
                  color: '#323232',
                  fontWeight: 400
                }}
                className="value sales"
              >
                {/* 最低marketPrice */}
                {item?.miMarketPrice
                  ? formatMoney(item.miMarketPrice)
                  : null}{' '}
                {/* 划线价 */}
                {item?.miLinePrice && item.miLinePrice > 0 ? (
                  <span
                    className="text-line-through rc-text-colour--text font-weight-lighter"
                    style={{
                      fontSize: '.8em'
                    }}
                  >
                    {formatMoney(item.miLinePrice)}
                  </span>
                ) : null}
              </span>
            </div>
            {item?.miSubscriptionPrice && item.miSubscriptionPrice > 0 ? (
              <div className="range position-relative SePriceScreen ">
                <span
                  style={{
                    color: '#323232',
                    fontWeight: 400
                  }}
                >
                  {formatMoney(item.miSubscriptionPrice)}{' '}
                </span>
                <span
                  className="iconfont font-weight-bold red mr-1"
                  style={{
                    fontSize: '.65em'
                  }}
                >
                  &#xe675;
                </span>
                <span
                  className="red-text text-nowrap"
                  style={{
                    fontSize: '.7em',
                    transform: 'translateY(-50%)'
                  }}
                >
                  <FormattedMessage id="autoshop" />
                </span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};
function ListItemBody({ item, headingTag, configStore }) {
  const goodHeading = `<${headingTag ? headingTag : 'h2'}
      class="rc-card__title rc-gamma rc-margin--none--mobile rc-margin-bottom--none--desktop ui-text-overflow-line2 product-title text-break text-center pl-4 pr-4"
      title="${item?.goodsName}">
      ${item?.goodsName}
  </${headingTag ? headingTag : 'h2'}>`;

  const defaultJSX = (
    <>
      <div className="height-product-tile-plpOnly">
        <div dangerouslySetInnerHTML={{ __html: goodHeading }} />
        {/*商品描述*/}
        <h6
          className="rc-card__meta text-center col-12 mt-2 mb-1 ui-text-overflow-line1"
          style={{ color: '#4a4a4a' }}
          title={item?.goodsNewSubtitle}
        >
          {item?.goodsNewSubtitle}
        </h6>
      </div>
      {/*商品评分和评论数目*/}
      <div
        className={`d-flex align-items-center justify-content-center rc-card__price RateFitScreen`}
      >
        <div>
          <Rate
            def={item?.avgEvaluate}
            disabled={true}
            marginSize="smallRate"
          />
        </div>
        <span className="comments rc-margin-left--xs rc-text-colour--text">
          ({item?.goodsEvaluateNum})
        </span>
      </div>
      <br />
      {/*商品价格*/}
      <PriceItemShow item={item} configStore={configStore} />
    </>
  );
  return (
    <div className="rc-card__body rc-padding-top--none pb-0 justify-content-start pl-0 pr-0 pc-product-card">
      {window.__.env.REACT_APP_PLP_STYLE === 'layout-global' ? (
        <>
          <div className="height-product-tile-plpOnly pl-4 pr-4">
            <div dangerouslySetInnerHTML={{ __html: goodHeading }} />
            {item?.technologyOrBreedsAttr ? (
              <p className="rc-card__meta text-center rc-padding-top--xs ui-text-overflow-line2">
                {item.technologyOrBreedsAttr}
              </p>
            ) : null}
          </div>
          {!!+window.__.env.REACT_APP_SHOW_BAZAARVOICE_RATINGS && (
            <InlineRatings productId={item.goodsNo} />
          )}
          <PriceItemShow item={item} configStore={configStore} />
          {item?.goodsNewSubtitle ? (
            <div
              className="rc-card__meta text-center ui-text-overflow-line2 col-12 pl-4 pr-4"
              style={{ marginBottom: '.625rem' }}
            >
              {item.goodsNewSubtitle}
            </div>
          ) : null}
        </>
      ) : (
        defaultJSX
      )}
    </div>
  );
}
@inject('configStore')
export default class PLPCover extends React.Component {
  static defaultProps = {
    showBorder: true
  };
  render() {
    const {
      item,
      isDogPage,
      sourceParam,
      GAListParam,
      breadListByDeco,
      headingTag,
      link,
      showBorder,
      className
    } = this.props;
    return window.__.env.REACT_APP_PLP_STYLE === 'layout-global' &&
      isMobilePhone ? (
      <ListItemH5ForGlobalStyle
        showBorder={showBorder}
        sourceParam={sourceParam}
        isDogPage={isDogPage}
        className={className}
        leftPromotionJSX={
          item?.taggingForText ? (
            <div
              className="product-item-flag-text fr-label"
              style={{
                backgroundColor: item.taggingForText.taggingFillColor,
                color: item.taggingForText.taggingFontColor
              }}
            >
              {item.taggingForText.taggingName}
            </div>
          ) : null
        }
        rightPromotionJSX={
          item?.taggingForImage ? (
            <div className="product-item-flag-image position-absolute">
              <img
                style={{
                  width: 'inherit',
                  height: 'inherit'
                }}
                src={item.taggingForImage.taggingImgUrl}
                alt="product list taggingForImage"
              />
            </div>
          ) : null
        }
        // onClick={this.hanldeItemClick.bind(this, item, i)}
        onClick={this.props.onClick}
        item={item}
        GAListParam={GAListParam}
        breadListByDeco={breadListByDeco}
        link={link}
      >
        <ListItemBodyH5ForGlobalStyle
          item={item}
          configStore={this.props.configStore}
        />
      </ListItemH5ForGlobalStyle>
    ) : (
      <>
        {/* <div className="col-6 col-md-4 mb-3 pl-2 pr-2 BoxFitMonileScreen"> */}
        <ListItemForDefault
          className={className}
          showBorder={showBorder}
          sourceParam={sourceParam}
          isDogPage={isDogPage}
          leftPromotionJSX={
            item?.taggingForText ? (
              <div
                className="product-item-flag-text"
                style={{
                  backgroundColor: item.taggingForText.taggingFillColor,
                  color: item.taggingForText.taggingFontColor
                }}
              >
                {item.taggingForText.taggingName}
              </div>
            ) : null
          }
          rightPromotionJSX={
            item?.taggingForImage ? (
              <div className="product-item-flag-image position-absolute">
                <img
                  src={item.taggingForImage.taggingImgUrl}
                  alt="product list taggingForImage"
                />
              </div>
            ) : null
          }
          // onClick={this.hanldeItemClick.bind(this, item, i)}
          onClick={this.props.onClick}
          item={item}
          GAListParam={GAListParam}
          breadListByDeco={breadListByDeco}
          link={link}
        >
          <ListItemBody
            configStore={this.props.configStore}
            item={item}
            headingTag={headingTag}
          />
        </ListItemForDefault>
        {/* </div> */}
      </>
    );
  }
}
