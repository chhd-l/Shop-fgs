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


export default class ShippingAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading:true,
      showModal:false,
      isAdd:true,
      addressList:[],
      total:0,
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
    this.openAddModal = this.openAddModal.bind(this)
    this.openEditModal = this.openEditModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    
    this.getAddressList()
  }
   getAddressList = async ()=>{
    const res = await getAddressList()
    if(res.code === 'K-000000'){
      let addressList = res.context 
      let total = addressList.length
      this.setState({
        addressList:addressList,
        total:total,
        loading:false,
      })
    }
    
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
  openAddModal(){
    const addressForm={
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
    this.setState({
      addressForm:addressForm,
      showModal:true,
      isAdd:true
    })
  }
  openEditModal(id){
    this.getAddressById(id)
    
  }
  closeModal(){
    this.setState({
      showModal:false
    })
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
    const res = await setDefaltAddress(params)
    if(res.code === 'K-000000'){
      this.getAddressList()
    }
  }
  deleteAddress = async (id)=>{
    this.setState({
      loading:true
    })
    let params = {
      "id": id,
    }
    const res = await deleteAddress(params)
    if(res.code === 'K-000000'){
      this.getAddressList()
    }
  }

  
  render () {
    const { addressForm } = this.state 
    return (
      <div>
        <Header showMiniIcons={true} location={this.props.location} />
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
                  <div className="table-toolbar">
                    <button type="button" className="ant-btn" onClick={()=>this.openAddModal()}>
                      <span> <FormattedMessage id="addShippingAddress"></FormattedMessage></span>
                    </button>
                    <span className="t-gray"> 
                      <FormattedMessage
                        id="addressTip"
                        values={{number: <b>{this.state.total}</b>}}
                      />
                    </span>
                  </div>
                  {
                    this.state.addressList.map(item=>(
                      <div className="card-address" key={item.deliveryAddressId}>
                        <div className="addr-line"></div>
                        <div className="ant-row">
                          <div className="ant-col-20 form-info">
                           <div className="card-title">{item.consigneeName}</div>
                            <form className="ant-form ant-form-horizontal">
                              <div className="ant-row ant-form-item">
                                <div className="ant-col-0 ant-form-item-label">
                                  <FormattedMessage id="consignee">
                                    {(txt)=>(
                                      <label className="" title={txt}>{txt}</label>
                                      )
                                    }
                                  </FormattedMessage>
                                  
                                </div>
                                <div className="ant-col-24 ant-form-item-control-wrapper">
                                  <div className="ant-form-item-control ">
                                    <p>
                                      <span>{item.consigneeName}</span>
                                      <span className="pushl">{item.consigneeNumber}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="ant-row ant-form-item">
                                <div className="ant-col-0 ant-form-item-label">
                                  <FormattedMessage id="shippingAddress">
                                    {(txt)=>(
                                      <label className="" title={txt}>{txt}</label>
                                      )
                                    }
                                  </FormattedMessage>
                                </div>
                                <div className="ant-col-24 ant-form-item-control-wrapper">
                                  <div className="ant-form-item-control ">
                                    <span>{item.deliveryAddress}</span>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="ant-col-4 card-action">
                            <a className="card-action-delete" onClick={()=>this.deleteAddress(item.deliveryAddressId)}>×</a>
                          <div className="card-action-link">
                            { item.isDefaltAddress ===1?
                            <span><FormattedMessage id="defaultAddress"></FormattedMessage></span>:
                            <a onClick={()=>this.setDefaltAddress(item.deliveryAddressId)}>
                               <FormattedMessage id="setDefaultAddress"></FormattedMessage></a>}
                            <a onClick={()=>this.openEditModal(item.deliveryAddressId)}> 
                              <FormattedMessage id="edit" ></FormattedMessage>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                
                    ))
                  }
                </div>
                
                    <div role="document" className="ant-modal address-modal " style={{width: "520px",display:(this.state.showModal?'block':'none')}}>
                      <div className="ant-modal-content">
                        <button aria-label="Close" className="ant-modal-close">
                          <span className="ant-modal-close-x"></span>
                        </button>
                        <div className="ant-modal-header">
                          <div className="ant-modal-title" id="rcDialogTitle0">
                            { this.state.isAdd?<FormattedMessage id="addShippingAddress"></FormattedMessage>:
                              <FormattedMessage id="editShippingAddress"></FormattedMessage>}
                          </div>
                        </div>
                        <div className="ant-modal-body">
                          <form className="ant-form ant-form-horizontal">

                            {/* firstName */}
                            <div className="ant-row ant-form-item">
                              <div className="ant-form-item-label">
                                <span
                                  style={{
                                    color: 'red',
                                    fontFamily: 'SimSun',
                                    marginRight: '4px',
                                    fontSize: '12px'
                                  }}
                                >
                                  *
                                </span>
                                <FormattedMessage id="payment.firstName">
                                  {(txt)=>(
                                    <label className="ant-form-item-required" title={txt}>{txt}</label>
                                    )
                                  }
                                </FormattedMessage>
                              </div>
                              <div className="ant-form-item-control-wrapper">
                                <div className="ant-form-item-control address-input">
                                  <input type="text" value={addressForm.firstName} 
                                  onChange={(e) => {
                                    const value =  e.target.value;
                                    this.onFormChange({
                                      field: 'firstName',
                                      value
                                    });
                                  }}
                                  className="ant-input ant-input-lg" style={{width: "256px"}}/>
                                </div>
                              </div>
                            </div>

                            {/* lastName */}
                            <div className="ant-row ant-form-item">
                              <div className="ant-form-item-label">
                              <span
                                  style={{
                                    color: 'red',
                                    fontFamily: 'SimSun',
                                    marginRight: '4px',
                                    fontSize: '12px'
                                  }}
                                >
                                  *
                                </span>
                                <FormattedMessage id="payment.lastName">
                                  {(txt)=>(
                                    <label className="ant-form-item-required" title={txt}>{txt}</label>
                                    )
                                  }
                                </FormattedMessage>
                              </div>
                              
                              <div className="ant-form-item-control-wrapper">
                                <div className="ant-form-item-control address-input">
                                  <input type="text" value={addressForm.lastName}  
                                  onChange={(e) => {
                                    const value =  e.target.value;
                                    this.onFormChange({
                                      field: 'lastName',
                                      value
                                    });
                                  }}
                                  className="ant-input ant-input-lg" style={{width: "256px"}}/>
                                </div>
                              </div>
                            </div>
                            {/* country */}
                            <div className="ant-row ant-form-item">
                              <div className="ant-form-item-label">
                              <span
                                  style={{
                                    color: 'red',
                                    fontFamily: 'SimSun',
                                    marginRight: '4px',
                                    fontSize: '12px'
                                  }}
                                >
                                  *
                                </span>
                                <FormattedMessage id="payment.country">
                                  {(txt)=>(
                                    <label className="ant-form-item-required" title={txt}>{txt}</label>
                                    )
                                  }
                                </FormattedMessage>
                              </div>
                              
                              <div className="ant-form-item-control-wrapper">
                                <div className="ant-form-item-control address-input">
                                <select
                                    className="ant-input ant-input-lg" 
                                    style={{width: "256px",fontSize: "13px",fontWeight: 400}}
                                    value={addressForm.country}  
                                    onChange={(e) => {
                                      const value =  e.target.value;
                                      this.onFormChange({
                                        field: 'country',
                                        value
                                      });
                                    }} >
                                      <option value="1">Mexico</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* city */}
                            <div className="ant-row ant-form-item">
                              <div className="ant-form-item-label">
                              <span
                                  style={{
                                    color: 'red',
                                    fontFamily: 'SimSun',
                                    marginRight: '4px',
                                    fontSize: '12px'
                                  }}
                                >
                                  *
                                </span>
                                <FormattedMessage id="payment.city">
                                  {(txt)=>(
                                    <label className="ant-form-item-required" title={txt}>{txt}</label>
                                    )
                                  }
                                </FormattedMessage>
                              </div>
                              
                              <div className="ant-form-item-control-wrapper">
                                <div className="ant-form-item-control address-input">
                                  <select
                                    value={addressForm.city}  
                                    onChange={(e) => {
                                      const value =  e.target.value;
                                      this.onFormChange({
                                        field: 'city',
                                        value
                                      });
                                    }}
                                    className="ant-input ant-input-lg" 
                                    style={{width: "256px",fontSize: "13px",fontWeight: 400}}
                                    >
                                    <option value="1">Monterrey</option>
                                    <option value="2">Mexico City</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* address1 */}
                            <div className="ant-row ant-form-item">
                              <div className="ant-form-item-label">
                              <span
                                  style={{
                                    color: 'red',
                                    fontFamily: 'SimSun',
                                    marginRight: '4px',
                                    fontSize: '12px'
                                  }}
                                >
                                  *
                                </span>
                                <FormattedMessage id="payment.address1">
                                  {(txt)=>(
                                    <label className="ant-form-item-required" title={txt}>{txt}</label>
                                    )
                                  }
                                </FormattedMessage>
                              </div>
                              
                              <div className="ant-form-item-control-wrapper">
                                <div className="ant-form-item-control address-input">
                                  <input type="text" value={addressForm.address1}  
                                  onChange={(e) => {
                                    const value =  e.target.value;
                                    this.onFormChange({
                                      field: 'address1',
                                      value
                                    });
                                  }}
                                  className="ant-input ant-input-lg" style={{width: "256px"}}/>
                                </div>
                              </div>
                            </div>

                            {/* address2 */}
                            <div className="ant-row ant-form-item">
                              <div className="ant-form-item-label">
                              <span
                                  style={{
                                    color: 'red',
                                    fontFamily: 'SimSun',
                                    marginRight: '4px',
                                    fontSize: '12px'
                                  }}
                                >
                                  *
                                </span>
                                <FormattedMessage id="payment.address2">
                                  {(txt)=>(
                                    <label className="ant-form-item-required" title={txt}>{txt}</label>
                                    )
                                  }
                                </FormattedMessage>
                              </div>
                              
                              <div className="ant-form-item-control-wrapper">
                                <div className="ant-form-item-control address-input">
                                  <input type="text" value={addressForm.address2} 
                                  onChange={(e) => {
                                    const value =  e.target.value;
                                    this.onFormChange({
                                      field: 'address2',
                                      value
                                    });
                                  }} 
                                  className="ant-input ant-input-lg" style={{width: "256px"}}/>
                                </div>
                              </div>
                            </div>
                            {/* postCode */}
                            <div className="ant-row ant-form-item">
                              <div className="ant-form-item-label">
                              <span
                                  style={{
                                    color: 'red',
                                    fontFamily: 'SimSun',
                                    marginRight: '4px',
                                    fontSize: '12px'
                                  }}
                                >
                                  *
                                </span>
                                <FormattedMessage id="payment.postCode">
                                  {(txt)=>(
                                    <label className="ant-form-item-required" title={txt}>{txt}</label>
                                    )
                                  }
                                </FormattedMessage>
                              </div>
                              
                              <div className="ant-form-item-control-wrapper">
                                <div className="ant-form-item-control address-input">
                                  <input type="text" value={addressForm.postCode}  
                                  onChange={(e) => {
                                    const value =  e.target.value;
                                    this.onFormChange({
                                      field: 'postCode',
                                      value
                                    });
                                  }}
                                  className="ant-input ant-input-lg" style={{width: "256px"}}/>
                                </div>
                              </div>
                            </div>
                            {/* phoneNumber */}
                            <div className="ant-row ant-form-item">
                              <div className="ant-form-item-label">
                              <span
                                  style={{
                                    color: 'red',
                                    fontFamily: 'SimSun',
                                    marginRight: '4px',
                                    fontSize: '12px'
                                  }}
                                >
                                  *
                                </span>
                                <FormattedMessage id="payment.phoneNumber">
                                  {(txt)=>(
                                    <label className="ant-form-item-required" title={txt}>{txt}</label>
                                    )
                                  }
                                </FormattedMessage>
                              </div>
                              
                              <div className="ant-form-item-control-wrapper">
                                <div className="ant-form-item-control address-input">
                                  <input type="text" value={addressForm.phoneNumber}  
                                  onChange={(e) => {
                                    const value =  e.target.value;
                                    this.onFormChange({
                                      field: 'phoneNumber',
                                      value
                                    });
                                  }}
                                  className="ant-input ant-input-lg" style={{width: "256px"}}/>
                                </div>
                              </div>
                            </div>

                            {/* rfc */}
                            <div className="ant-row ant-form-item">
                              <div className="ant-form-item-label">
                              <span
                                  style={{
                                    color: 'red',
                                    fontFamily: 'SimSun',
                                    marginRight: '4px',
                                    fontSize: '12px'
                                  }}
                                >
                                  *
                                </span>
                                <FormattedMessage id="payment.rfc">
                                  {(txt)=>(
                                    <label className="ant-form-item-required" title={txt}>{txt}</label>
                                    )
                                  }
                                </FormattedMessage>
                              </div>
                              
                              <div className="ant-form-item-control-wrapper">
                                <div className="ant-form-item-control address-input">
                                  <input type="text" value={addressForm.rfc}  
                                  onChange={(e) => {
                                    const value =  e.target.value;
                                    this.onFormChange({
                                      field: 'rfc',
                                      value
                                    });
                                  }}
                                  className="ant-input ant-input-lg" style={{width: "256px"}}/>
                                </div>
                              </div>
                            </div>

                            <div className="ant-row ant-form-item">
                              <div className="ant-form-item-control-wrapper">
                                <div className="rc-input rc-input--inline" style={{margin: "15px 0 0 0"}} onClick={()=>this.isDefalt()}>
                                  <input type="checkbox" 
                                    id="defaultAddress"
                                    className="rc-input__checkbox" 
                                    
                                    value={addressForm.isDefalt}/>
                                    {
                                      !addressForm.isDefalt?<label className="rc-input__label--inline" >
                                      <FormattedMessage id="setDefaultAddress"></FormattedMessage>
                                    </label>:<label className="rc-input__label--inline defaultAddressChecked">
                                    <FormattedMessage id="setDefaultAddress"></FormattedMessage>
                                  </label>
                                    }
                                </div>
                                {/* <div className="ant-form-item-control has-success address-input">
                                  <label className="ant-checkbox-wrapper">
                                    <span className="ant-checkbox">
                                    <input type="checkbox" className="ant-checkbox-input" onClick={()=>this.isDefalt()} value={addressForm.isDefalt}/>
                                    <span className="ant-checkbox-inner"></span>
                                    </span>
                                    <span><FormattedMessage id="setDefaultAddress"></FormattedMessage></span>
                                  </label>
                                  
                                </div> */}
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="ant-modal-footer">
                          <button type="button" className="ant-btn ant-btn-lg" onClick={()=>this.closeModal()}>
                            <span><FormattedMessage id="cancle"></FormattedMessage></span>
                          </button>
                          <button type="button" className="ant-btn ant-btn-primary ant-btn-lg" onClick={()=>this.saveAddress()}>
                            <span><FormattedMessage id="confirm"></FormattedMessage></span>
                          </button>
                        </div>
                      
                    
                  </div>
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