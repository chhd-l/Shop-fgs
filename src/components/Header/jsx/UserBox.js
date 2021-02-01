import React from "react";
import { Link } from 'react-router-dom';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { injectIntl, FormattedMessage } from 'react-intl';
import "../css/user.less"

const localItemRoyal = window.__.localItemRoyal;
const userInfo = localItemRoyal.get('rc-userinfo') || null

export const UnLoginUserBox = (props) => {
    const { self,history } = props
    const {
        registerRouter,
        reimbursementsRouter,
        breederPortalRouter,
        vetPortalRouter,
    } = self.props
    return (
        <div className={`user-unLogin-popover`}>
            <div className="already"><FormattedMessage id="header.User.alreadyRegistered"/></div>
            <LoginButton
                btnStyle={{ width: '14rem', margin: '.5rem 0',padding: '5px 0' }}
                history={history}
            />
            <div className="newUser"><FormattedMessage id="header.User.newUser"/><span onClick={() => { self.toUrl(registerRouter) }}><FormattedMessage id="header.User.registerNow"/></span></div>
            <div className="Offers" onClick={() => { self.toUrl(reimbursementsRouter) }}>
                <a className="rc-icon rc-icon-user"></a> <span><FormattedMessage id="header.User.offersAndreimbursements"/></span>
            </div>
            <div className="brandName"><FormattedMessage id="header.User.royalCaninPartner"/></div>
            <div className="breeder">
                <em onClick={() => { self.toUrl(breederPortalRouter) }}><FormattedMessage id="header.User.breederPortal"/></em>
                <span><FormattedMessage id="header.User.or"/></span>
                <em onClick={() => { self.toUrl(vetPortalRouter) }}><FormattedMessage id="header.User.vetPortal"/></em></div>
        </div>
    );
}


export const LoginUserBox = (props) => {
    const { self } = props
    const {
        homeRouter,
        personInformationRouter,
        petsRouter,
        subscriptionsRouter,
        offersRouter,
        faqRouter,
        monRoyalCaninRouter,
    } = self.props
    return (
        <div className={`user-login-popover`}>
            <div className="Media">
                <div className="Media-figure">{userInfo && userInfo.firstName && userInfo.firstName.slice(0, 1)}</div>
                <div className="Media-body">
                    <div className="fullName">{userInfo && userInfo.firstName}</div>
                    <LogoutButton />
                </div>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(homeRouter)}}>
                <span className="iconfont">&#xe697;</span>{' '}<span><FormattedMessage id="header.User.home"/></span>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(personInformationRouter)}}>
                 <span className="iconfont">&#xe69c;</span>{' '}<span><FormattedMessage id="header.User.myPersonalInformation"/></span>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(petsRouter)}}>
                <span className="iconfont">&#xe69a;</span>{' '}<span><FormattedMessage id="header.User.pets"/></span>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(subscriptionsRouter)}}>
                <span className="iconfont">&#xe699;</span>{' '}<span><FormattedMessage id="header.User.myOrders"/></span>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(offersRouter)}}>
                <span className="iconfont">&#xe6a2;</span>{' '}<span><FormattedMessage id="header.User.mySubscriptions"/></span>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(faqRouter)}}>
                <span className="iconfont">&#xe696;</span>{' '}<span><FormattedMessage id="header.User.faq"/></span>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(monRoyalCaninRouter)}} style={{borderTop: '1px solid #DEDEDE',paddingTop:'5px'}}>
                <a className="iconfont iconzhuanfa"></a><span><FormattedMessage id="header.User.monRoyalCanin"/></span>
            </div>
        </div>
    );
}