import React from "react"
import { FormattedMessage } from 'react-intl'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreadCrumbs from '@/components/BreadCrumbs'
import SideMenu from '@/components/SideMenu'
import './index.css'
import dog from '@/assets/images/animal-1.jpg'
import cat from '@/assets/images/animal-2.jpg'
import success from '@/assets/images/check-success.svg'
import { Link } from 'react-router-dom';


const selectedPet = {
  border: "3px solid #ec001a",
}
const noSelect ={
  border: "3px solid #d7d7d7",
}
export default class AccountProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      precent:12.5,
      step:7,
      isCat:null,
      isMale:null,
      currentStep:'step7',
      isDisabled:true,
      nickname:"",
      isUnknown:false,
      isInputDisabled:false,
      isUnknownDisabled:false,
      weight:"",
      isSterilized:null,
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : []
    }
    this.nextStep = this.nextStep.bind(this)
    this.selectPetType = this.selectPetType.bind(this)
    this.selectSex = this.selectSex.bind(this)
    this.selectWeight = this.selectWeight.bind(this)
    this.setSterilized = this.setSterilized.bind(this)
    

  }
  nextStep(){
    let step=this.state.step + 1
    if(this.state.isCat&& step=== 5){
      step+=1
    }
    let currentStep = 'step' + step
    if(step>8){
      currentStep = "success"
    }

    
    
    this.setState({
      step:step,
      currentStep:currentStep,
      isDisabled:true,
    })
  };
  selectPetType(type){
    if(type==="cat"){
      this.setState({
        isCat:true,
        isDisabled:false,
      })
    }
    else if(type==="dog"){
      this.setState({
        isCat:false,
        isDisabled:false,
      })
    }
  }
  selectSex(type){
    if(type==="male"){
      this.setState({
        isMale:true,
        isDisabled:false,
      })
    }
    else if(type==="female"){
      this.setState({
        isMale:false,
        isDisabled:false,
      })
    }
  };
  inputNickname=(e) => {
    let isDisabled = true
    if (e.target.value !=="") {
      isDisabled = false
    }
    else{
      isDisabled = true
    }
    this.setState({
      nickname: e.target.value,
      isDisabled:isDisabled
    })
  };
  setUnknown=()=>{
    let isUnknown = !this.state.isUnknown
    let inputBreed = this.state.inputBreed
    let isDisabled = this.state.isDisabled
    let isInputDisabled = this.state.isInputDisabled
    if(isUnknown){
      inputBreed = ""
      isDisabled = false
      isInputDisabled = true
    }
    else{
      isDisabled = true
      isInputDisabled = false
    }
    this.setState({
      isUnknown:isUnknown,
      inputBreed:inputBreed,
      isDisabled:isDisabled,
      isInputDisabled:isInputDisabled
    })
  }
  inputBreed=(e) => {
    let isDisabled = true
    let isUnknownDisabled = false
    if (e.target.value !=="") {
      isDisabled = false
      isUnknownDisabled = true
    }
    else{
      isDisabled = true
      isUnknownDisabled = false
    }
    this.setState({
      nickname: e.target.value,
      isDisabled:isDisabled,
      isUnknownDisabled: isUnknownDisabled
    })
  };
  selectWeight(val){
    this.setState({
      weight:val,
      isDisabled:false
    })    
  }
  setSterilized(val){
    this.setState({
      isSterilized:val,
      isDisabled:false
    }) 
  }
  render () {
    return (
      <div>
        <Header cartData={this.state.cartData} showMiniIcons={true} location={this.props.location} />
        <main className="rc-content--fixed-header rc-main-content__wrapper rc-bg-colour--brand3">
          <BreadCrumbs />
          <div className="rc-padding--sm rc-max-width--xl">
            <div className="rc-layout-container rc-five-column">
              <SideMenu type="Pets" />
              <div className="my__account-content rc-column rc-quad-width rc-padding-top--xs--desktop">
                <div className="list-select-pet js-list-pet" data-toggle-group="">
                  <ul className="scroll--x list list--inline list--align list--blank flex--middle" role="tablist">
                    <li className="pet-element">
                      <a href="/ru/account/pet-carnet?editForm=newPet" className="tab-add tab--img" role="tab">
                        <span className="rc-icon rc-plus rc-iconography plus-icon add_pet"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="group-progress js-group-progress section-form-group">
                  <div className="bar-progress">
                    <div className="progress-child red js-percent-step" style={{ width:((this.state.precent*this.state.step) + '%') }}>  
                    </div>
                  </div>
                  <div className="step-progress">
                      Step 
                    <span className="js-step-number">
                      {this.state.step}
                    </span>
                       of 8
                  </div>
                </div>
                <div className="pet-form-create">
                  {
                    this.state.currentStep === 'step1'?
                    <div id="step-1" className="section col-lg-9 col-12">

                      <h2>
                        Do you have a cat or dog?
                      </h2>
                      <div className="form-group  custom-checkbox col-lg-6">
                        <img src={cat} className="animal-select" alt="" title="" 
                        onClick={()=>this.selectPetType('cat')}
                        style={this.state.isCat===true? selectedPet:noSelect } />
                        <div className="label-option">
                          Cat
                        </div>
                      </div>

                      <div className="form-group custom-checkbox col-lg-6">
                        <img src={dog} className="animal-select" alt="" title="" 
                        onClick={()=>this.selectPetType('dog')}
                        style={ this.state.isCat===false? selectedPet:noSelect } />
                        <div className="label-option">
                              Dog                      
                        </div>
                      </div>
                    </div>
                    :null
                  }
                  {
                    this.state.currentStep === 'step2'?
                      <div id="step-2" className="section col-lg-9 col-12 next-step">
                        <h2>What is your pet's nickname?</h2>
                        <div className="form-group">
                        <input type="text" placeholder="Enter your pet's nickname" className="form-control input-pet" 
                          name="dwfrm_miaaPet_petName" 
                          required="required" 
                          aria-required="true" 
                          value={this.state.nickname}
                          onChange={this.inputNickname}  
                          maxlength="2147483647"/>
                        <div className="invalid-feedback"></div>
                        </div>
                        
                    </div>:null
                  }
                  {
                    this.state.currentStep === 'step3'?
                    
                    <div id="step-3" className="section next-step">
                      <h2>What gender is your pet?</h2>
                      <div className="form-group custom-control custom-checkbox col-lg-6 ">
                        <label className="pet-select-control select-gender-1 icon-rc" 
                          onClick={()=>this.selectSex('male')} 
                          style={ this.state.isMale === true? selectedPet:noSelect }>
                        </label>
                        <div className="label-option">
                          Male
                        </div>
                      </div>
                      <div className="form-group custom-control custom-checkbox col-lg-6 ">
                        
                        <label className="pet-select-control select-gender-2 icon-rc"  
                        onClick={()=>this.selectSex('female')} 
                        style={this.state.isMale === false? selectedPet:noSelect }></label>
                        <div className="label-option">
                          Female
                        </div>
                      </div>
                    </div>:null
                  }
                  {
                    this.state.currentStep === 'step4'?
                    <div id="step-4" className="section next-step not-hidden col-lg-9 col-12">
                      <h2>What breed Rita?</h2>
                      <div className="content-section">
                        <div className="form-group relative">
                          <input id="breedPetName" type="hidden" name="dwfrm_miaaPet_breed" data-name="" value=""/>
                          <input type="text" id="dog-breed" 
                            placeholder="Enter your dog's breed" 
                            className="form-control input-pet breed" 
                            value={this.state.breed}
                            onChange={this.inputBreed}  
                            autocomplete="nope" 
                            style={{display: (this.state.isCat?"none":null)}}
                            disabled={this.state.isInputDisabled?"disabled":null}/>
                          <input type="text" id="cat-breed" 
                            placeholder="Enter the breed of your cat" 
                            className="form-control input-pet breed" 
                            value={this.state.breed}
                            onChange={this.inputBreed}  
                            autocomplete="nope" 
                            style={{display: (!this.state.isCat?"none":null)}}
                            disabled={this.state.isInputDisabled?"disabled":null}/>
                        </div>
                        <div className="form-group custom-control label-unknown">
                          <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                            <input type="checkbox" 
                              className="rc-input__checkbox" 
                              id="overweight" 
                              value={this.state.isUnknown} 
                              onClick={()=>this.setUnknown()} 
                              disabled={this.state.isUnknownDisabled?"disabled":null}
                              name="dwfrm_miaaPet_overweight"/>
                            <label className="rc-input__label--inline" for="overweight">
                              Unknown breed
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>:null
                  }
                  {
                    this.state.currentStep === 'step5'?
                    <div id="step-5" className="section next-step">
                      <h2>What is the weight of an adult dog of your breed Rita?</h2>
                      <div className="group-size">
                        <div className="wrap__input wrap-size pull-left col-3">
                          <input id="is-X-Small" 
                            type="radio" 
                            className="radio input__radio" 
                            name="dwfrm_miaaPet_petSize" 
                            value="X-Small"
                            onClick={()=>this.selectWeight("X-Small")}/>
                          <label className="label label__input" for="is-X-Small">X-Small (up to 4 kg)</label>
                        </div>
                        <div className="wrap__input wrap-size pull-left col-3">
                          <input id="is-Small" type="radio" 
                          className="radio input__radio" 
                          name="dwfrm_miaaPet_petSize"
                           value="Small"
                           onClick={()=>this.selectWeight("Small")}/>
                          <label className="label label__input" for="is-Small">Mini (4-10 kg)</label>
                        </div>
                        <div className="wrap__input wrap-size pull-left col-3">
                          <input id="is-Medium" type="radio" 
                          className="radio input__radio" 
                          name="dwfrm_miaaPet_petSize" 
                          value="Medium"
                          onClick={()=>this.selectWeight("Medium")}/>
                          <label className="label label__input" for="is-Medium">Medium (10-25 kg)</label>
                        </div>
                        <div className="wrap__input wrap-size pull-left col-3">
                          <input id="is-Large" type="radio" className="radio input__radio" 
                          name="dwfrm_miaaPet_petSize"
                           value="Large"
                           onClick={()=>this.selectWeight("Large")}/>
                          <label className="label label__input" for="is-Large">Maxi (25-45 kg)</label>
                        </div>
                        <div className="wrap__input wrap-size pull-left col-3">
                          <input id="is-X-Large" type="radio" className="radio input__radio" name="dwfrm_miaaPet_petSize" 
                          value="X-Large"
                          onClick={()=>this.selectWeight("X-Large")}/>
                          <label className="label label__input" for="is-X-Large">Giant (over 45 kg)</label>
                        </div>
                      </div>
                    </div>:null
                  }
                  {
                    this.state.currentStep === 'step6'?
                    <div id="step-6" className="section next-step">
                      <h2>Is your pet sterilized?</h2>
                      <div className="group-size">
                        <div className="wrap__input col-6 pull-left text-center">
                          <input id="is-true" type="radio" className="radio input__radio" 
                          name="dwfrm_miaaPet_neuteredPet" 
                          value="true"
                          onClick={()=>this.setSterilized(true)}/>
                          <label className="label label__input" for="is-true">Sterilized</label>
                        </div>
                        <div className="wrap__input col-6 pull-left text-center">
                          <input id="is-false" 
                          type="radio" 
                          className="radio input__radio" 
                          name="dwfrm_miaaPet_neuteredPet" 
                          value="false" 
                          onClick={()=>this.setSterilized(false)}/>
                          <label className="label label__input" for="is-false">Not sterilized</label>
                        </div>
                      </div>
                    </div>:null
                  }
                  {
                    this.state.currentStep === 'step7'?
                    <div id="step-7" className="section next-step">
                      <h2>Enter the date of birth of your pet.</h2>
                      <span className="rc-input rc-input--inline rc-input--label rc-margin-bottom--md--mobile rc-margin-bottom--sm--desktop">
                        <input className="rc-input__date" id="id-date" data-js-dateformat="DD/MM/YYYY" name="example-date-input" type="date" />
                        <label className="rc-input__label" for="id-date">
                        </label>
                      </span>
                      <div className="invalid-birthdate invalid-feedback">Please select a past date.</div>
                      </div>:null
                  }
                  {
                    this.state.currentStep === 'step8'?
                    <div id="step-8" className="section next-step not-hidden">
                      <h2>What features does your pet have?</h2>
                      <div>
                        <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                        <input type="checkbox" className="rc-input__checkbox" id="appetize" value="true" name="dwfrm_miaaPet_appetize"/>
                        <label className="rc-input__label--inline" for="appetize">
                        Pickiness in food
                        </label>
                        </div>
                        <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                          <input type="checkbox" 
                            className="rc-input__checkbox" 
                            id="irritations" 
                            value="true" 
                            name="dwfrm_miaaPet_irritations"/>
                          <label className="rc-input__label--inline" for="irritations">
                          Skin and Wool Care
                          </label>
                        </div>
                        <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                          <input type="checkbox" 
                          className="rc-input__checkbox" id="joint" 
                          value="true" name="dwfrm_miaaPet_joint"/>
                          <label className="rc-input__label--inline" for="joint">
                          Increased joint sensitivity
                          </label>
                        </div>
                        <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                          <input type="checkbox" className="rc-input__checkbox" id="digestive" value="true" name="dwfrm_miaaPet_digestive"/>
                          <label className="rc-input__label--inline" for="digestive">
                          Sensitive digestive system
                          </label>
                        </div>
                        <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                          <input type="checkbox" className="rc-input__checkbox" id="overweight" value="true" name="dwfrm_miaaPet_overweight"/>
                          <label className="rc-input__label--inline" for="overweight">
                          Weight gain
                          </label>
                        </div>
                        <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                          <input type="checkbox" className="rc-input__checkbox" id="noneeds" value="true" name="dwfrm_miaaPet_noneeds"/>
                          <label className="rc-input__label--inline" for="noneeds">
                          No special needs
                          </label>
                        </div>
                        </div>
                      </div>:null
                  }
                  {
                    this.state.currentStep !== 'success'?
                     <div className="col wrap-btn">
                      <button type="button" name="next" 
                        style = {{marginBottom:'20px'}}
                        className="rc-btn rc-btn--one btn-next btn-block js-btn-next" 
                        disabled={this.state.isDisabled?"disabled":null}
                        onClick={this.nextStep}>
                        Farther
                      </button>
                    </div>:null
                  }
                  {
                    this.state.currentStep === 'success'?
                    <div className="add-pet-success js-add-pet-success" >
                      <img src={success} className="img-success" alt="" title=""/>
                      <div className="text-done">Fine!</div>
                      <div className="text-done">Welcome to the ROYAL CANIN® family!</div>
                    </div>:null
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