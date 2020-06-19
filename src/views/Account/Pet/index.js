import React from "react"
import { FormattedMessage } from 'react-intl'
import GoogleTagManager from '@/components/GoogleTagManager'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import './index.css'
import noPet from "@/assets/images/noPet.jpg"
import { Link } from 'react-router-dom';
import {  getPetList } from '@/api/pet'
import Loading from "@/components/Loading"

export default class Pet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading:true,
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : []
    }
    
  }
  componentDidMount(){
    this.getPetList()
  }
  isHavePet(){
    const { history } = this.props
    history.push('/account/pets/petForm')
  }
  getPetList = async ()=>{
    let params = {
        "consumerAccount": "10086"
      }
    await getPetList(params).then( res =>{
      if(res.code === 'K-000000'){
        let petList = res.context.context
        if(petList.length>0){
          this.setState({
            loading:false
          })
          this.isHavePet()
        }
        else{
          this.setState({
            loading:false
          })
        }
        
      }
      else{
        this.setState({
          loading:false
        })
      }
    }).catch(err => {
      this.setState({
        loading: false
      })
    })
    
    
    
  }
  render () {
    const event = {
      "page": {
        "type": "Account",
        "theme": ""
      }
    }
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Header showMiniIcons={true} showUserIcon={true} location={this.props.location} history={this.props.history} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Pets" />
              {this.state.loading ? <Loading positionFixed="true" /> : null}
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="rc-border-bottom rc-border-colour--interface rc-margin-bottom--sm">
                  <h4 className="rc-delta rc-margin--none">
                    <FormattedMessage id="account.pets"></FormattedMessage>
                  </h4>
                </div>
                <div className="content-asset">
                  <div className="rc-layout-container rc-two-column rc-content-h-middle rc-margin-bottom--sm">
                    <div className="rc-column">
                      <div className="rc-padding-right-lg rc-padding-y--sm ">
                          <div className="children-nomargin">
                            <p>
                              <FormattedMessage id="account.noPet"></FormattedMessage>
                              
                            </p>
                          </div>
                          <div className="rc-margin-top--sm">
                            <Link className="rc-btn rc-btn--one" to="/account/pets/petForm">
                              <FormattedMessage id="account.addPet"></FormattedMessage>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="rc-column">
                        <img src={noPet} alt="No pets"/>
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