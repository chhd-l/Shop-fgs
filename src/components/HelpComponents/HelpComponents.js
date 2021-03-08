import React from 'react';
import emailImg from '@/assets/images/emailus_icon@1x.jpg';
import callImg from '@/assets/images/customer-service@2x.jpg';
import helpImg from '@/assets/images/slider-img-help.jpg';
import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';

const HelpComponents =()=>{
  return(
    <div className="experience-component experience-layouts-1column">
      <div className="row rc-margin-x--none">
        <div className="rc-full-width">
          <div className="experience-component experience-layouts-cardcarousel">
            <div className="rc-margin-bottom--md rc-margin-bottom--xl--mobile text-center">
              <h3 className="rc-beta">We're here to help</h3>
              <p className="rc-card__meta">
                Our team is available to answer your questions and ensure  you have the
                best possible expericence.
              </p>
              <p className="rc-card__meta">
                You can reach us through the following options:
              </p>

              -------

              <div className=" rc-layout-container rc-five-column rc-match-heights rc-reverse-layout-mobile text-center text-md-left">
                <div className="rc-padding--none flex justify-content-center margin-auto">
                  <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                  <div className="rc-border-all rc-border-colour--interface fullHeight">
                    <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                      <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                        <div className="w-100">
                          <b style={{ color: '#00BCA3' }}>
                            Call us
                          </b>
                          <p>
                            {/*  {*/}
                            {/*  this.props.configStore*/}
                            {/*    .contactTimePeriod*/}
                            {/*}*/}
                            Our Pet Experts are happy to help you
                            everyday from 9 am to 6 pm
                          </p>
                          <div className="rc-margin-top--xs">
                            <p
                              style={{ color: '#00BCA3' }}
                              className="rc-numeric rc-md-up"
                            >
                              {/*<a*/}
                              {/*  href={this.state.tel}*/}
                              {/*  style={{ color: '#00BCA3' }}*/}
                              {/*>*/}
                              {/*  /!* <FormattedMessage id="help.tel" /> *!/*/}
                              {/*  {*/}
                              {/*    this.props.configStore*/}
                              {/*      .storeContactPhoneNumber*/}
                              {/*  }*/}
                              {/*</a>*/}
                              <a
                                style={{ color: '#00BCA3' }}
                              >
                                {/* <FormattedMessage id="help.tel" /> */}
                                0874 657 890
                              </a>

                            </p>
                          </div>
                          <div className="rc-margin-top--xs">
                            {/*<p*/}
                            {/*  style={{ color: '#00BCA3' }}*/}
                            {/*  className="rc-alpha rc-border--none rc-md-down"*/}
                            {/*  onClick={this.mobileDial}*/}
                            {/*>*/}
                            {/*  {*/}
                            {/*    this.props.configStore*/}
                            {/*      .storeContactPhoneNumber*/}
                            {/*  }*/}
                            {/*</p>*/}
                            <p
                              style={{ color: '#00BCA3' }}
                              className="rc-alpha rc-border--none rc-md-down"
                            >
                              你好吗
                            </p>

                          </div>
                        </div>
                      </div>
                      <div className="rc-column rc-content-v-middle">
                        <LazyLoad>
                          <img
                            className="align-self-center widthAuto"
                            src={callImg}
                            alt="By telephone"
                            title="By telephone"
                          />
                        </LazyLoad>
                      </div>
                    </div>
                  </div>
                </article>
                  <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                    <div className="rc-border-all rc-border-colour--interface fullHeight">
                      <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                        <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                          <div className="w-100">
                            <b style={{ color: '#00BCA3' }}>
                              Email us,
                            </b>
                            <p>
                              {/*  {*/}
                              {/*  this.props.configStore*/}
                              {/*    .contactTimePeriod*/}
                              {/*}*/}
                              We'll do our best to get back to you as fast as possible
                              and within 12 hours
                            </p>
                            <div className="rc-margin-top--xs">
                              <p
                                style={{ color: '#00BCA3' }}
                                className="rc-numeric rc-md-up"
                              >
                                {/*<a*/}
                                {/*  href={this.state.tel}*/}
                                {/*  style={{ color: '#00BCA3' }}*/}
                                {/*>*/}
                                {/*  /!* <FormattedMessage id="help.tel" /> *!/*/}
                                {/*  {*/}
                                {/*    this.props.configStore*/}
                                {/*      .storeContactPhoneNumber*/}
                                {/*  }*/}
                                {/*</a>*/}
                                <a
                                  style={{ color: '#00BCA3' }}
                                >
                                  {/* <FormattedMessage id="help.tel" /> */}
                                </a>

                              </p>
                            </div>
                            <div className="rc-margin-top--xs">
                              {/*<p*/}
                              {/*  style={{ color: '#00BCA3' }}*/}
                              {/*  className="rc-alpha rc-border--none rc-md-down"*/}
                              {/*  onClick={this.mobileDial}*/}
                              {/*>*/}
                              {/*  {*/}
                              {/*    this.props.configStore*/}
                              {/*      .storeContactPhoneNumber*/}
                              {/*  }*/}
                              {/*</p>*/}
                              <p
                                style={{ color: '#00BCA3' }}
                                className="rc-alpha rc-border--none rc-md-down"
                              >
                                你好吗
                              </p>

                            </div>
                          </div>
                        </div>
                        <div className="rc-column rc-content-v-middle">
                          <LazyLoad>
                            <img
                              className="align-self-center widthAuto"
                              src={emailImg}
                              alt="By telephone"
                              title="By telephone"
                            />
                          </LazyLoad>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article className="rc-full-width rc-column rc-margin-top--md--mobile">
                    <div className="rc-border-all rc-border-colour--interface fullHeight">
                      <div className="rc-layout-container rc-three-column rc-margin--none rc-content-h-middle rc-reverse-layout-mobile fullHeight rc-padding-top--md--mobile">
                        <div className="rc-column rc-double-width rc-padding-top--md--mobile">
                          <div className="w-100">
                            <p>
                              {/*  {*/}
                              {/*  this.props.configStore*/}
                              {/*    .contactTimePeriod*/}
                              {/*}*/}
                              You can check our <a style={{color:'red'}} href=''>FAQ section</a> to see if your question has already
                              been answered
                            </p>
                            <div className="rc-margin-top--xs">
                              <p
                                style={{ color: '#00BCA3' }}
                                className="rc-numeric rc-md-up"
                              >
                                {/*<a*/}
                                {/*  href={this.state.tel}*/}
                                {/*  style={{ color: '#00BCA3' }}*/}
                                {/*>*/}
                                {/*  /!* <FormattedMessage id="help.tel" /> *!/*/}
                                {/*  {*/}
                                {/*    this.props.configStore*/}
                                {/*      .storeContactPhoneNumber*/}
                                {/*  }*/}
                                {/*</a>*/}
                                <a
                                  style={{ color: '#00BCA3' }}
                                >
                                  {/* <FormattedMessage id="help.tel" /> */}
                                </a>

                              </p>
                            </div>
                            <div className="rc-margin-top--xs">
                              {/*<p*/}
                              {/*  style={{ color: '#00BCA3' }}*/}
                              {/*  className="rc-alpha rc-border--none rc-md-down"*/}
                              {/*  onClick={this.mobileDial}*/}
                              {/*>*/}
                              {/*  {*/}
                              {/*    this.props.configStore*/}
                              {/*      .storeContactPhoneNumber*/}
                              {/*  }*/}
                              {/*</p>*/}
                              <p
                                style={{ color: '#00BCA3' }}
                                className="rc-alpha rc-border--none rc-md-down"
                              >
                                你好吗
                              </p>

                            </div>
                          </div>
                        </div>
                        <div className="rc-column rc-content-v-middle">
                          <LazyLoad>
                            <img
                              className="align-self-center widthAuto"
                              src={helpImg}
                              alt="By telephone"
                              title="By telephone"
                            />
                          </LazyLoad>
                        </div>
                      </div>
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

export default HelpComponents;
