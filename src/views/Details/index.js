import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BreadCrumbs from '@/components/BreadCrumbs'
import InterestedIn from '@/components/InterestedIn'
import { createHashHistory } from 'history'
import './index.css'
import { cloneDeep } from 'lodash'

class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {
        id: '',
        name: '',
        // pictureCfg: {
        //   list: [
        //     {
        //       source1: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=500&fm=jpg&auto=compress',
        //       source2: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=250&fm=jpg&auto=compress',
        //       source3: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=150&fm=jpg&auto=compress',
        //       img: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=250&fm=jpg&auto=compress'
        //     }
        //   ],
        //   thumbnail: [
        //     'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=64&fm=jpg&auto=compress',
        //   ]
        // },
        pictureCfg: {
          list: [
            {
              source1: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=500&fm=jpg&auto=compress',
              source2: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=250&fm=jpg&auto=compress',
              source3: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=150&fm=jpg&auto=compress',
              img: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=250&fm=jpg&auto=compress'
            },
            {
              source1: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=500&fm=jpg&auto=compress',
              source2: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=250&fm=jpg&auto=compress',
              source3: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=150&fm=jpg&auto=compress',
              img: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=250&fm=jpg&auto=compress'
            },
            {
              source1: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=500&fm=jpg&auto=compress',
              source2: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=250&fm=jpg&auto=compress',
              source3: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=150&fm=jpg&auto=compress',
              img: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=250&fm=jpg&auto=compress'
            },
            {
              source1: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=500&fm=jpg&auto=compress',
              source2: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=250&fm=jpg&auto=compress',
              source3: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=150&fm=jpg&auto=compress',
              img: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=250&fm=jpg&auto=compress'
            },
            {
              source1: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=500&fm=jpg&auto=compress',
              source2: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=250&fm=jpg&auto=compress',
              source3: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=150&fm=jpg&auto=compress',
              img: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=250&fm=jpg&auto=compress'
            },
            {
              source1: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=500&fm=jpg&auto=compress',
              source2: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=250&fm=jpg&auto=compress',
              source3: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=150&fm=jpg&auto=compress',
              img: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=250&fm=jpg&auto=compress'
            }
          ],
          thumbnail: [
            'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=64&fm=jpg&auto=compress',
            'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=64&fm=jpg&auto=compress',
            'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=64&fm=jpg&auto=compress',
            'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=64&fm=jpg&auto=compress',
            'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=64&fm=jpg&auto=compress',
            'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=64&fm=jpg&auto=compress'
          ]
        },
        description: '',
        reference: 0,
        sizeList: []
      },
      quantity: 1,
      quantityMaxLimit: 10,
      quantityMinLimit: 1,
      instockStatus: true,
      currentPrice: 0,
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : []
    }
    this.changeAmount = this.changeAmount.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleChooseSize = this.handleChooseSize.bind(this)
    this.hanldeAddToCart = this.hanldeAddToCart.bind(this)
    this.headerRef = React.createRef();
  }
  componentWillMount () {
    // var deleteJs = document.getElementById('js-royal-canin')
    // if (deleteJs) {
    //   deleteJs.parentNode.removeChild(deleteJs)
    // var head = document.getElementsByTagName('head')[0];
    // var script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = 'http://localhost:3000/royal/royal-canin.js?V=2';
    // head.appendChild(script)
    // }
  }
  componentDidMount () {
    this.setState({
      id: this.props.match.params.id
    }, () => this.getDetails())
    // var head = document.getElementsByTagName('head')[0];
    // var script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = 'http://localhost:3000/royal/royal-canin.js?V=2';
    // head.appendChild(script)
  }
  getDetails () {
    const { id } = this.state
    let res = {
      id: id,
      name: 'Miniddd adult',
      url: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png',
      img: 'https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=150&amp;sfrm=png, https://www.shop.royal-canin.ru/dw/image/v2/BCMK_PRD/on/demandware.static/-/Sites-royal_canin_catalog_ru/default/dw762ac7d3/products/RU/packshot_2018_SHN_DRY_Mini_Adult_4.jpg?sw=300&amp;sfrm=png 2x',
      description: 'Mini Edalt: dry food for dogs aged 10 months to 8 years. MINI Adult is specially designed for dogs of small breeds (weighing from 4 to 10 kg). In the nutrition of dogs of small breeds, not only the adapted croquet size is important. They need more energy than large dogs, their growth period is shorter and their growth is more intense. As a rule, they live longer than large dogs, and are more picky in their diet.<ul><li>dsdsds</li></ul>',
      reference: 2323,
      pictureCfg: {
        list: [
          {
            source1: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=500&fm=jpg&auto=compress',
            source2: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=250&fm=jpg&auto=compress',
            source3: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=150&fm=jpg&auto=compress',
            img: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=250&fm=jpg&auto=compress'
          },
          {
            source1: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=500&fm=jpg&auto=compress',
            source2: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=250&fm=jpg&auto=compress',
            source3: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=150&fm=jpg&auto=compress',
            img: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=250&fm=jpg&auto=compress'
          },
          {
            source1: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=500&fm=jpg&auto=compress',
            source2: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=250&fm=jpg&auto=compress',
            source3: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=150&fm=jpg&auto=compress',
            img: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=250&fm=jpg&auto=compress'
          },
          {
            source1: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=500&fm=jpg&auto=compress',
            source2: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=250&fm=jpg&auto=compress',
            source3: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=150&fm=jpg&auto=compress',
            img: 'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=250&fm=jpg&auto=compress'
          },
          {
            source1: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=500&fm=jpg&auto=compress',
            source2: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=250&fm=jpg&auto=compress',
            source3: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=150&fm=jpg&auto=compress',
            img: 'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=250&fm=jpg&auto=compress'
          },
          {
            source1: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=500&fm=jpg&auto=compress',
            source2: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=250&fm=jpg&auto=compress',
            source3: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=150&fm=jpg&auto=compress',
            img: 'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=250&fm=jpg&auto=compress'
          }
        ],
        thumbnail: [
          'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=64&fm=jpg&auto=compress',
          'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=64&fm=jpg&auto=compress',
          'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=64&fm=jpg&auto=compress',
          'https://cdn.royalcanin-weshare-online.io/mSIRcmkBaxEApS7LMQpI/v15/vhn-dermatology-sensitivity-chicken-cat-pouch-pouch-packshot-b1ru?w=64&fm=jpg&auto=compress',
          'https://cdn.royalcanin-weshare-online.io/m2kia2QBG95Xk-RBC8jn/v1/medium-maxi-giant-pos-2012-packshots-ma-ad-shn-packshot?w=64&fm=jpg&auto=compress',
          'https://cdn.royalcanin-weshare-online.io/UCEUa2QBaxEApS7L_-Xz/v2/fbn-2013-graphiccodes-packshots-siam-ad-int-fbn-packshot?w=64&fm=jpg&auto=compress'
        ]
      },
      sizeList: [
        {
          label: '2.00',
          price: 100,
          originalPrice: 120,
          unit: 'kg',
          selected: true
        },
        {
          label: '4.00',
          price: 300,
          originalPrice: 320,
          unit: 'kg',
          selected: false
        },
        {
          label: '6.00',
          price: 500,
          originalPrice: 530,
          unit: 'kg',
          selected: false
        }
      ]
    }
    setTimeout(() => {
      this.setState({
        details: Object.assign({}, this.state.details, res),
        currentPrice: res.sizeList[1].price * this.state.quantity
      })
    }, 1000)
  }
  changeAmount (type) {
    if (!type) return
    const { quantity, quantityMaxLimit } = this.state
    let res
    if (type === 'minus') {
      if (quantity <= 1) {
        res = 1
      } else {
        res = quantity - 1
      }
    } else {
      if (quantity >= quantityMaxLimit) {
        res = quantityMaxLimit
      } else {
        res = quantity + 1
      }
    }
    this.setState({
      quantity: res
    })
  }
  handleAmountChange (e) {
    const val = e.target.value
    if (val === '') {
      this.setState({ quantity: val })
    } else {
      const { quantityMaxLimit, quantityMinLimit } = this.state
      let tmp = parseInt(val)
      if (isNaN(tmp)) {
        tmp = 1
      }
      if (tmp > quantityMaxLimit) {
        tmp = quantityMaxLimit
      } else if (tmp < quantityMinLimit) {
        tmp = quantityMinLimit
      }
      this.setState({ quantity: tmp })
    }
  }
  handleChooseSize (data, index) {
    const { sizeList } = this.state.details
    let list = cloneDeep(sizeList)
    let ret = list.map((elem, indx) => {
      if (indx === index) {
        elem = { ...elem, selected: true }
      } else {
        elem = { ...elem, selected: false }
      }
      return elem
    })
    this.setState({
      currentPrice: data.price,
      details: Object.assign({}, this.state.details, { sizeList: ret })
    })
  }
  hanldeAddToCart ({ redirect = false }) {
    const { quantity, cartData } = this.state
    const { id, sizeList } = this.state.details
    let newCartData

    if (cartData) {
      newCartData = cloneDeep(cartData)
      let targetData = newCartData.find(c => c.id === id)
      if (targetData && (sizeList.findIndex(l => l.selected) === targetData.sizeList.findIndex(s => s.selected))) {
        targetData.quantity += quantity
      } else {
        newCartData.push(Object.assign({}, this.state.details, { quantity: this.state.quantity }))
      }
    } else {
      newCartData = []
      newCartData.push(Object.assign({}, this.state.details, { quantity: this.state.quantity }))
    }
    localStorage.setItem('rc-cart-data', JSON.stringify(newCartData))
    this.setState({
      cartData: newCartData
    })
    if (redirect) {
      createHashHistory().push('/payment/shipping')
    }
    this.headerRef.current.handleMouseOver()
    setTimeout(() => {
      this.headerRef.current.handleMouseOut()
    }, 1000)
  }
  render () {
    const createMarkup = text => ({ __html: text });
    const { details, quantity, quantityMaxLimit, quantityMinLimit, instockStatus, currentPrice, cartData } = this.state
    return (
      <div>
        <Header ref={this.headerRef} cartData={cartData} showMiniIcons={true} />
        <main className="rc-content--fixed-header">
          <div className="product-detail product-wrapper rc-bg-colour--brand3">
            <div className="rc-max-width--xl">
              <BreadCrumbs />
              <div className="rc-padding--sm--desktop">
                <div className="rc-content-h-top">
                  <div className="rc-layout-container rc-six-column">
                    {/* <!-- carousel --> */}
                    <div className="rc-column rc-double-width carousel-column">
                      <div className="rc-full-width">
                        {/* <div data-js-carousel="" className="rc-carousel rc-carousel__gallery-thumbnails">
                          <div className="rc-carousel__img">
                            <img className="w-100 loaded tns-complete"
                              src={details.url}
                              srcSet={details.img}
                              alt={details.name}
                              title={details.name} />
                          </div>
                        </div>
                       */}
                        <div data-js-carousel data-image-gallery="true" data-move-carousel-up='md'
                          data-move-carousel-to='#new-carousel-container'>
                          <div className="rc-carousel rc-carousel__gallery-image" data-zoom-container="product-description-carousel"
                            data-zoom-factor="3">
                            {details.pictureCfg.list.map((item, idx) => (
                              <div key={idx}>
                                <div>
                                  <picture>
                                    <source
                                      srcSet={item.source1}
                                      media="(min-width: 1500px)" />
                                    <source
                                      srcSet={item.source2}
                                      media="(min-width: 1000px)" />
                                    <source
                                      srcSet={item.source3}
                                      media="(min-width: 500px)" />
                                    <img
                                      src={item.img}
                                      alt="Product alt text" />
                                  </picture>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="rc-carousel__gallery-thumbnails-wrapper">
                            <div className="rc-carousel rc-carousel__gallery-thumbnails">
                              {details.pictureCfg.thumbnail.map((item, idx) => (
                                <div className="rc-carousel__gallery-thumbnail" key={idx}>
                                  <figure className="rc-img--square"
                                    style={{ backgroundImage: 'url(' + item + ')' }}>
                                    <figcaption className="rc-screen-reader-text">Product caption text</figcaption>
                                  </figure>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- product details --> */}
                    <div className="rc-column rc-triple-width product-column">
                      <div className="wrap-short-des">
                        <h1 className="rc-gamma wrap-short-des--heading">
                          {details.name}
                        </h1>
                        {details.reference 
                          ? <label> Reference: <span className="sku-value">{details.reference}</span></label> 
                          : null}
                        <h3>
                          <div className="rating-stars hidden-lg-down">
                            <div className="product-number-rating clearfix">
                              <div className="ratings pull-left">
                              </div>
                            </div>
                          </div>
                        </h3>
                        <div className="description" dangerouslySetInnerHTML={createMarkup(details.description)}>
                          {/* <ul>
                            <li>Helps maintain optimal weight.</li>
                            <li>High palatability: even for fastidious dogs</li>
                            <li>Supports healthy skin and coat</li>
                            <li>Promotes dental health, takes into account the miniature size of the jaws</li>
                            <li>100% complete and balanced nutrition. </li>
                          </ul> */}
                        </div>
                      </div>
                    </div>
                    {/* <!-- buybox --> */}
                    <div className="rc-column rc-triple-width buybox-column">
                      <div className="product-pricing v2 rc-full-width hide-cta">
                        <div className="product-pricing__inner">
                          <div className="product-pricing__cards d-flex flex-column flex-sm-column">
                            <div className="product-pricing__card singlepruchase selected" data-buybox="singlepruchase">
                              <div className="product-pricing__card__head rc-margin-bottom--none d-flex align-items-center">
                                <div className="rc-input product-pricing__card__head__title">
                                  <label className="rc-input__label--inline">Unit price</label>
                                </div>

                                <b className="product-pricing__card__head__price rc-padding-y--none js-price">
                                  <span>
                                    <span>
                                      <span className="sales">
                                        <span className="value" content="3369.00">$ {currentPrice}</span>
                                      </span>
                                    </span>
                                  </span>
                                </b>
                              </div>
                              <div className="product-pricing__card__body rc-margin-top--xs">
                                <div>Free shipping</div>
                                <div className="toggleVisibility">
                                  <div className="product-selectors rc-padding-top--xs">
                                    <div id="choose-select">
                                      <div className="rc-margin-bottom--xs">The size:</div>
                                      <div data-attr="size">
                                        <div>
                                          <div className="rc-swatch __select-size" id="id-single-select-size">
                                            {details.sizeList.map((item, i) => (
                                              <div className={['rc-swatch__item', item.selected ? 'selected' : ''].join(' ')} key={i} onClick={() => this.handleChooseSize(item, i)}>
                                                <span>
                                                  {item.label}<i>{item.unit}</i>
                                                </span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="quantity-width start-lines" data-attr="size">
                                      <div className="quantity d-flex justify-content-between align-items-center">
                                        <span>Amount:</span>
                                        <input type="hidden" id="invalid-quantity" value="Пожалуйста, введите правильный номер." />
                                        <div className="rc-quantity text-right d-flex justify-content-end">
                                          <span className="rc-icon rc-minus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-minus" onClick={() => this.changeAmount('minus')}></span>
                                          <input className="rc-quantity__input" id="quantity" name="quantity" type="number" value={quantity} min={quantityMinLimit} max={quantityMaxLimit} onChange={this.handleAmountChange} maxLength="2" />
                                          <span className="rc-icon rc-plus--xs rc-iconography rc-brand1 rc-quantity__btn js-qty-plus" onClick={() => this.changeAmount('plus')}></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="availability  product-availability" data-ready-to-order="false"
                                    data-available="true">
                                    <div className="align-left flex">
                                      <div className="stock__wrapper">
                                        <div className="stock">
                                          <label className={['availability', instockStatus ? 'instock' : 'outofstock'].join(' ')} >
                                            <span className="title-select">
                                              Availability:
                                            </span>
                                          </label>
                                          <span className="availability-msg" data-ready-to-order="true">
                                            <div className={[instockStatus ? '' : 'out-stock'].join(' ')}>In stock</div>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="product-pricing__cta prices-add-to-cart-actions rc-margin-top--xs rc-padding-top--xs toggleVisibility">
                                    <div className="cart-and-ipay">
                                      <button className="add-to-cart rc-btn rc-btn--one rc-full-width" data-loc="addToCart" onClick={this.hanldeAddToCart}>
                                        <i className="fa rc-icon rc-cart--xs rc-brand3"></i>
                                        Add to Cart
                                      </button>
                                    </div>
                                  </div>
                                  <div className="product-pricing__cta prices-add-to-cart-actions rc-margin-top--xs rc-padding-top--xs toggleVisibility">
                                    <div className="cart-and-ipay">
                                      <button className="add-to-cart rc-btn rc-btn--one rc-full-width" data-loc="addToCart" onClick={() => this.hanldeAddToCart({ redirect: true })}>
                                        Checkout
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="product-pricing__warranty rc-text--center"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="rc-max-width--xl rc-padding-x--sm">
              <div className="rc-match-heights rc-content-h-middle rc-reverse-layout rc-padding-bottom--lg">
                <div className="rc-border-bottom rc-border-colour--interface ">
                  <nav className="rc-fade--x" data-toggle-group="">
                    <ul className="rc-scroll--x rc-list rc-list--inline rc-list--align rc-list--blank" role="tablist">
                      <li>
                        <button className="rc-tab rc-btn" data-toggle="tab__panel-1--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                          role="tab">Description</button>
                      </li>
                      <li>
                        <button className="rc-tab rc-btn" data-toggle="tab__panel-2--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                          role="tab">Beneficial features</button>
                      </li>
                      <li>
                        <button className="rc-tab rc-btn" data-toggle="tab__panel-3--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                          role="tab">Ingredients</button>
                      </li>
                      <li>
                        <button className="rc-tab rc-btn" data-toggle="tab__panel-4--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                          role="tab">Feeding recommendations</button>
                      </li>
                    </ul>
                  </nav>
                </div>
                {/* <!-- tabs --> */}
                <div className="rc-tabs" style={{ marginTop: '40px' }}>
                  <div id="tab__panel-1--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                    className="rc-tabs__content__single clearfix">
                    <div className="block">
                      <p className="content"><span>
                        L-carnitine stimulates the metabolism of fats in the body.
                        It satisfies the high energy needs of small dogs thanks to
                        a precisely calculated energy intensity of the diet (3737 kcal / kg) and a balanced protein
                        content (26%).
                    </span></p>
                    </div>
                  </div>
                  <div id="tab__panel-2--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a" className="clearfix benefit flex">
                    <div className="rc-card-grid rc-match-heights rc-card-grid--fixed rc-two-column">
                      <div className="rc-grid">
                        <div className="block-with-icon">
                          <span className="rc-icon rc-rate-fill rc-iconography"></span>
                          <div className="block-with-icon__content">
                            <h5 className="block-with-icon__title">Adapted energy</h5>
                            <p>Helps maintain ideal weight through optimal calorie intake that meets the energy needs of small
                          dogs. The formula also contains L-carnitine.</p>
                          </div>
                        </div>
                      </div>
                      <div className="rc-grid">
                        <div className="block-with-icon">
                          <span className="rc-icon rc-rate-fill rc-iconography"></span>
                          <div className="block-with-icon__content">
                            <h5 className="block-with-icon__title">Improved palatability</h5>
                            <p>Exceptional palatability of the feed will satisfy even the most finicky dogs of small size.</p>
                          </div>
                        </div>
                      </div>
                      <div className="rc-grid">
                        <div className="block-with-icon">
                          <span className="rc-icon rc-rate-fill rc-iconography"></span>
                          <div className="block-with-icon__content">
                            <h5 className="block-with-icon__title">Skin and Wool Health</h5>
                            <p>The formula contains nutrients that help maintain healthy skin. Enriched with EPA-DHA fatty
                          acids.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="tab__panel-3--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                    className="rc-tabs__content__single clearfix benefits ingredients">
                    <div className="block">
                      <p className="content"><span>
                        Full-feed dry food for adult dogs of small sizes (weighing from 1 to 10 kg) aged 10 months and older
                        MINI Adult (Mini Edalt).
                        INGREDIENTS: rice, dehydrated animal proteins (poultry), cereal flour, vegetable protein isolate *,
                        wheat, animal fats, animal protein hydrolyzate (flavoring additives), vegetable fiber, minerals,
                        fish oil, soybean oil, yeast and fermentation by-products, fructooligosaccharides.
                        All product information is presented directly on the packaging.
                    </span></p>
                    </div>
                  </div>
                  <div id="tab__panel-4--single-b3c23a4b-28f7-442d-a45f-0d62fc6a951a"
                    className="rc-tabs__content__single clearfix benefits ingredients">
                    <div className="block">
                      <div className="rc-table">
                        <div className="rc-scroll--x">
                          <table className="rc-table__table" data-js-table="">
                            <thead className="rc-table__thead">
                              <tr className="rc-table__row">
                                <th className="rc-table__th rc-espilon text-color-brand4">
                                  Adult dog weight</th>
                                <th className="rc-table__th rc-espilon text-color-brand4">
                                  Normal</th>
                              </tr>
                            </thead>
                            <tbody className="rc-table__tbody">
                              <tr className="rc-table__row">
                                <td className="rc-table__td rc-bg-colour--brand4">activity</td>
                                <td className="rc-table__td">Increased</td>
                              </tr>
                              <tr className="rc-table__row">
                                <td className="rc-table__td rc-bg-colour--brand4">activity</td>
                                <td className="rc-table__td"></td>
                              </tr>
                              <tr className="rc-table__row">
                                <td className="rc-table__td rc-bg-colour--brand4">
                                  2 kg</td>
                                <td className="rc-table__td">
                                  40 g</td>
                                <td className="rc-table__td rc-bg-colour--brand4">
                                  47 g</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <InterestedIn />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}

export default Details