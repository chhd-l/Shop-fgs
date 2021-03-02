import React from 'react';
import GoogleTagManager from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FormattedMessage, injectIntl } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { setSeoConfig } from '@/utils/utils';
import BreadCrumbs from '@/components/BreadCrumbs';
import BannerTip from '@/components/BannerTip';
import './index.css';
import { Helmet } from 'react-helmet';

const localItemRoyal = window.__.localItemRoyal;
const pageLink = window.location.href
@injectIntl
@inject('configStore')
@observer
class TermsConditionsUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      seoConfig: {
        title: '',
        metaKeywords: '',
        metaDescription: ''
      },
      mailAddress: ''
    };
  }

  componentWillUnmount() {
    localItemRoyal.set('isRefresh', true);
  }
  async componentDidMount() {
    // if (localItemRoyal.get('isRefresh')) {
    //   localItemRoyal.remove('isRefresh');
    //   window.location.reload();
    //   return false;
    // }
    const tel = 'tel:' + this.props.configStore.storeContactPhoneNumber;
    const mailAddress = 'mailto:' + this.props.configStore.storeContactEmail;

    this.setState({ tel, mailAddress });
    setSeoConfig({
      pageName: 'general terms conditions page'
    }).then(res => {
      this.setState({seoConfig: res})
    });
  }
  render(h) {
    const event = {
      page: {
        type: 'other',
        theme: '',
        path: location.pathname,
        error: '',
        hitTimestamp: new Date(),
        filters: '',
      }
    };
    return (
      <div>
        <GoogleTagManager additionalEvents={event} />
        <Helmet>
          <link rel="canonical" href={pageLink} />
          <title>{this.state.seoConfig.title}</title>
          <meta name="description" content={this.state.seoConfig.metaDescription}/>
          <meta name="keywords" content={this.state.seoConfig.metaKeywords}/>
        </Helmet>
        <Header
          showMiniIcons={true}
          showUserIcon={true}
          location={this.props.location}
          history={this.props.history}
          match={this.props.match}
        />

        <main className="rc-content--fixed-header rc-bg-colour--brand3">
          {process.env.REACT_APP_LANG == 'fr' ? null : <BannerTip />}
          <BreadCrumbs />
          {/* <div className="rc-bg-colour--brand3 rc-bottom-spacing data-checkout-stage rc-max-width--lg rc-padding-x--md--mobile"> */}
          <div className="rc-max-width--xl rc-padding-x--sm rc-padding-x--md--mobile rc-margin-y--sm rc-margin-y--lg--mobile richtext  noParagraphMargin">
            <div className="rc-bg-colour--brand3">
              <div className="rc-padding-left--none">
                <div className="rc-padding--sm rc-padding-left--none">
                  <div className="rc-one-column">
                    <div className="rc-column rc-padding-left--none">
                      <div className="rc-full-width rc-text--left rc-padding-x--sm rc- padding-left--none">

                      </div>
                    </div>
                  </div>
                  <p>
                    <h6 style={{fontWeight:'550'}}>Royal Canin SALES TERMS AND CONDITIONS</h6>
                  </p>
                  <p>
                    Welcome to Royal Canin!
                    <br/>
                    <br/>
                    Royal Canin U.S.A., Inc. (<a style={{fontWeight:'550'}}>“Royal Canin,” “we,” “us,” “our”</a>) provides its Royal Canin-branded products and related services (collectively, our “<a style={{fontWeight:'550'}}>Products</a>”) to you as our valued customer (<a style={{fontWeight:'550'}}>“Customer”, “you”, “yours”</a>) through our website located at https://shop.royalcanin.com/us and all related domains, subdomains, software, services, and features (collectively, the “Site”). ROYAL CANIN makes this Site available for your use subject to the Terms and Conditions contained herein (as amended from time to time, the “<a style={{fontWeight:'550'}}>Terms</a>”) and the ROYAL CANIN Terms of Use, available here https://my.royalcanin.com/termsofuse.
                    <br />
                    <br />
                    BY ACCESSING OR USING THE SITE IN ANY WAY, YOU AGREE TO AND ARE BOUND BY THIS AGREEMENT, AND IF YOU DO NOT ACCEPT ANY OF THE TERMS OF THIS AGREEMENT AND/OR YOU DO NOT MEET OR COMPLY WITH THEIR PROVISIONS, YOU MAY NOT USE THE SITE.
                    <br/>
                    <br/>
                    If you are under 13 years of age, you are not authorized to use the SITE, with or without registering. In addition, if you are under 18 years old, you may use the SITE with or without registering, only with the approval of your parent or guardian.
                    <br/>
                    <br/>
                    <a style={{fontWeight:'550'}}> 1.- SITE REGISTRATION</a>
                    <br />
                    <br />
                    Access to our Site requires you to be registered with us via a ROYAL CANIN-generated registration form. This form will require you to provide certain requested information (including personal information). At such time, you will be provided with an account and login information including a username and password to successfully complete the registration process. If you choose to register for our Site, you agree to provide and maintain true, accurate, current and complete information about yourself as prompted by the Site’s registration form. For more information about our collection of personal information about you in connection with account registration on our Site, please review our Privacy Policy here: <a style={{textDecoration: 'underline'}} href={'http://www.mars.com/global/policies/privacy/pp-english.aspx'}>http://www.mars.com/global/policies/privacy/pp-english.aspx</a>.
                    <br/>
                    <br />
                    You are responsible for maintaining the confidentiality of your password and account, if any, and are fully responsible for any and all activities that occur under your password or account. You must provide accurate and complete information and keep your account information updated. Failure to do so shall constitute a breach of these Terms, which may result in immediate termination of your account. We may refuse to grant you a particular username for any reason, including, without limitation, if we have reason to believe that such username impersonates someone else, is protected by trademark or other proprietary rights, or is vulgar or otherwise offensive.
                    <br/>
                    <br />
                    You may have the option to register with ROYAL CANIN using your Facebook or other third party services (“<a style={{fontWeight:'550'}}>Social Networking Sites</a>”) credentials or otherwise registering in order to access and use certain features of our Site. By logging in or directly integrating these Social Networking Sites into the Site, we make your online experiences richer and more personalized. To take advantage of these features and capabilities, we may ask you to authenticate, register for or log into Social Networking Sites on the websites of their respective providers. Please remember that the manner in which Social Networking Sites use, store and disclose your information is governed solely by the policies of such third parties, and ROYAL CANIN shall have no liability or responsibility for the privacy practices or other actions of any third
                  </p>
                  <p>
                    <a style={{fontWeight:'550'}}>2.- SALES POLICY</a>
                    <br />
                    Royal Canin cannot promise that any particular Products or pricing will be available at any time. Until Customer has confirmed an order, pricing, offers, selection and availability of any Products offered may change without notice.
                  </p>
                  <p>
                    <a style={{fontWeight:'550'}}>3.- TERMINATION</a>
                    <br />
                    In addition to any remedies that may be provided under these Terms, Royal Canin may terminate these Terms with immediate effect upon notice to Customer.
                  </p>
                  <p>
                    <a style={{fontWeight:'550'}}>4.- RESALE</a>
                    <br />
                    Customer shall not sell, fulfill, provide or ship any Products in any manner whatsoever. Royal Canin may immediately limit, stop or prohibit sales to Customer if Customer fails to comply with the obligations of this Section.
                  </p>
                  <p>
                    <a style={{fontWeight:'550'}}>5.- PRODUCT DESCRIPTION AND PRICING ERRORS</a>
                    <br />
                    Although Royal Canin tries to accurately describe and display Products, Royal Canin cannot and does not promise that Product descriptions or depictions are accurate, complete, reliable, current or error-free.
                  </p>
                  <p>
                    <a style={{fontWeight:'550'}}>6.- ORDER ACCEPTANCE</a>
                    <br />
                    When a Product is offered for sale as part of our Site, ROYAL CANIN may accept your offer to purchase such Product subject to these Terms. Customer's receipt of an electronic or other form of order confirmation from Royal Canin does not signify Royal Canin'S acceptance of Customer's order, nor does it constitute confirmation of Royal Canin'S offer to sell. Royal Canin reserves the right to accept or reject Customer's order for any reason at any time after receipt of Customer's order without providing a reason to Customer. If Royal Canin rejects Customer's order, Royal Canin will attempt to notify Customer using the e-mail address provided with Customer's order but Royal Canin disclaims any responsibility or liability in the event Customer does not receive any such attempted e-mail notification. Generally, Customer's credit/debit card or bank account will not be charged if Royal Canin rejects an order; however, Royal Canin will process a refund if a charge has been made against Customer's credit/debit card or bank account for a rejected order.
                  </p>
                  <p>
                    <a style={{fontWeight:'550'}}>7.- ORDER LIMITATIONS/LIMITED QUANTITIES</a>
                    <br />
                    Royal Canin may, at its sole discretion, limit or cancel quantities purchased. Restrictions may include orders placed by the same account, orders that use the same credit/debit card or bank account or orders that use the same billing and/or shipping address. If Royal Canin makes a change to Customer's order, Royal Canin will attempt to notify Customer by the e-mail and/or billing address provided with Customer's order but Royal Canin disclaims any responsibility or liability in the event Customer does not receive any such attempted notification. Royal Canin reserves the right to limit, stop or prohibit sales to Customer for any reason.
                  </p>
                  <p>
                    <a style={{fontWeight:'550'}}>8.- SHIPPING AND HANDLING</a>
                    <br />
                    This shipping and handling policy applies to orders delivered to Customer. Orders delivered to Customer that are filled from stock usually ship either the next business day after the order is received or per the truck delivery schedule in Customer's account area. Royal Canin shall not be liable for any delays, loss or damage in transit. Royal Canin may, in its sole discretion, without liability or penalty, make partial shipments of Products to Customer. Each shipment will constitute a separate sale, and Customer shall pay for the units shipped whether such shipment is in whole or partial fulfillment of Customer's order.
                    <br/>
                    <br/>
                    Customer may have the option to select “autoship” for the fulfillment of Products, resulting in the automatic shipment of Products selected by Customer on a preset frequency. Customer has the ability to adjust certain Product specifications related to autoship option, including size, weight and delivery frequency. Additionally, Customer may achieve product savings in certain cases by opting for autoship services. Please be advised that autoship is not a default feature and requires Customer to “opt-in” through selection on the Site. The default autoship frequency is delivery every four (4) weeks.
                    <br/>
                    <br/>
                    Title and risk of loss passes to Customer upon delivery of the Products at Customer's location set forth in Customer’s order.
                    <br/>
                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>9.- SHIPPING AND HANDLING</a>
                   <br/>
                   <br/>
                    To purchase a Product, you will be required to provide ROYAL CANIN information regarding your credit card or other payment instrument (“Payment Method”). You represent and warrant to ROYAL CANIN that such Payment Method is true and that you are authorized to use the Payment Method. You hereby authorize ROYAL CANIN to bill your Payment Method in accordance with the Product you are purchasing. You shall be responsible for all taxes and duties associated with Products other than U.S. taxes based on ROYAL CANIN’s net income.
                   <br/>
                   <br/>
                    By providing a Payment Method, you are expressly agreeing that we are authorized to keep such Payment Method on file and charge you the fees, charges, or other amounts described herein. If you want to use a different Payment Method than the one you signed up to use during registration, or if there is a change in your credit card validity or expiration date, you may edit your Payment Method information by logging in to your account and viewing your account details. If your Payment Method expires and you do not edit your Payment Method information or cancel your account, you understand that you will not be able to purchase Products on the Site.
                   <br/>
                   <br/>
                    In addition to all other remedies available under these Terms or at law (which Royal Canin does not waive by the exercise of any rights hereunder), Royal Canin shall be entitled to suspend the delivery of Products if Customer fails to pay any amounts when due hereunder and such failure continues for thirty (30) days following written notice thereof. Customer shall not withhold payment of any amounts due and payable by reason of any set-off of any claim or dispute with Royal Canin, whether relating to Royal Canin'S breach, bankruptcy or otherwise.
                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>10.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    Royal Canin is required to comply with the sales and use tax laws in the states in which it operates. In jurisdictions that impose sales or use tax, a purchase is subject to tax unless specifically exempt by law. Certain purchases are subject to tax even if Royal Canin is not required to collect sales or use tax by any particular jurisdiction. Customer's purchase is NOT exempt from tax merely because Royal Canin does not collect the tax from Customer at the time of Customer's purchase. Furthermore, Customer's purchase is NOT exempt merely because it is made over the Internet, by phone, by catalog, or by other remote means. Customer shall be solely responsible for any taxes not collected by Royal Canin and certain jurisdictions may require Customer (i) to file a sales/use tax return annually reporting taxable purchases that were not taxed and (ii) to pay such tax. For more information, Customer should contact the applicable taxing authority. If Royal Canin collects sales or use tax in connection with a purchase, the amount of the tax will either be shown prior to completion of the purchase or reflected in the final confirmation of that purchase. All sales and use tax amounts collected by Royal Canin are remitted to the appropriate taxing authorities in a timely and legally defined manner.
                    <br/>
                    <br/>
                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>11.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    Authorization of credits for Products damaged in shipment, shipping errors or short shipment will only be granted if the request is made within five (5) business days of Product receipt. Royal Canin will provide specific instructions on the disposition of the Product. At Royal Canin'S sole discretion, Products will be credited at the original purchase price or replaced at no additional charge.
                    <br/>
                    <br/>
                    Authorization of credits for order mistakes made by Customer will only be granted if the request is made within thirty (30) calendar days of Product receipt. Royal Canin will provide direction on the disposition of Customer's Product return. Returned Product must be in saleable condition, in the original packaging with no damage or written marks indicating a return. If the Product is returned within thirty (30) calendar days of delivery, credit for the full purchase price will be issued. No credit will be issued after thirty (30) calendar days.

                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>12.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    The Site may include features that involve information that you upload, submit, store, or send through our Site (“<a style={{fontWeight:'550'}}>User Content</a>”). By submitting User Content to our Site, you grant a transferable, nonexclusive, worldwide, perpetual, irrevocable, royalty-free right and license to use, reproduce, modify, edit, adapt, publish, translate, display, distribute, sell, sublicense, and create derivative works and compilations incorporating User Content to ROYAL CANIN to provide our Site and for any other legal purpose of ROYAL CANIN’S choosing. We reserve the right to remove User Content or ROYAL CANIN Content from our Site at any time and for any reason without notification to you. YOU AGREE THAT YOU WILL EVALUATE AND BEAR ALL RISK RELATED TO THE USE OF, OR ANY ACTIVITIES ASSOCIATED WITH, USER CONTENT THAT YOU POST OR PROVIDE THROUGH THE SITE. THE RESULTS OF ANY ACTIONS YOU TAKE BASED USER CONTENT, OR OTHER CONTENT YOU FIND ON THE SITE ARE SOLELY YOUR RESPONSIBILITY. Under no circumstances will we be liable in any way for User Content or for any loss or damage of any kind incurred as a result of the transmission of any of User Content through our Site.
                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>13.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    Personal information that Customer submits to Royal Canin in connection with Customer's account is collected, processed, used, shared and disclosed as described in the Mars Privacy Statement (available at <a style={{textDecoration:'underline'}} href={'http://www.mars.com/global/policies/privacy/pp-english.aspx'}>http://www.mars.com/global/policies/privacy/pp-english.aspx</a>).
                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>14.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    YOUR USE OF OUR PRODUCTS AND SITE IS AT YOUR SOLE RISK. UNLESS EXPLICITLY NOTED IN A WARRANTY PROVIDED BY Royal Canin, OUR PRODUCTS AND OUR SITE ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. Royal Canin EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.
                    <br/>
                    <br/>
                    Royal Canin MAKES NO WARRANTY THAT (1) OUR PRODUCT OR OUR SITE WILL MEET YOUR REQUIREMENTS, (2) OUR PRODUCTS OR OUR SITE OR USE THEREOF WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (3) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF OUR PRODUCT OR OUR SERVICE WILL BE ACCURATE OR RELIABLE, (4) THE QUALITY OF OUR PRODUCTS, SITE, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SITE WILL MEET YOUR EXPECTATIONS, (5) THAT DEFECTS IN THE OPERATION OR FUNCTIONALITY OF THE SITE WILL BE CORRECTED, OR (6) THAT OUR SITE AND ANY CONTENT OR INFORMATION FOUND ON THE SITE WILL BE ERROR OR VIRUS-FREE.
                    <br/>
                    <br/>
                    ANY CONTENT OR OTHER MATERIALS DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF OUR SITE IS DONE AT YOUR SOLE RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH MATERIAL. FURTHER, PLEASE NOTE THAT NO ADVICE OR INFORMATION, OBTAINED BY YOU THROUGH THE SITE OR ANY PRODUCT WILL CREATE ANY WARRANTY NOT EXPRESSLY PROVIDED FOR IN THIS AGREEMENT.
                    <br/>
                    <br/>
                    SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU. IF YOU ARE A USER FROM NEW JERSEY, THE SECTIONS TITLED “DISCLAIMER OF WARRANTIES” AND “LIMITATION OF LIABILITY” ARE INTENDED TO BE ONLY AS BROAD AS IS PERMITTED UNDER THE LAWS OF THE STATE OF NEW JERSEY. IF ANY PORTION OF THESE SECTIONS ARE HELD TO BE INVALID UNDER THE LAWS OF THE STATE OF NEW JERSEY, THE INVALIDITY OF SUCH PORTION SHALL NOT AFFECT THE VALIDITY OF THE REMAINING PORTIONS OF THE APPLICABLE SECTIONS.
                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>15.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    IN NO EVENT SHALL Royal Canin BE LIABLE TO CUSTOMER OR ANY THIRD PARTY FOR ANY SPECIAL, INDIRECT, INCIDENTAL, PUNITIVE, EXEMPLARY OR CONSEQUENTIAL DAMAGES, INCLUDING BUT NOT LIMITED TO LOST PROFITS OR DIMINUTION IN VALUE, IN ANY WAY ARISING OUT OF OR RELATING TO ANY BREACH OF THESE TERMS, CUSTOMER'S ORDERS OF PRODUCTS OR ANY OTHER INTERACTION BETWEEN CUSTOMER AND Royal Canin HOWEVER CAUSED, UNDER A CLAIM OF ANY TYPE OR NATURE, BASED ON ANY LEGAL OR EQUITABLE THEORY (CONTRACT, TORT OR OTHERWISE), REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE AND EVEN IF Royal Canin IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND NOTWITHSTANDING THE FAILURE OF ANY AGREED OR OTHER REMEDY OF ITS ESSENTIAL PURPOSE, EXCEPT WHERE THE EXCLUSION OR LIMITATION OF CERTAIN LIABILITIES IS PROHIBITED BY LAW.
                    <br/>
                    <br/>
                    If you are a California resident, you waive California Civil Code Section 1542, which says: “A general release does not extend to claims which the creditor does not know or suspect to exist in his favor at the time of executing the release, which if known by him must have materially affected his settlement with the debtor.” If you are a resident of another jurisdiction, you waive any comparable statute or doctrine.
                    <br/>
                    <br/>
                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>16.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    Customer agrees to defend, indemnify, and hold harmless Royal Canin and its parent, subsidiaries and affiliates and their owners, shareholders, officers, directors, affiliates, employees, suppliers and agents from and against any and all claims, liabilities, damages, losses and expenses (including reasonable attorneys' fees and costs) due to, arising out of or in any way connected with (i) Customer's orders, (ii) orders made using Customer's account or password, (iii) Customer's use, handling, repackaging, storage and/or distribution of Products, (iv) breach of any provision of these Terms by Customer or any third party using Customer's account or password; and (v) Customer's use of the Royal Canin website.
                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>17.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    Royal Canin'S failure to act with respect to Customer's breach of these Terms or the breach of these Terms by others does not waive Royal Canin'S right to act with respect to similar or subsequent breaches. If any part of these Terms is held to be unenforceable or invalid, such part will be deemed automatically superseded by an enforceable, valid provision most closely matching the intent of the original provision and the remainder of these Terms will continue in effect. These Terms will be binding upon Customer and Customer's successors and permitted assigns. Customer may not assign any of Customer's rights or delegate any of Customer's obligations hereunder without the express prior written consent of Royal Canin. All remedies available for breach of these Terms are cumulative and may be exercised concurrently or separately. The exercise of one remedy will not be deemed an election of such remedy to the exclusion of other remedies. While these Terms are automatically effective, Customer agrees to execute and deliver such further documents and assurances, if any, as may be required from time to time to give effect to these Terms. Customer shall comply with all applicable laws, regulations and ordinances. Customer shall maintain in effect all the licenses, permissions, authorizations, consents and permits that it needs to carry out its obligations under these Terms. Provisions of these Terms which by their nature should apply beyond their terms will remain in force after any termination or expiration of these Terms. These Terms are for the sole benefit of the parties hereto and their respective successors and permitted assigns and nothing herein, express or implied, is intended to or shall confer upon any other person or entity any legal or equitable right, benefit or remedy of any nature whatsoever under or by reason of these Terms. Royal Canin shall not be liable or responsible to Customer, nor be deemed to have defaulted or breached these Terms, for any failure or delay in fulfilling or performing any term of these Terms when and to the extent such failure or delay is caused by or results from acts or circumstances beyond the reasonable control of Royal Canin.
                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>18.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    These Terms and all transactions contemplated hereby shall be deemed made and entered into in the State of Missouri and shall be governed by the internal laws of the State of Missouri, but excluding its and all other jurisdictions choice of law principles. Customer agrees to and submits to the exclusive jurisdiction of courts of or in the State of Missouri over any disputes under these Terms and waives any objection to the jurisdiction.
                    <br/>
                    <br/>
                    To the extent feasible, the parties desire to resolve any dispute, claim or controversy arising out of or relating to your use of or access to our Site, these Terms or the breach, termination, enforcement, interpretation, or validity of these Terms, including the determination of the scope or applicability of this agreement to arbitration (a “Dispute”) through discussions and negotiations between each other. The parties agree to attempt to resolve any Disputes by negotiation with the other party (by phone, electronic correspondence, or written correspondence). If we are not able to resolve any Dispute ourselves, either party may initiate legal proceedings in accordance with this Section.
                </p>

                  <p>
                    <a style={{fontWeight:'550'}}>19.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    These Terms constitute the entire agreement between Customer and Royal Canin with respect to the sale of goods and supersedes any prior agreements, understandings, contracts, instruments, negotiations and discussions with respect to the subject matter hereof, whether written or oral, all of which are of no further force and effect. These Terms expressly supersede all provisions in any purchase order. If a written contract signed by both parties is in existence covering the sale of the goods covered hereby, the terms and conditions of said contract shall prevail to the extent they are inconsistent with these Terms. These Terms prevail over any of Customer's general terms and conditions of purchase regardless whether or when Customer submitted its purchase order or such terms. Fulfillment of Customer's order does not constitute acceptance of any of Customer's terms and conditions and does not serve to modify or amend these Terms. These Terms may be amended, modified, or terminated by ROYAL CANIN at any time in its sole discretion. ROYAL CANIN shall post any updates to these Terms on the Site. Please check the Site often for updates to these Terms.  The provisions of these Terms that by their content are intended to survive the expiration or termination of these Terms, including, without limitation, disclaimers, liability, indemnification, governing law, jurisdiction, venue, remedies, rights after termination, and interpretation of these Terms, will survive the expiration or termination of these Terms for their full statutory period.
                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>20.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    The ROYAL CANIN name and logos are trademarks and service marks of ROYAL CANIN (collectively the “ROYAL CANIN Trademarks”). Other ROYAL CANIN Product and service names and logos used and displayed via our Site may be trademarks or service marks of their respective owners who may or may not endorse or be affiliated with or connected to ROYAL CANIN. Nothing in these Terms or our Site should be construed as granting, by implication, estoppel, or otherwise, any license or right to use any of ROYAL CANIN Trademarks displayed on the Site, without our prior written permission in each instance. All goodwill generated from the use of ROYAL CANIN Trademarks will inure to our exclusive benefit.
                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>21.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    You agree that breach of the provisions of these Terms would cause irreparable harm and significant injury to us which would be both difficult to ascertain and which would not be compensable by damages alone. As such, you agree that we have the right to enforce the provisions of these Terms by injunction (without necessity of posting bond), specific performance, or other equitable relief without prejudice to any other rights and remedies we may have for your breach of these Terms.
                  </p>

                  <p>
                    <a style={{fontWeight:'550'}}>22.- SHIPPING AND HANDLING</a>
                    <br/>
                    <br/>
                    Customer understands that checking the box to agree to these Terms constitutes a legally-binding electronic signature that has the same force and effect as a manual signature. Customer agrees that notices about an order or otherwise related to these Terms may be sent by email or other electronic communication. Customer acknowledges that these Terms and the Terms of Use (available at http://www.mars.com/global/policies/legal/ld-english.aspx) will apply equally. If any provision of the Terms of Use and these Terms are irrevocably inconsistent, then the provision in these Terms will prevail to the extent of the inconsistency.
                    <br/>
                    <br/>
                    Customers should direct Product concerns to Royal Canin Customer Care at 1-844-673-3772 so that Royal Canin may investigate and appropriately address such Product concerns.
                    <br/>
                    <br/>
                    For assistance with your order please call 1-844-673-3772. Orders can be placed online at http://shop.royalcanin.com/us
                  </p>

                  <p>
                    EFFECTIVE AUGUST 1, 2019
                  </p>
                </div>



              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default TermsConditionsUs;
