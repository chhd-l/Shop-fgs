import React from "react"
import { FormattedMessage } from 'react-intl'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import './index.css'
import {  getAddressList,
saveAddress,
setDefaltAddress} from '@/api/address'
import { Link } from 'react-router-dom';


export default class ShippingAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal:false,
      isAdd:true,
      addressList:[],
      total:0,
      addressForm:{
        firstName:"",
        lastName:"",
        address1:"",
        address2:"",
        country:"",
        city:"",
        postCode:"",
        phoneNumber:"",
        rfc:""
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
        total:total
      })
    }
    
  }
  openAddModal(){
    this.setState({
      showModal:true,
      isAdd:true
    })
  }
  openEditModal(){
    this.setState({
      showModal:true,
      isAdd:false
    })
  }
  closeModal(){
    this.setState({
      showModal:false
    })
  }
  
  render () {
    const { addressForm } = this.state 
    return (
      <div>
        <Header cartData={this.state.cartData} showMiniIcons={true} location={this.props.location} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
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
                      <div className="card">
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
                            <a className="card-action-delete">×</a>
                          <div className="card-action-link">
                            { item.isDefaltAddress ===1?
                            <span><FormattedMessage id="defaultAddress"></FormattedMessage></span>:
                            <a onClick={()=>this.setDefaltAddress(item.deliveryAddressId)}> <FormattedMessage id="setDefaultAddress"></FormattedMessage></a>}
                            <a> <FormattedMessage id="edit" onClick={()=>this.openEditModal()}></FormattedMessage></a>
                          </div>
                        </div>
                      </div>
                    </div>
                
                    ))
                  }
                </div>
                <div role="document" className="ant-modal address-modal" style={{width: "520px",display:(this.state.showModal?'block':'none')}}>
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
                              className="ant-input ant-input-lg" style={{width: "256px"}}/>
                            </div>
                          </div>
                        </div>

                        {/* lastName */}
                        <div className="ant-row ant-form-item">
                          <div className="ant-form-item-label">
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
                              className="ant-input ant-input-lg" style={{width: "256px"}}/>
                            </div>
                          </div>
                        </div>
                        {/* country */}
                        <div className="ant-row ant-form-item">
                          <div className="ant-form-item-label">
                            <FormattedMessage id="payment.country">
                              {(txt)=>(
                                <label className="ant-form-item-required" title={txt}>{txt}</label>
                                )
                              }
                            </FormattedMessage>
                          </div>
                          
                          <div className="ant-form-item-control-wrapper">
                            <div className="ant-form-item-control address-input">
                              <input type="text" value={addressForm.country}  
                              className="ant-input ant-input-lg" style={{width: "256px"}}/>
                            </div>
                          </div>
                        </div>

                        {/* city */}
                        <div className="ant-row ant-form-item">
                          <div className="ant-form-item-label">
                            <FormattedMessage id="payment.city">
                              {(txt)=>(
                                <label className="ant-form-item-required" title={txt}>{txt}</label>
                                )
                              }
                            </FormattedMessage>
                          </div>
                          
                          <div className="ant-form-item-control-wrapper">
                            <div className="ant-form-item-control address-input">
                              <input type="text" value={addressForm.city}  
                              className="ant-input ant-input-lg" style={{width: "256px"}}/>
                            </div>
                          </div>
                        </div>

                        {/* address1 */}
                        <div className="ant-row ant-form-item">
                          <div className="ant-form-item-label">
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
                              className="ant-input ant-input-lg" style={{width: "256px"}}/>
                            </div>
                          </div>
                        </div>

                        {/* address2 */}
                        <div className="ant-row ant-form-item">
                          <div className="ant-form-item-label">
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
                              className="ant-input ant-input-lg" style={{width: "256px"}}/>
                            </div>
                          </div>
                        </div>
                        {/* postCode */}
                        <div className="ant-row ant-form-item">
                          <div className="ant-form-item-label">
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
                              className="ant-input ant-input-lg" style={{width: "256px"}}/>
                            </div>
                          </div>
                        </div>
                        {/* phoneNumber */}
                        <div className="ant-row ant-form-item">
                          <div className="ant-form-item-label">
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
                              className="ant-input ant-input-lg" style={{width: "256px"}}/>
                            </div>
                          </div>
                        </div>

                        {/* rfc */}
                        <div className="ant-row ant-form-item">
                          <div className="ant-form-item-label">
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
                              className="ant-input ant-input-lg" style={{width: "256px"}}/>
                            </div>
                          </div>
                        </div>

                        <div className="ant-row ant-form-item">
                          <div className="ant-form-item-control-wrapper">
                            <div className="ant-form-item-control has-success address-input">
                              <label className="ant-checkbox-wrapper">
                                <span className="ant-checkbox">
                                <input type="checkbox" className="ant-checkbox-input"  value="on"/>
                                <span className="ant-checkbox-inner"></span>
                                </span>
                                <span><FormattedMessage id="setDefaultAddress"></FormattedMessage></span>
                              </label>
                              
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="ant-modal-footer">
                      <button type="button" className="ant-btn ant-btn-lg" onClick={()=>this.closeModal()}>
                        <span><FormattedMessage id="cancle"></FormattedMessage></span>
                      </button>
                      <button type="button" className="ant-btn ant-btn-primary ant-btn-lg" onClick={()=>this.closeModal()}>
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