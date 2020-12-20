import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { getDictionary } from '@/utils/utils';
function BreadCrumbsNavigation({ list, history }) {
  const decoList = [
    { name: <FormattedMessage id="homePage" />, link: '/' },
    ...list
  ];
  async function handleClickNavItem(item) {
    // 点击menu埋点-start
    // this.GAClickMenu({
    //   category: 'menu',
    //   action: 'menu',
    //   label: item.avigationLink,
    //   value: item.navigationName
    // });
    // 点击menu埋点-end
    let res = await getDictionary({ type: 'pageType' });
    const targetRes = res.filter((ele) => ele.id === item.pageId);
    // interaction 0-page 1-External URL 2-text
    if (item.interaction === 2) {
      return false;
    } else if (item.interaction === 0 && targetRes.length) {
      let linkObj = null;
      let sortParam = null;
      let cateIds = [];
      let filters = [];
      const pageVal = targetRes[0].valueEn;
      if (pageVal) linkObj = { pathname: `${item.navigationLink}` };
      switch (pageVal) {
        case 'PLP':
        case 'SRP':
          // 获取sort参数
          if (item.searchSort) {
            const sortRes = await findSortList();
            const targetSortRes = (sortRes.context || []).filter(
              (ele) => ele.id === item.searchSort
            );
            if (targetSortRes.length) {
              sortParam = {
                field: targetSortRes[0].field,
                sortType: targetSortRes[0].sortType
              };
            }
          }
          // sales category筛选
          const tmpCateIds = (item.navigationCateIds || '').split(',');
          if (tmpCateIds.length) {
            cateIds = tmpCateIds;
          }
          // filter筛选
          try {
            if (item.filter) {
              const tmpFilter = JSON.parse(item.filter);
              if (tmpFilter.length) {
                filters = tmpFilter;
              }
            }
          } catch (err) {}
          if (pageVal === 'SRP') {
            linkObj = Object.assign(linkObj, {
              search: `?${item.keywords}`
            });
          }
          break;
        case 'PDP':
          linkObj = Object.assign(linkObj, {
            pathname: `${item.navigationLink}${item.paramsField}`
          });
          // link = `/details/${item.paramsField}`;
          break;
        // case 'HP':
        //   link = '/';
        //   break;
        // case 'SP':
        //   link = `${
        //     {
        //       en: '/subscription-landing-us',
        //       ru: '/subscription-landing-ru',
        //       tr: '/subscription-landing-tr'
        //     }[process.env.REACT_APP_LANG] || '/subscription-landing'
        //   }`;
        //   break;
        // case 'CUP':
        //   link = '/help';
        //   break;
        default:
          break;
      }
      if (linkObj && linkObj.pathname) {
        linkObj = Object.assign(linkObj, {
          state: { sortParam, cateIds, filters }
        });
        
        history.push(linkObj);
        // this.props.history.push({
        //   pathname: link,
        //   state: { sortParam, cateIds, filters },
        //   search: `?${item.keywords}`
        // });
      }
    }
  }
  return (
    <div
      className="rc-bg-colour--brand3 rc-md-up"
      style={{ paddingTop: '1px' }}
    >
      <div className="rc-progress--breadcrumbs-stepped rc-max-width--xl rc-padding-x--sm rc-padding-y--xs">
        <ul
          className="d-flex"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {decoList.map((item, index) => (
            <React.Fragment key={index}>
              <li
                itemScope
                itemProp="itemListElement"
                itemType="https://schema.org/ListItem"
              >
                {item.link ? (
                  history?
                  <span className="rc-styled-link rc-progress__breadcrumb mr-0" 
                    itemProp="name" 
                    style={{cursor:'pointer'}}
                    onClick={()=>{handleClickNavItem(item)}}>{item.name}</span>:
                  <Link
                    className="rc-styled-link rc-progress__breadcrumb mr-0"
                    itemType="https://schema.org/Thing"
                    itemProp="item"
                    to={item.link}
                  >
                    <span itemProp="name">{item.name}</span>
                  </Link>
                ) : (
                  <span itemProp="name">{item.name}</span>
                )}
              </li>
              {index !== decoList.length - 1 && (
                <span className="font-weight-normal ml-2 mr-2">&gt;</span>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BreadCrumbsNavigation;
