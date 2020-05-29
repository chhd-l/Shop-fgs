import React from "react"
import { FormattedMessage } from 'react-intl'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import './index.css'
import {  getAddressList,
saveAddress,
setDefaltAddress,
deleteAddress,
getAddressById,
editAddress} from '@/api/address'
import { Link } from 'react-router-dom';
import Loading from "@/components/Loading"
import { getDict } from '@/api/dict'


export default class ShippingAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading:true,
      showModal:false,
      isAdd:true,
      addressList:[],
      total:0,
      errorMsg:"",
      successMsg:"",
      addressForm:{
        firstName:"",
        lastName:"",
        address1:"",
        address2:"",
        country:"1",
        city:"1",
        postCode:"",
        phoneNumber:"",
        rfc:"",
        isDefalt:false,
        deliveryAddressId:"",
        customerId:""
      }
      
    }
    
    
  }

  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    this.getAddressList()
    this.getDict('city')
    this.getDict('country')
  }
  getDict = async(type)=>{
    this.setState({
      loading:true
    })
    let params ={
      "delFlag": 0,
      "storeId": 123456858,
      "type": type,
    }
    await getDict(params).then(res=>{
      if(res.code === 'K-000000'){
        if(type==='city'){
          let cityList = res.context.sysDictionaryVOS
          this.setState({
            cityList:cityList,
            loading:false
          })
        }
        if(type==='country'){
          let countryList = res.context.sysDictionaryVOS
          this.setState({
            countryList:countryList,
            loading:false
          })
        }
        
      }
      else{
        this.showErrorMsg(res.message||'get data failed')
        this.setState({
          loading:false
        })
      }
    }).catch(err =>{
        this.showErrorMsg('get data failed')
        this.setState({
          loading:false
        })
    })
  }
   getAddressList = async ()=>{
    await getAddressList().then( res =>{
      if(res.code === 'K-000000'){
        let addressList = res.context 
        let total = addressList.length
        this.setState({
          addressList:addressList,
          total:total,
          loading:false,
        })
      }else{
        this.showErrorMsg(res.message ||"Query Data Failed")
      }
    }).catch(err =>{
      this.showErrorMsg("Query Data Failed")
      this.setState({
        loading:false
      })
    })

    
  }
  getAddressById = async (id)=>{
    let params ={
      id:id
    }
    const res = await getAddressById(params)
    if(res.code === 'K-000000'){
      let data = res.context
      let nameArr = data.consigneeName.split(' ')
      let addressArr = data.deliveryAddress.split(' ')
      let addressForm={
        firstName:nameArr[0],
        lastName:nameArr[1],
        address1:addressArr[0],
        address2:addressArr[1],
        country:data.areaId,
        city:data.cityId,
        postCode:data.postCode,
        phoneNumber:data.consigneeNumber,
        rfc:data.rfc,
        isDefalt:data.isDefaltAddress===1?true:false,
        deliveryAddressId:data.deliveryAddressId,
        customerId:data.customerId
      }

      this.setState({
        addressForm:addressForm,
        showModal:true,
        isAdd:false
      })
    }
    
  }

  onFormChange = ({ field, value }) => {
    let data = this.state.addressForm;
    data[field] = value;
    this.setState({
      addressForm: data
    });
  };
  isDefalt = ()=>{
    let data = this.state.addressForm;
    data.isDefalt = !data.isDefalt
    this.setState({
      addressForm: data
    });
  }
  saveAddress = async ()=>{
    this.setState({
      loading:true
    })
    let data = this.state.addressForm;
    let params = {
      "areaId": +data.country,
      "cityId": +data.city,
      "consigneeName": data.firstName+" "+data.lastName,
      "consigneeNumber": data.phoneNumber,
      "customerId": data.customerId,
      "deliveryAddress": data.address1+" "+data.address2,
      "deliveryAddressId": data.deliveryAddressId,
      "isDefaltAddress": data.isDefalt?1:0,
      "postCode": data.postCode,
      "provinceId": 0,
      "rfc": data.rfc,
    }
    if(this.state.isAdd){
      
      const res = await saveAddress(params)
      if(res.code === 'K-000000'){
        this.getAddressList()
        this.closeModal()
        
      }
    }else{
      const res = await editAddress(params)
      if(res.code === 'K-000000'){
        this.getAddressList()
        this.closeModal()
        
      }
    }
  }
  setDefaltAddress = async (id)=>{
    this.setState({
      loading:true
    })
    let params = {
      "deliveryAddressId": id,
    }
    await setDefaltAddress(params).then( res =>{
      if(res.code === 'K-000000'){
        this.showSuccessMsg(res.message||'Set Defalt Address Success')
        this.getAddressList()
      }
      else{
        this.showErrorMsg(res.message||'Set Defalt Address Failed')
        this.setState({
          loading:false
        })
      }
    }).catch(err =>{
      this.showErrorMsg('Set Defalt Address Failed')
      this.setState({
        loading:false
      })
    })
    
  }
  deleteAddress = async (id)=>{
    this.setState({
      loading:true
    })
    let params = {
      "id": id,
    }
    await deleteAddress(params).then(res=>{
      if(res.code === 'K-000000'){
        this.showSuccessMsg(res.message||'Delete Address Success')
        this.getAddressList()
      }
      else{
        this.showErrorMsg(res.message||'Delete Address Failed')
        this.setState({
          loading:false
        })
      }
    }).catch(err => {
      this.showErrorMsg('Delete Address Failed')
        this.setState({
          loading:false
        })
    })
    
  }
  showErrorMsg=(message)=>{
    this.setState({
      errorMsg: message
    })
    this.scrollToErrorMsg()
    setTimeout(() => {
      this.setState({
        errorMsg: ''
      })
    }, 3000)
  }

  showSuccessMsg=(message)=>{
    this.setState({
      successMsg: message
    })
    this.scrollToErrorMsg()
    setTimeout(() => {
      this.setState({
        successMsg: ''
      })
    }, 2000)
  }

  //定位
  scrollToErrorMsg () {
    const widget = document.querySelector('.content-asset')
    // widget && widget.scrollIntoView()
    // console.log(this.getElementToPageTop(widget))
    if (widget) {
      window.scrollTo(this.getElementToPageTop(widget), 0)
    }
  }
  getElementToPageTop (el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop
    }
    return el.offsetTop
  }
  openCreatePage =()=>{
    const { history } = this.props
    history.push('/account/shippingAddress/create')
  }
  openEditPage =(id)=>{
    const { history } = this.props
    history.push('/account/shippingAddress/'+id)
  }

  getDictValue=(list,id)=>{
    if(list&& list.length>0){
      let item = list.find(item=>{
        return item.id===id
      })
      console.log(item);
      return item.name
    }
    else {
      return id
    }
    
  }

  
  render () {
    return (
      <div>
        <Header showMiniIcons={true} location={this.props.location} history={this.props.history} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
            {this.state.loading ? <Loading positionFixed="true" /> : null}
              <SideMenu type="ShippingAddress" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                  <h4 className="rc-delta rc-margin--none">
                    <FormattedMessage id="shippingAddress"></FormattedMessage>
                  </h4>
                </div>
                <div className="content-asset">
                <div className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${this.state.errorMsg ? '' : 'hidden'}`}>
                  <aside className="rc-alert rc-alert--error rc-alert--with-close errorAccount" role="alert">
                    <span>{this.state.errorMsg}</span>
                    <button
                      className="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                      onClick={() => { this.setState({ errorMsg: '' }) }}
                      aria-label="Close">
                      <span className="rc-screen-reader-text">
                        <FormattedMessage id="close" />
                      </span>
                    </button>
                  </aside>
                </div>
                <aside
                  className={`rc-alert rc-alert--success js-alert js-alert-success-profile-info rc-alert--with-close rc-margin-bottom--xs ${this.state.successMsg ? '' : 'hidden'}`}
                  role="alert">
                  <p className="success-message-text rc-padding-left--sm--desktop rc-padding-left--lg--mobile rc-margin--none">{this.state.successMsg}</p>
                </aside>
                  <div className="table-toolbar">
                    
                    <span className="t-gray"> 
                      <FormattedMessage
                        id="addressTip"
                        values={{number: <b>{this.state.total}</b>}}
                      />
                    </span>
                    <button type="button" className="address-btn" onClick={()=>this.openCreatePage()}>
                      <span> <FormattedMessage id="addShippingAddress"></FormattedMessage></span>
                    </button>
                  </div>
                  {
                    this.state.addressList.map(item=>(
                      <div className={"card-address " +( item.isDefaltAddress ===1?"card-address-default":"") } key={item.deliveryAddressId}>
                        {/* <div className="addr-line"></div> */}
                        <div className="ant-row">
                          <div className="ant-col-20 form-info">
                            <form className="ant-form ant-form-horizontal">

                              <div className="ant-row ant-form-item">
                                <div className="ant-col-0 ant-form-item-label">
                                  <FormattedMessage id="Name">
                                    {(txt)=>(
                                      <label className="" title={txt}>{txt}</label>
                                      )
                                    }
                                  </FormattedMessage>
                                </div>
                                <div className="ant-col-24 ant-form-item-control-wrapper">
                                  <div className="ant-form-item-control ">
                                    <span>{item.consigneeName}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="ant-row ant-form-item">
                                <div className="ant-col-0 ant-form-item-label">
                                  <FormattedMessage id="payment.phoneNumber">
                                    {(txt)=>(
                                      <label className="" title={txt}>{txt}</label>
                                      )
                                    }
                                  </FormattedMessage>
                                </div>
                                <div className="ant-col-24 ant-form-item-control-wrapper">
                                  <div className="ant-form-item-control ">
                                    <span>{item.consigneeNumber}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="ant-row ant-form-item">
                                <div className="ant-col-0 ant-form-item-label">
                                  <FormattedMessage id="payment.country">
                                    {(txt)=>(
                                      <label className="" title={txt}>{txt}</label>
                                      )
                                    }
                                  </FormattedMessage>
                                </div>
                                <div className="ant-col-24 ant-form-item-control-wrapper">
                                  <div className="ant-form-item-control ">
                                    <span>{this.getDictValue(this.state.countryList,item.countryId) }</span>
                                  </div>
                                </div>
                              </div>

                              <div className="ant-row ant-form-item">
                                <div className="ant-col-0 ant-form-item-label">
                                  <FormattedMessage id="payment.city">
                                    {(txt)=>(
                                      <label className="" title={txt}>{txt}</label>
                                      )
                                    }
                                  </FormattedMessage>
                                </div>
                                <div className="ant-col-24 ant-form-item-control-wrapper">
                                  <div className="ant-form-item-control ">
                                    <span>{this.getDictValue(this.state.cityList,item.cityId) }</span>
                                  </div>
                                </div>
                              </div>
                              

                              <div className="ant-row ant-form-item">
                                <div className="ant-col-0 ant-form-item-label">
                                  <FormattedMessage id="payment.address1">
                                    {(txt)=>(
                                      <label className="" title={txt}>{txt}</label>
                                      )
                                    }
                                  </FormattedMessage>
                                </div>
                                <div className="ant-col-24 ant-form-item-control-wrapper">
                                  <div className="ant-form-item-control ">
                                    <span>{item.address1}</span>
                                  </div>
                                </div>
                              </div>
                           </form>
                          </div>
                          <div className="ant-col-4 card-action">
                            <a className="card-action-delete" onClick={()=>this.deleteAddress(item.deliveryAddressId)}>×</a>
                          <div className="card-action-link">
                            { item.isDefaltAddress ===1?
                            null:
                            <a onClick={()=>this.setDefaltAddress(item.deliveryAddressId)}>
                               <FormattedMessage id="setDefaultAddress"></FormattedMessage></a>}
                            <a onClick={()=>this.openEditPage(item.deliveryAddressId)}> 
                              <FormattedMessage id="edit" ></FormattedMessage>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                
                    ))
                  }
                </div>
                
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}