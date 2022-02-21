import React, { Component } from 'react';
import { queryStoreCateList, optimizeImage } from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import cn from 'classnames';

class SalesCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryLoading: true
    };
  }
  render() {
    const { categoryList } = this.state;
    const curListNum = categoryList.length;
    const _catogeryJXS2 = categoryList.map((ele, i) => (
      <div
        className={`col-6 ${
          curListNum >= 6
            ? curListNum >= 15
              ? 'col-md-3'
              : 'col-md-4'
            : 'col-md-3'
        }`}
        key={i}
      >
        <Link
          className="rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link"
          to={{
            pathname: `${
              ele.cateRouter && ele.cateRouter.startsWith('/')
                ? ele.cateRouter
                : `/${ele.cateRouter}`
            }`,
            state: {
              GAListParam: 'Catalogue'
            }
          }}
          title={ele.cateName}
        >
          <picture className="category-cards__card__img">
            <source srcSet={ele.cateImgForHome} />
            <LazyLoad height={300}>
              <img
                src={optimizeImage({
                  originImageUrl: ele.cateImgForHome,
                  width: 200
                })}
                alt={`${ele.cateName} product image`}
                title={ele.altName}
                style={{ width: '144px' }}
              />
            </LazyLoad>
          </picture>
          <div className="rc-text--center rc-intro category-cards__card__text rc-margin--none inherit-fontsize rc-padding-x--xs">
            <h3 className="rc-margin--none">{ele.cateName}</h3>
          </div>
        </Link>
      </div>
    ));

    const pcTwoRows = curListNum >= 6;

    return (
      <section>
        <div className="rc-bg-colour--brand3 rc-margin-bottom--xs">
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile category-cards rc-padding--sm">
            <div
              className={cn('rc-match-heights text-center md:text-left', {
                row: !pcTwoRows
              })}
            >
              <div
                className={cn('col-12 col-lg-3 align-self-center', {
                  DeCenter: pcTwoRows
                })}
              >
                <h2
                  className={cn(
                    'rc-beta rc-margin--none rc-padding--xs rc-padding--lg--mobile text-center rc-padding-top--none',
                    { 'md:pb-6': pcTwoRows }
                  )}
                >
                  <FormattedMessage id="home.productsCategory" />
                </h2>
              </div>
              <div className={cn('col-12 col-lg-9', { DeCenter: pcTwoRows })}>
                <div className="row custom-gutter">
                  <span className="hidden rc-card rc-card--a rc-margin-bottom--xs--mobile category-cards__card fullHeight gtm-cat-link" />
                  {_catogeryJXS2}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  componentDidMount() {
    queryStoreCateList().then((res) => {
      let _res = (res || []).sort((a, b) => a.sort - b.sort);
      let tmpRes = _res.filter((item) => item.displayStatus === true);
      this.setState({ categoryList: tmpRes, categoryLoading: false });
    });
  }
}
export default SalesCategory;
