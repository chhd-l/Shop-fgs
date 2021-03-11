import React from 'react';
import Logo from '../../components/Logo';
import Landingpagecat from './ClubImage/Landingpagecat.png'
import Landingpagedog from './ClubImage/landingpagedog.png'
import howitworck4 from './ClubImage/howit4.png';
import LazyLoad from 'react-lazyload';

const JoinToday=()=>{
  return(<div className="experience-component experience-layouts-1column">
    <div className="row rc-margin-x--none ">
      <div className="rc-full-width">
        <div className="experience-component experience-assets-importContentAsset">
          <div className='rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile'>
          <div className="content-asset">
            <div className="rc-bg-colour--brand4">
              <div className="row rc-max-width--lg rc-match-heights rc-padding-y--sm">
                <div className="col-12 col-md-4 order-1 order-md-0">
                  <div className="rc-column rc-padding--none">
                    <LazyLoad >
                      <img
                        className="w-auto lazyloaded"
                        style={{maxWidth:'85%',maxHeight:'85%',marginTop:'30px'}}
                        src={Landingpagecat}
                      />
                    </LazyLoad>
                  </div>
                </div>
                <div
                  className="col-12 col-md-4 m-auto rc-padding-x--sm rc-padding-x--lg--mobile rc-padding-top--lg--mobile order-0 order-md-1">
                  <div style={{display:'flex',justifyContent:'center'}}><Logo/></div>
                  <br/>
                  <div className="rc-gamma rc-text--center"><h2 style={{fontWeight:'550'}}>Join our subscription today</h2></div>
                  <div className="rc-intro inherit-fontsize rc-text--center">
                    <h5>Tell us about your pet to get a precise nutritional recommendation.</h5>
                  </div>
                  <div className="rc-btn-group rc-margin--none rc-padding-x--xs d-none d-md-flex">
                    <button className="rc-btn rc-btn--one">Get started</button>
                  </div>
                </div>
                <div className="col-12 col-md-4 order-2 order-md-2">
                  <div className="rc-column rc-padding--none">
                    <img src={Landingpagedog}    alt="Dog image"/>
                  </div>
                  <div className="d-flex d-md-none justify-content-center rc-bg-colour--brand4 rc-padding-y--lg">
                    <a className="rc-btn rc-btn--sm rc-btn--two w-50" href="https://shop.royalcanin.com/dogs/">Dog</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>)

}
export default JoinToday;
