import React from 'react';
import LazyLoad from 'react-lazyload';
import howitworck1 from './ClubImage/howit1.png'
import howitworck2 from './ClubImage/howit1.png'
import howitworck3 from './ClubImage/howit1.png'
import howitworck4 from './ClubImage/howit1.png'
import workflowicon from './ClubImage/howitworkflow.png'

const HowItWorks=()=>{
  return(
   <div className='experience-component experience-layouts-1column'>
    <div className='row rc-margin-x--none'>
    <div className='rc-full-width'>
      <div className='experience-component experience-assets-contentBlock'>
        <div className='rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile'>
        <br/>
        <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
          <h3 className="rc-beta">How it works</h3>
        </div>
        <div style={{display:"flex"}} className='justify-content-between'>
          <div  >
            <article >
              <div className="rc-card__body">
                <p className="rc-card__meta"><h5>Get the right diet and ration</h5></p>
              </div>
                <img style={{height:'200px', width:'300px'}} src={howitworck1} alt="A Dachshund jumping"/>
              <div className="rc-card__body">
                  <p className="rc-card__meta">Answer a few questions to get a tailor-made nutritional recommendation</p>
              </div>
            </article>
          </div>
          <div style={{alignSelf:'center',marginLeft:'10px',marginRight:'10px'}} ><article> <img src={workflowicon}/> </article> </div>
          <div  >
            <article >
              <div className="rc-card__body">
                <p className="rc-card__meta"><h5>Select the CLUB subscription option</h5></p>
              </div>
              <img style={{height:'200px', width:'300px'}} src={howitworck2} alt="A Dachshund jumping"/>
              <div className="rc-card__body">
                <p className="rc-card__meta">Proceed to check out to subscribe. You will receive a welcome pack with your first delivery</p>
              </div>
            </article>
          </div>
          <div style={{alignSelf:'center',marginLeft:'10px',marginRight:'10px'}} ><article> <img src={workflowicon}/> </article> </div>
          <div  >
            <article >
              <div className="rc-card__body">
                <p className="rc-card__meta"><h5>Get the right diet and ration</h5></p>
              </div>
              <img style={{height:'200px', width:'300px'}} src={howitworck3} alt="A Dachshund jumping"/>
              <div className="rc-card__body">
                <p className="rc-card__meta">Answer a few questions to get a tailor-made nutritional recommendation</p>
              </div>
            </article>
          </div>
          <div style={{alignSelf:'center',marginLeft:'10px',marginRight:'10px'}} ><article> <img src={workflowicon}/> </article> </div>
          <div  >
            <article >
              <div className="rc-card__body">
                <p className="rc-card__meta"><h5>Enjoy exclusive rewards and services</h5></p>
              </div>
              <img style={{height:'200px', width:'300px'}} src={howitworck4} alt="A Dachshund jumping"/>
              <div className="rc-card__body">
                <p className="rc-card__meta">Take advantage of subscription offers and services, like a personal pet advisor, vet consultations and more.</p>
              </div>
            </article>
          </div>
        </div>

      </div>
      </div>
    </div>
    </div>
   </div>
  )
}

export default HowItWorks;
