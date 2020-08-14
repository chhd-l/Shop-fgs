import React from 'react'
import Skeleton from 'react-skeleton-loader'
import { FormattedMessage, injectIntl } from 'react-intl'
import { inject, observer } from 'mobx-react'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BreadCrumbs from '@/components/BreadCrumbs'
import Filters from '@/components/Filters'
import Pagination from '@/components/Pagination'
import { cloneDeep, find, findIndex } from 'lodash'
import { getList, getProps, getLoginList } from '@/api/list'
import { queryStoreCateIds, formatMoney } from '@/utils/utils'
import { STORE_CATE_ENUM } from '@/utils/constant'
import Rate from '@/components/Rate'
import './index.css'

@inject("loginStore")
@observer
@injectIntl
class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeCateIds: [],
      category: '',
      titleData: null,
      productList: [
        // 占位用，不能删
        {
          id: '3000_RU',
          goodsName: 'Mini adult',
          goodsInfos: [
            {
              goodsInfoImg: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
              specText: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
              salePrice: 945
            }
          ]
        },
        {
          id: '3001_RU',
          goodsName: 'Mini adult',
          goodsInfos: [
            {
              goodsInfoImg: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
              specText: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
              salePrice: 945
            }
          ]
        },
        {
          id: '3002_RU',
          goodsName: 'Mini adult',
          goodsInfos: [
            {
              goodsInfoImg: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
              specText: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
              salePrice: 945
            }
          ]
        },
        {
          id: '3003_RU',
          goodsName: 'Mini adult',
          goodsInfos: [
            {
              goodsInfoImg: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
              specText: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
              salePrice: 945
            }
          ]
        },
        {
          id: '3004_RU',
          goodsName: 'Mini adult',
          goodsInfos: [
            {
              goodsInfoImg: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
              specText: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
              salePrice: 945
            }
          ]
        },
        {
          id: '3005_RU',
          goodsName: 'Mini adult',
          goodsInfos: [
            {
              goodsInfoImg: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
              specText: 'Mini Edalt: dry food for dogs aged 10 months to 8 years',
              salePrice: 945
            }
          ]
        }
      ],
      loading: true,
      checkedList: [],
      currentPage: 1,
      totalPage: 1, // 总页数
      results: 0, // 总数据条数
      pageSize: 12,
      keywords: '',
      filterList: [],
      initingFilter: true,
      initingList: true,
      filterModalVisible: false,
      currentCatogery: '',
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.hanldeItemClick = this.hanldeItemClick.bind(this)
    this.toggleFilterModal = this.toggleFilterModal.bind(this)
  }
  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  get isLogin () {
    return this.props.loginStore.isLogin
  }
  toggleFilterModal (status) {
    this.setState({ filterModalVisible: status })
  }
  async initData () {
    const { category } = this.state
    let storeIdList = await queryStoreCateIds()
    const t = find(STORE_CATE_ENUM, ele => ele.category == category)
    if (t) {
      let tmpArr = Array.from(storeIdList, s => t.cateName.includes(s.cateName) ? s.storeCateId : '').filter(s => !!s)
      this.setState({
        storeCateIds: tmpArr,
        currentCatogery: t.text
      })
      if (t.title && t.desc && t.img) {
        this.setState({
          titleData: {
            title: t.title,
            description: t.desc,
            img: t.img
          }
        })
      }
      console.log(t)
    }

    let lang = process.env.REACT_APP_LANG
    if (lang != 'de') {
      this.getProductList()
    } else {
      this.getProductList(lang + '_' + category)
    }


  }
  componentDidMount () {

    console.log(localStorage.getItem("isRefresh"))
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
    this.setState({
      category: this.props.match.params.category
    }, () => {
      const { category } = this.state
      this.initData()
      if (category.toLocaleLowerCase() === 'keywords') {
        this.setState({
          keywords: this.props.match.params.keywords
        })
      }
    })
  }
  async getProductList (type) {
    let { checkedList, currentPage, pageSize, storeCateIds, keywords, initingList, category } = this.state;
    this.setState({ loading: true })

    if (!initingList) {
      const widget = document.querySelector('#J-product-list')
      if (widget) {
        setTimeout(() => {
          window.scrollTo({
            top: widget.offsetTop - 100,
            behavior: 'smooth'
          });
        }, 0)
      }
    }

    let params = {
      storeId: process.env.REACT_APP_STOREID,
      cateId: process.env.REACT_APP_CATEID,
      propDetails: [],
      pageNum: currentPage - 1,
      brandIds: [],
      sortFlag: 0,
      pageSize,
      esGoodsInfoDTOList: [],
      companyType: '',
      keywords,
      storeCateIds
    }

    switch (type) {
      case 'de_cats':
        console.log('de_cats')
        params.propDetails = [{ propId: 481, detailIds: [1784] }]
        break;
      case 'de_dogs':
        console.log('de_dogs')
        params.propDetails = [{ propId: 481, detailIds: [1783] }]
        break;
      default:
        console.log('otherLang')
        for (let item of checkedList) {
          let tmp = find(params.propDetails, p => p.propId === item.propId)
          if (tmp) {
            tmp.detailIds.push(item.detailId)
          } else {
            params.propDetails.push({ propId: item.propId, detailIds: [item.detailId] })
          }
        }
    }


    let tmpList

    if (this.isLogin) {
      tmpList = getLoginList
    } else {
      tmpList = getList
    }
    tmpList(params)
      .then(res => {
        this.setState({ loading: false, initingList: false })
        const esGoods = res.context.esGoods
        if (esGoods && esGoods.content.length) {
          let goodsContent = esGoods.content
          if (res.context.goodsList) {
            goodsContent = goodsContent.map(ele => {
              let ret = Object.assign({}, ele)
              const tmpItem = find(res.context.goodsList, g => g.goodsId === ele.id)
              if (tmpItem) {
                const { goodsCateName, goodsSubtitle, subscriptionStatus, avgEvaluate, minMarketPrice, goodsImg, ...others } = tmpItem
                ret = Object.assign(ret, {
                  goodsCateName,
                  goodsSubtitle,
                  subscriptionStatus,
                  avgEvaluate,
                  minMarketPrice,
                  goodsImg
                })
              }
              return ret
            })
          }
          this.setState({
            productList: goodsContent,
            results: esGoods.totalElements,
            currentPage: esGoods.number + 1,
            totalPage: esGoods.totalPages
          }, () => {
            console.log("productList", this.state.productList)
          })
        } else {
          this.setState({
            productList: [],
            results: 0
          })
        }
      })
      .catch(() => {
        this.setState({ loading: false, productList: [] })
      })


    if (!this.state.filterList.length) {
      getProps(process.env.REACT_APP_CATEID)
        .then(res => {
          // res = JSON.parse('{"code":"K-000000","message":"Operación exitosa","errorData":null,"context":[{"propId":470,"cateId":1129,"propName":"Etapa de Vida","indexFlag":1,"createTime":"2020-05-05 18:10:30.000","updateTime":"2020-08-12 08:29:36.000","delFlag":0,"sort":1,"goodsPropDetails":[{"detailId":1754,"propId":470,"detailName":"Cachorro","createTime":"2020-05-05 18:10:30.000","updateTime":"2020-08-12 08:29:36.000","delFlag":0,"sort":0},{"detailId":1751,"propId":470,"detailName":"Adulto","createTime":"2020-05-05 18:10:30.000","updateTime":"2020-08-12 08:29:36.000","delFlag":0,"sort":1},{"detailId":1752,"propId":470,"detailName":"Maduro","createTime":"2020-05-05 18:10:30.000","updateTime":"2020-08-12 08:29:36.000","delFlag":0,"sort":2},{"detailId":1753,"propId":470,"detailName":"Mayor","createTime":"2020-05-05 18:10:30.000","updateTime":"2020-08-12 08:29:36.000","delFlag":0,"sort":3},{"detailId":1779,"propId":470,"detailName":"Gatito","createTime":"2020-05-07 11:59:11.000","updateTime":"2020-08-12 08:29:36.000","delFlag":0,"sort":4}],"propDetailStr":null},{"propId":471,"cateId":1129,"propName":"Talla","indexFlag":1,"createTime":"2020-05-05 18:21:38.000","updateTime":"2020-08-12 08:30:11.000","delFlag":0,"sort":2,"goodsPropDetails":[{"detailId":1755,"propId":471,"detailName":"Minuatura","createTime":"2020-05-05 18:21:38.000","updateTime":"2020-08-12 08:30:11.000","delFlag":0,"sort":0},{"detailId":1756,"propId":471,"detailName":"Pequeño","createTime":"2020-05-05 18:21:38.000","updateTime":"2020-08-12 08:30:11.000","delFlag":0,"sort":1},{"detailId":1757,"propId":471,"detailName":"Mediano","createTime":"2020-05-05 18:21:38.000","updateTime":"2020-08-12 08:30:11.000","delFlag":0,"sort":2},{"detailId":1758,"propId":471,"detailName":"Grande","createTime":"2020-05-05 18:21:38.000","updateTime":"2020-08-12 08:30:11.000","delFlag":0,"sort":3},{"detailId":1759,"propId":471,"detailName":"Gigante","createTime":"2020-05-05 18:21:38.000","updateTime":"2020-08-12 08:30:11.000","delFlag":0,"sort":4}],"propDetailStr":null},{"propId":472,"cateId":1129,"propName":"Necesidades especiales","indexFlag":1,"createTime":"2020-05-05 18:39:49.000","updateTime":"2020-05-05 18:46:48.000","delFlag":0,"sort":3,"goodsPropDetails":[{"detailId":1760,"propId":472,"detailName":"Envejecimiento saludable","createTime":"2020-05-05 18:39:49.000","updateTime":"2020-05-05 18:46:48.000","delFlag":0,"sort":0},{"detailId":1761,"propId":472,"detailName":"Soporte cardiaco","createTime":"2020-05-05 18:39:49.000","updateTime":"2020-05-05 18:46:48.000","delFlag":0,"sort":1},{"detailId":1762,"propId":472,"detailName":"Apoyo para la diabetes","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":2},{"detailId":1763,"propId":472,"detailName":"Apoyo digestivo","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":3},{"detailId":1764,"propId":472,"detailName":"Apoyo de las articulaciones","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":4},{"detailId":1765,"propId":472,"detailName":"Higiene oral / dental","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":5},{"detailId":1766,"propId":472,"detailName":"Sensibilidades alimentarias","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":6},{"detailId":1767,"propId":472,"detailName":"Apoyo renal","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":7},{"detailId":1768,"propId":472,"detailName":"Soporte del hígado","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":8},{"detailId":1769,"propId":472,"detailName":"Soporte de piel y pelaje","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":9},{"detailId":1770,"propId":472,"detailName":"Soporte urinario","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":10},{"detailId":1771,"propId":472,"detailName":"Control de peso","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":11},{"detailId":1772,"propId":472,"detailName":"Convalecencia","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":12},{"detailId":1773,"propId":472,"detailName":"Sensibilidad de la piel","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":13},{"detailId":1774,"propId":472,"detailName":"Sensibilidad digestiva","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":14},{"detailId":1775,"propId":472,"detailName":"Sensibilidad articular","createTime":"2020-05-05 18:46:48.000","updateTime":null,"delFlag":0,"sort":15}],"propDetailStr":null},{"propId":473,"cateId":1129,"propName":"Seco/Húmedo","indexFlag":1,"createTime":"2020-05-05 18:54:49.000","updateTime":null,"delFlag":0,"sort":4,"goodsPropDetails":[{"detailId":1776,"propId":473,"detailName":"Seco","createTime":"2020-05-05 18:54:49.000","updateTime":null,"delFlag":0,"sort":0},{"detailId":1777,"propId":473,"detailName":"Húmedo","createTime":"2020-05-05 18:54:49.000","updateTime":null,"delFlag":0,"sort":1},{"detailId":1778,"propId":473,"detailName":"Otro","createTime":"2020-05-05 18:54:49.000","updateTime":null,"delFlag":0,"sort":2}],"propDetailStr":null}],"defaultLocalDateTime":"2020-08-14 11:54:41.553"}')
          // debugger
          let tmpList = res.context
          let tmpItem = find(tmpList, v => v.propName === 'Etapa de Vida')
          if (category === 'cats' || category === 'vd' || category === 'prescription-cats') {
            tmpList = res.context.filter(v => v.propName !== 'Talla')
            if (tmpItem) {
              tmpItem.goodsPropDetails = tmpItem.goodsPropDetails.filter(v => v.detailName !== 'Cachorro' && v.detailName !== 'Mayor')
            }
            if (category === 'vd') {
              let tmpSecoItem = find(tmpList, v => v.propName === 'Seco/Húmedo')
              tmpSecoItem.goodsPropDetails = tmpSecoItem.goodsPropDetails.filter(v => v.detailName !== 'Otro')
            }
          }
          if ((category === 'dogs' || category === 'vcn' || category === 'prescription-dogs') && tmpItem) {
            tmpItem.goodsPropDetails = tmpItem.goodsPropDetails.filter(v => v.detailName !== 'Gatito' && v.detailName !== 'Mayor')
            let tmpTallaItem = find(tmpList, v => v.propName === 'Talla')
            tmpTallaItem.goodsPropDetails = tmpTallaItem.goodsPropDetails.filter(v => v.detailName !== 'Minuatura' && v.detailName !== 'Grande')

            let tmpSecoItem = find(tmpList, v => v.propName === 'Seco/Húmedo')
            tmpSecoItem.goodsPropDetails = tmpSecoItem.goodsPropDetails.filter(v => v.detailName !== 'Otro')
          }


          let lang = process.env.REACT_APP_LANG

          //德国猫，德国狗，直接勾选出条件
          const condition = lang + '_' + category
          let checkedListTemp
          switch (condition) {
            case 'de_cats':
              console.log('de_cats')
              checkedListTemp = tmpList.filter(item => item.propId === 481)[0].goodsPropDetails.filter(item => item.detailId === 1784)
              this.setState({
                checkedList: checkedListTemp
              })
              break;
            case 'de_dogs':
              console.log('de_cats')
              checkedListTemp = tmpList.filter(item => item.propId === 481)[0].goodsPropDetails.filter(item => item.detailId === 1783)
              this.setState({
                checkedList: checkedListTemp
              })
              break;
          }


          this.setState({
            filterList: tmpList,
            initingFilter: false,
          })



        })
        .catch(() => {
          this.setState({ initingFilter: false })
        })
    }
  }
  handleFilterChange (item) {
    const { checkedList } = this.state;
    let checkedListCopy = cloneDeep(checkedList);
    let index = findIndex(checkedListCopy, c => c.detailId === item.detailId && c.propId === item.propId)
    if (index > -1) {
      checkedListCopy.splice(index, 1)
    } else {
      checkedListCopy.push(item)
    }

    this.setState({ checkedList: checkedListCopy, currentPage: 1 }, () => this.getProductList())
  }
  handleRemove (item) {
    const { checkedList } = this.state;
    let checkedListCopy = cloneDeep(checkedList);
    let res
    if (item === 'all') {
      res = []
    } else {
      checkedListCopy.splice(findIndex(checkedListCopy, c => c.detailId === item.detailId && c.propId === item.propId), 1)
      res = checkedListCopy
    }
    this.setState({ checkedList: res, currentPage: 1 }, () => this.getProductList())
  }
  hanldePageNumChange (params) {
    this.setState({
      currentPage: params.currentPage
    }, () => this.getProductList())
  }
  hanldeItemClick (item) {
    if (this.state.loading) {
      return false
    }
    sessionStorage.setItem('rc-goods-cate-name', this.state.currentCatogery || '')
    sessionStorage.setItem('recomment-preview', this.props.location.pathname)
    sessionStorage.setItem('rc-goods-name', item.goodsName)
    const { history } = this.props
    history.push('/details/' + item.goodsInfos[0].goodsInfoId)
  }
  render () {
    const { category, results, productList, loading, checkedList, titleData } = this.state
    let event
    if (category) {
      let theme
      let type
      switch (category) {
        case 'dogs':
        case 'vcn':
          theme = 'Dog'
          type = 'Product Catalogue'
          break
        case 'cats':
        case 'vd':
          theme = 'Cat'
          type = 'Product Catalogue'
          break
        default:
          theme = ''
          type = 'Search Results'
      }
      event = {
        page: {
          type,
          theme
        }
      }
    }
    return (
      <div>
        {event ? <GoogleTagManager additionalEvents={event} /> : null}
        <Header showMiniIcons={true} showUserIcon={true} location={this.props.location} history={this.props.history} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          {titleData ?
            <div className="content-block__wrapper_ rc-bg-colour--brand3 rc-margin-bottom--xs">
              <div className="layout-container_ two-column_ rc-layout-container rc-two-column rc-max-width--lg rc-content-h-middle">
                <div className="rc-column pt-0 pb-0">
                  <div className="rc-full-width rc-text--left rc-padding-x--sm">
                    <h1 className="rc-alpha">{titleData.title}</h1>
                    <p>{titleData.description}</p>
                  </div>
                </div>
                <div className="rc-column pt-0 pb-0">
                  <img
                    className="mw-100"
                    src={titleData.img}
                    style={{ width: '63%', margin: '0 auto' }} />
                </div>
              </div>
            </div>
            : ''}
          <div id="J-product-list"></div>
          <div className="search-results rc-padding--sm rc-max-width--xl pt-4 pt-sm-1">
            <div className="search-nav border-bottom-0">
              {this.state.keywords ?
                <div className="nav-tabs-wrapper rc-text--center">
                  <div className="rc-intro"><FormattedMessage id="list.youSearchedFor" />:</div>
                  <div className="rc-beta rc-padding-bottom--sm rc-margin-bottom--none searchText"><b>"{this.state.keywords}"</b>(<FormattedMessage id="results" /> {results})</div>
                </div> : null}
            </div>
            <section className="rc-bg-colour--brand3">
              <div>
                <div className="rc-layout-container rc-four-column position-relative" id="J_filter_contaner">
                  <div className="refinements-fixed rc-column" style={{ position: 'fixed', display: 'none', background: '#fff', zIndex: 22 }}>
                    <button className="rc-md-down rc-btn rc-btn--icon-label rc-icon rc-filter--xs rc-iconography"
                      data-filter-trigger="filter-example" onClick={() => this.toggleFilterModal(true)}><FormattedMessage id="filters" /></button>
                    <aside className={['rc-filters', this.state.filterModalVisible ? 'active' : ''].join(' ')}>
                      <Filters
                        initing={this.state.initingFilter}
                        onChange={this.handleFilterChange}
                        onRemove={this.handleRemove}
                        onToggleFilterModal={this.toggleFilterModal}
                        filterList={this.state.filterList}
                        checkedList={checkedList} />
                    </aside>
                  </div>
                  <div className="refinements rc-column ItemBoxFitSCreen" style={{ top: '-45px' }}>
                    <button className="rc-md-down rc-btn rc-btn--icon-label rc-icon rc-filter--xs rc-iconography FilterFitScreen"
                      data-filter-trigger="filter-example"
                      onClick={() => this.toggleFilterModal(true)}><FormattedMessage id="filters" /></button>
                    <aside className={['rc-filters', this.state.filterModalVisible ? 'active' : ''].join(' ')}>
                      <Filters
                        initing={this.state.initingFilter}
                        onChange={this.handleFilterChange}
                        onRemove={this.handleRemove}
                        onToggleFilterModal={this.toggleFilterModal}
                        filterList={this.state.filterList}
                        checkedList={checkedList} />
                    </aside>
                  </div>
                  <div className={['rc-column', 'rc-triple-width', !productList.length ? 'd-flex justify-content-center align-items-center' : ''].join(' ')}>
                    {
                      !loading && <div className="ListTotal" >
                        <span style={{ fontWeight: 500 }}>{this.state.currentCatogery}{' '}</span>({results} <FormattedMessage id="results" />)
                      </div>
                    }
                    {!productList.length
                      ?
                      <>
                        <div className="ui-font-nothing rc-md-up">
                          <i className="rc-icon rc-incompatible--sm rc-iconography"></i>
                          <FormattedMessage id="list.errMsg" />
                        </div>
                        <div className="ui-font-nothing rc-md-down d-flex">
                          <i className="rc-icon rc-incompatible--xs rc-iconography"></i>
                          <FormattedMessage id="list.errMsg" />
                        </div>
                      </>
                      :
                      <div className="row RowFitScreen">
                        {productList.map(item => (
                          <div className="col-6 col-md-4 mb-3 pl-2 pr-2 BoxFitMonileScreen" key={item.id}>
                            <article className="rc-card rc-card--product" style={{ minHeight: '120px' }}>
                              <div className="fullHeight">
                                <a onClick={() => this.hanldeItemClick(item)} className="ui-cursor-pointer">
                                  <article className="rc-card--a rc-text--center text-center">
                                    {
                                      loading
                                        ? <span className="mt-4"><Skeleton color="#f5f5f5" width="100%" height="50%" count={2} /></span>
                                        : <>
                                          <picture className="rc-card__image">
                                            <div
                                              className="rc-padding-bottom--xs d-flex justify-content-center align-items-center ImgBoxFitScreen"
                                              style={{ height: '15.7rem' }}>
                                              <img
                                                src={item.goodsImg || item.goodsInfos.sort((a, b) => a.marketPrice - b.marketPrice)[0].goodsInfoImg}
                                                srcSet={item.goodsImg || item.goodsInfos.sort((a, b) => a.marketPrice - b.marketPrice)[0].goodsInfoImg}
                                                alt={item.goodsName}
                                                title={item.goodsName}
                                                className="ImgFitScreen pt-3"
                                                style={{ maxWidth: '50%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                              />
                                            </div>
                                          </picture>
                                          <div className="rc-card__body rc-padding-top--none pb-0 justify-content-start">
                                            <div className="height-product-tile-plpOnly">
                                              <header className="rc-text--center">
                                                <h3
                                                  className="rc-card__title rc-gamma ui-text-overflow-line2 text-break mb-1 TitleFitScreen product-title"
                                                  title={item.goodsName}>
                                                  {item.goodsName}
                                                </h3>
                                              </header>
                                              <div
                                                className={`ui-text-overflow-line1 text-break sub-hover text-center SubTitleScreen`}
                                                title={item.goodsSubtitle}
                                                style={{ color: '#4a4a4a' }}>
                                                {item.goodsSubtitle}
                                              </div>
                                            </div>
                                            <div className={`rc-card__price text-center RateFitScreen `} >
                                              <div className="display-inline">
                                                <Rate def={item.avgEvaluate} disabled={true} marginSize="smallRate" />
                                              </div>
                                              <span className='comments rc-margin-left--xs rc-text-colour--text'>({item.goodsEvaluateNum})</span>
                                            </div>
                                            <div className="text-center NameFitScreen" style={{ color: '#4a4a4a', opacity: item.goodsInfos.length > 1 ? 1 : 0 }}>
                                              <FormattedMessage id="startFrom" />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                              <div className="rc-card__price text-left PriceFitScreen" >
                                                <div className={`rc-full-width PriceFitScreen`} >
                                                  <span style={{ color: '#323232', fontWeight: 400 }} >
                                                    {formatMoney(Math.min.apply(null, item.goodsInfos.map(g => g.marketPrice || 0)))}{' '}
                                                    {
                                                      item.goodsInfos.sort((a, b) => a.marketPrice - b.marketPrice)[0].linePrice && item.goodsInfos.sort((a, b) => a.marketPrice - b.marketPrice)[0].linePrice > 0
                                                        ? <span className="text-line-through rc-text-colour--text font-weight-lighter" style={{ fontSize: '.8em' }}>
                                                          {formatMoney(item.goodsInfos.sort((a, b) => a.marketPrice - b.marketPrice)[0].linePrice)}
                                                        </span>
                                                        : null
                                                    }

                                                  </span>
                                                </div>
                                                {
                                                  find(item.goodsInfos, ele => ele.subscriptionStatus)
                                                    && Math.min.apply(null, item.goodsInfos.filter(g => g.subscriptionStatus).map(g => g.subscriptionPrice || 0)) > 0
                                                    ? <div className="range position-relative SePriceScreen">
                                                      <span style={{ color: '#323232', fontWeight: 400 }}>
                                                        {formatMoney(Math.min.apply(null, item.goodsInfos.filter(g => g.subscriptionStatus).map(g => g.subscriptionPrice || 0)))}{' '}
                                                      </span>
                                                      <span className="iconfont font-weight-bold red mr-1" style={{ fontSize: '.65em' }}>&#xe675;</span>
                                                      <span
                                                        className="position-relative red-text position-absolute"
                                                        style={{ fontSize: '.7em', top: '52%', transform: 'translateY(-50%)', whiteSpace: 'nowrap' }}>
                                                        <FormattedMessage id="autoshop" />
                                                      </span>
                                                    </div>
                                                    : null
                                                }
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                    }
                                  </article>
                                </a>
                              </div>
                            </article>
                          </div>
                        ))}
                        <div className="grid-footer rc-full-width">
                          <Pagination
                            loading={this.state.loading}
                            currentPage={this.state.currentPage}
                            totalPage={this.state.totalPage}
                            onPageNumChange={params => this.hanldePageNumChange(params)} />
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div >
    );
  }
}

export default List
