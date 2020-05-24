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
import { createHashHistory } from 'history'
import { Link } from 'react-router-dom';
import edit from "@/assets/images/edit.svg"
import {  getPetList,addPet,petsById } from '@/api/pet'


const selectedPet = {
  border: "3px solid #ec001a",
}
const noSelect ={
  border: "3px solid #d7d7d7",
}
export default class PetForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      precent:12.5,
      step:1,
      isCat:null,
      isMale:null,
      currentStep:'step1',
      isDisabled:true,
      nickname:"",
      isUnknown:false,
      isInputDisabled:false,
      isUnknownDisabled:false,
      breed:"",
      weight:"",
      isSterilized:null,
      birthOfPets:'',
      features:{
        appetize:false,
        irritations:false,
        joint:false,
        digestive:false,
        overweight:false,
        noneeds:false
      },
      showList:false,
      showBreedList:false,
      breedList:[
        {name:'test breed',value:1},
        {name:'test breed2',value:2},
        {name:'test breed3',value:3},
        {name:'test breed4',value:4},
        {name:'test breed5',value:5},
        {name:'test breed6',value:6},
      ],
      cartData: localStorage.getItem('rc-cart-data') ? JSON.parse(localStorage.getItem('rc-cart-data')) : []
    }
    this.nextStep = this.nextStep.bind(this)
    this.selectPetType = this.selectPetType.bind(this)
    this.selectSex = this.selectSex.bind(this)
    this.selectWeight = this.selectWeight.bind(this)
    this.setSterilized = this.setSterilized.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.inputBlur = this.inputBlur.bind(this)
    this.selectFeatures = this.selectFeatures.bind(this)
    this.getPetList()
  }

  componentWillUnmount () {
    localStorage.setItem("isRefresh", true);
  }
  componentDidMount () {
    if (localStorage.getItem("isRefresh")) {
      localStorage.removeItem("isRefresh");
      window.location.reload();
      return false
    }
  }
  getPetList = async ()=>{
    const res = await getPetList()
    if(res.code === 'K-000000'){
      console.log(res);
      
    }
    
  }
  addPet = async ()=>{
    const { features } = this.state
    let petsPropRelations=[]
    let propId = 100
    for(let name in features){
      if(features[name]){
        let prop ={
          "createTime": "2020-05-22T02:36:38.079Z",
          "delFlag": 0,
          "detailId": 0,
          "indexFlag": 0,
          "petsId": "10086",
          "propId": propId,
          "propName": name,
          "relationId": "10086",
          "sort": 0,
          "updateTime": "2020-05-22T02:36:38.079Z"
        }
        petsPropRelations.push(prop)
        propId +=1
      }
    }
    
    
    let pets={
        "birthOfPets": this.state.birthdate,

        "updateTime": "2020-05-22T08:38:21.753Z",
        "updator": "10086",
        "createTime": "2020-05-22T08:38:21.753Z",
        "creator": "10086",

        "petsBreed": this.state.isUnknown?"unknown Breed":this.state.breed,
        "petsId": "10086",
        "petsImg": "10086",
        "petsName": this.state.nickname,
        "petsSex": this.state.isMale?"0":"1",
        "petsSizeValueId": "10086",
        "petsSizeValueName": "10086",
        "petsType": this.state.isCat?'cat':'dog',
        "sterilized":this.state.isSterilized?"0":"1",
    }
    
    console.log(pets);
    
    let param = {
      "pets":pets,
      "petsPropRelations":petsPropRelations,
      "storeId": 10086,
      "userId": "10086"
    }
    const res = await addPet(param)
    if(res.code === 'K-000000'){
      let currentStep = "success"
      this.setState({
        currentStep:currentStep,
      })
      setTimeout(() => {
        
        createHashHistory().push('/account/pets/petList')
        
      }, 10000);
      
    }
    
  }
  nextStep(){
    let step=this.state.step
    let currentStep
    if(step>=8){
      this.addPet()
    }
    else{
      step+= 1
      if(this.state.isCat&& step=== 5){
        step+=1
      }
      currentStep = 'step' + step
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
    let showBreedList = false
    if (e.target.value !=="") {
      isDisabled = false
      isUnknownDisabled = true
      showBreedList = true
    }
    else{
      isDisabled = true
      isUnknownDisabled = false
      showBreedList = false
    }
    this.setState({
      breed: e.target.value,
      isDisabled:isDisabled,
      isUnknownDisabled: isUnknownDisabled,
      showBreedList:showBreedList
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
  handleInputChange(e){

    console.log(this.state.birthdate);
    
    console.log(e.target.value);
    
  }
  inputBlur(e){
    if(e.target.value&&e.target.value!==""){
      this.setState({
        birthdate:e.target.value,
        isDisabled: false
      })
    }
  }
  selectFeatures=(e)=>{
    const target = e.target
    const { features } = this.state
    features[target.id] = (target.value==="false")
    this.setState({ features: features })
    if(this.state.features.appetize ||
      this.state.features.digestive ||
      this.state.features.irritations ||
      this.state.features.joint ||
      this.state.features.noneeds ||
      this.state.features.overweight  ){
        this.setState({
          isDisabled:false
        })
      }
      else{
        this.setState({
          isDisabled:true
        })
      }
    
  }
  selectedBreed=(item)=>{
    this.setState({
      breed:item.name,
      showBreedList:false
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

                {
                  this.state.showList?
                  
                  <div class="list-select-pet js-list-pet" data-toggle-group="">
                    <ul class="scroll--x list list--inline list--align list--blank flex--middle" role="tablist">
                      <li class="pet-element">
                        <a href="/ru/account/" class="tab-add tab--img" role="tab">
                          <span class="rc-icon rc-plus rc-iconography plus-icon add_pet"></span>
                        </a>
                      </li>
                      <li class="rc-margin-x--xs pet-element">
                        <a href="/on/demandware.store">
                          <div class="tab__img img--round img--round--md name--select text-center active">
                            Rita
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>:
                  <div className="list-select-pet js-list-pet" data-toggle-group="">
                    <ul className="scroll--x list list--inline list--align list--blank flex--middle" role="tablist">
                      <li className="pet-element">
                        <a href="/ru/account/pet-carnet?editForm=newPet" className="tab-add tab--img" role="tab">
                          <span className="rc-icon rc-plus rc-iconography plus-icon add_pet"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                }
                {
                  this.state.showList?<div class="pet-information js-pet-information rc-margin-bottom--md">
                    <h2 class="name-pet">Rita</h2>
                    <div class="rc-layout-container">
                      <div class="rc-column">
                      <ul class="pet-data">
                        <li class="breed dog">
                          <span class="">Unknown breed</span>
                        </li>
                        <li class="birth">
                          <span class="">2020-05-05</span>
                        </li>
                        <li class="gender male sprite-pet">
                          <span class="">male</span>
                        </li>
                        <li class="weight">
                          <span class="">Mini</span>
                        </li>
                      </ul>
                      </div>
                      <div class="rc-column">
                      <div class="pet-special-need">Special needs</div>
                      <ul class="list-special-need">
                        <li class="">Skin and Wool Care</li>
                        <li class="">Increased joint sensitivity</li>
                        <li class="">Sensitive digestive system</li>
                      </ul>
                      </div>
                      <div class="edit js-edit-pet">
                        <a href="#" >
                          <img src={edit} class="img-success" alt=""/>
                        </a>
                      </div>
                      <div class="delete">
                        <a href="#">
                        X
                        </a>
                      </div>
                    </div>
                  </div>:null
                }
                <div className="group-progress js-group-progress section-form-group" style={{display:!this.state.showList?'block':'none'}}>
                  <div className="bar-progress">
                    <div className="progress-child red js-percent-step" style={{ width:((this.state.precent*this.state.step) + '%') }}>  
                    </div>
                  </div>
                  <div className="step-progress">
                    <FormattedMessage id="account.step"></FormattedMessage>
                       
                    <span className="js-step-number">
                      {this.state.step}
                    </span>
                    <FormattedMessage id="account.of"></FormattedMessage>
                        8
                  </div>
                </div>
                <div className="pet-form-create" style={{display:!this.state.showList?'block':'none'}}>
                  {
                    this.state.currentStep === 'step1'?
                    <div id="step-1" className="section col-lg-9 col-12">

                      <h2>
                      <FormattedMessage id="account.catOrDog"></FormattedMessage>
                      </h2>
                      <div className="form-group  custom-checkbox col-lg-6">
                        <img src={cat} className="animal-select" alt="" title="" 
                        onClick={()=>this.selectPetType('cat')}
                        style={this.state.isCat===true? selectedPet:noSelect } />
                        <div className="label-option">
                        <FormattedMessage id="account.cat"></FormattedMessage>
                        </div>
                      </div>

                      <div className="form-group custom-checkbox col-lg-6">
                        <img src={dog} className="animal-select" alt="" title="" 
                        onClick={()=>this.selectPetType('dog')}
                        style={ this.state.isCat===false? selectedPet:noSelect } />
                        <div className="label-option">
                        <FormattedMessage id="account.dog"></FormattedMessage>             
                        </div>
                      </div>
                    </div>
                    :null
                  }
                  {
                    this.state.currentStep === 'step2'?
                      <div id="step-2" className="section col-lg-9 col-12 next-step">
                        <h2><FormattedMessage id="account.nickname"></FormattedMessage></h2>
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
                      <h2><FormattedMessage id="account.gender"></FormattedMessage></h2>
                      <div className="form-group custom-control custom-checkbox col-lg-6 ">
                        <label className="pet-select-control select-gender-1 icon-rc" 
                          onClick={()=>this.selectSex('male')} 
                          style={ this.state.isMale === true? selectedPet:noSelect }>
                        </label>
                        <div className="label-option">
                        <FormattedMessage id="account.male"></FormattedMessage>
                        </div>
                      </div>
                      <div className="form-group custom-control custom-checkbox col-lg-6 ">
                        
                        <label className="pet-select-control select-gender-2 icon-rc"  
                        onClick={()=>this.selectSex('female')} 
                        style={this.state.isMale === false? selectedPet:noSelect }></label>
                        <div className="label-option">
                        <FormattedMessage id="account.female"></FormattedMessage>
                        </div>
                      </div>
                    </div>:null
                  }
                  {
                    this.state.currentStep === 'step4'?
                    <div id="step-4" className="section next-step not-hidden col-lg-9 col-12">
                      <h2><FormattedMessage id="account.breed"></FormattedMessage> {this.state.nickname}?</h2>
                      <div className="content-section">
                        <div className="form-group relative">
                          <input type="text" id="dog-breed" 
                            placeholder="Enter your dog's breed" 
                            className="form-control input-pet breed" 
                            value={this.state.breed}
                            onChange={this.inputBreed}  
                            style={{display: (this.state.isCat?"none":null)}}
                            disabled={this.state.isInputDisabled?"disabled":null}/> 
                            
                          <input type="text" id="cat-breed" 
                            placeholder="Enter the breed of your cat" 
                            className="form-control input-pet breed" 
                            value={this.state.breed}
                            onChange={this.inputBreed}  
                            style={{display: (!this.state.isCat?"none":null)}}
                            disabled={this.state.isInputDisabled?"disabled":null}/>

                          <div className="select-breed" style={{display:(this.state.showBreedList?'block':'none')}}>
                            {
                              this.state.breedList.map(item=>(
                                <option value={item.value} key={item.value} onClick={()=>this.selectedBreed(item)}>{item.name}</option>
                              ))
                            }
                          </div>
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
                            <FormattedMessage id="account.unknownBreed"></FormattedMessage>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>:null
                  }
                  {
                    this.state.currentStep === 'step5'?
                    <div id="step-5" className="section next-step">
                      <h2><FormattedMessage id="account.weight"></FormattedMessage> {this.state.nickname} ?</h2>
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
                      <h2><FormattedMessage id="account.sterilized"></FormattedMessage></h2>
                      <div className="group-size">
                        <div className="wrap__input col-6 pull-left text-center">
                          <input id="is-true" type="radio" className="radio input__radio" 
                          name="dwfrm_miaaPet_neuteredPet" 
                          value=""
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
                    
                    <div id="step-7" className="section next-step" style={{display:this.state.currentStep === 'step7'?'block':'none'}}>
                      <h2><FormattedMessage id="account.enterBirthDare"></FormattedMessage></h2>
                      <span className="rc-input rc-input--inline rc-full-width rc-icon rc-calendar--xs rc-interactive rc-iconography--xs" input-setup="true">
                        <input
                          className="rc-input__date rc-js-custom rc-input__control"
                          id="birthdate"
                          data-js-dateformat="DD/MM/YYYY"
                          name="birthdate"
                          type="date"
                          value={this.state.birthdate}
                          onChange={e => this.handleInputChange(e)} 
                          onBlur={e => this.inputBlur(e)}/>
                          
                        <label className="rc-input__label" htmlFor="birthdate"></label>
                      </span>
                      <div className="invalid-birthdate invalid-feedback">Please select a past date.</div>
                      </div>
                  }
                  {
                    this.state.currentStep === 'step8'?
                    <div id="step-8" className="section next-step not-hidden">
                      <h2><FormattedMessage id="account.features"></FormattedMessage></h2>
                      <div>
                        <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                          <input type="checkbox" 
                          className="rc-input__checkbox" 
                          id="appetize"
                          value={this.state.features.appetize} 
                           name="dwfrm_miaaPet_appetize"
                           onClick={(e)=>this.selectFeatures(e)}/>
                          <label className="rc-input__label--inline" for="appetize">
                            Pickiness in food
                          </label>
                        </div>
                        <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                          <input type="checkbox" 
                            className="rc-input__checkbox" 
                            id="irritations" 
                            value={this.state.features.irritations}  
                            name="dwfrm_miaaPet_irritations"
                            onClick={(e)=>this.selectFeatures(e)}/>
                          <label className="rc-input__label--inline" for="irritations">
                            Skin and Wool Care
                          </label>
                        </div>
                        <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                          <input type="checkbox" 
                            className="rc-input__checkbox" id="joint" 
                            value={this.state.features.joint}  
                            name="dwfrm_miaaPet_joint"
                            onClick={(e)=>this.selectFeatures(e)}/>
                          <label className="rc-input__label--inline" for="joint">
                            Increased joint sensitivity
                          </label>
                        </div>
                        <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                          <input type="checkbox" 
                            className="rc-input__checkbox" 
                            id="digestive" 
                            value={this.state.features.digestive} 
                            name="dwfrm_miaaPet_digestive"
                            onClick={(e)=>this.selectFeatures(e)}/>
                          <label className="rc-input__label--inline" for="digestive">
                            Sensitive digestive system
                          </label>
                        </div>
                        <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                          <input type="checkbox" 
                            className="rc-input__checkbox" 
                            id="overweight" 
                            value={this.state.features.overweight} 
                            name="dwfrm_miaaPet_overweight"
                            onClick={(e)=>this.selectFeatures(e)}/>
                          <label className="rc-input__label--inline" for="overweight">
                            Weight gain
                          </label>
                        </div>
                        <div className="rc-input rc-input--inline rc-margin-bottom--xs">
                          <input type="checkbox" 
                            className="rc-input__checkbox" 
                            id="noneeds" 
                            value={this.state.features.noneeds}  
                            name="dwfrm_miaaPet_noneeds"
                            onClick={(e)=>this.selectFeatures(e)}/>
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
                         { this.state.step === 8?'Save':'Farther'}
                      </button>
                    </div>:null
                  }
                  {
                    this.state.currentStep === 'success'?
                    <div className="add-pet-success js-add-pet-success" >
                      <img src={success} className="img-success" alt="" title=""/>
                      <div className="text-done"><FormattedMessage id="account.fine"></FormattedMessage> </div>
                      <div className="text-done"><FormattedMessage id="account.welcome"></FormattedMessage> </div>
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