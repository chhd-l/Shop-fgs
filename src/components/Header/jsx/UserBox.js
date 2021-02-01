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
    const { intl_user } = self.props
    const {
        registerRouter,
        reimbursementsRouter,
        breederPortalRouter,
        vetPortalRouter,
    } = self.props
    const {
        alreadyRegistered,
        newUser,
        registerNow,
        offers,
        reimbursements,
        royalCaninPartner,
        breederPortal,
        vetPortal
    } = intl_user.unLoginUser
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
            <div className="brandName">{royalCaninPartner}?</div>
            <div className="breeder"><em onClick={() => { self.toUrl(breederPortalRouter) }}>{breederPortal}</em><span>or</span><em onClick={() => { self.toUrl(vetPortalRouter) }}>{vetPortal}</em></div>
        </div>
    );
}


export const LoginUserBox = (props) => {
    const { self } = props
    const { intl_user } = self.props
    const {
        logoutRouter,
        homeRouter,
        personInformationRouter,
        petsRouter,
        subscriptionsRouter,
        offersRouter,
        faqRouter,
        monRoyalCaninRouter,
    } = self.props
    const {
        logOut,
        home,
        myPersonalInformation,
        pets,
        myOrders,
        mySubscriptions,
        faq,
        monRoyalCanin,
    } = intl_user.loginUser
    return (
        <div className={`user-login-popover`}>
             <div className="Media">
                <div className="Media-figure">{userInfo&&userInfo.firstName&&userInfo.firstName.slice(0,1)}</div>
                <div className="Media-body">
                    <div className="fullName">{userInfo&&userInfo.firstName}</div>
                    <div className="logout" onClick={()=>{self.toUrl(logoutRouter)}}>{logOut}</div>
                </div>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(homeRouter)}}>
                <a className="iconfont iconhome"></a><span>{home}</span>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(personInformationRouter)}}>
                <a className="iconfont iconuser"></a><span>{myPersonalInformation}</span>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(petsRouter)}}>
                <a className="iconfont iconshape"></a><span>{pets}</span>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(subscriptionsRouter)}}>
                <a className="iconfont iconbuyCart"></a><span>{myOrders}</span>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(offersRouter)}}>
                <a className="iconfont icondayinji"></a><span>{mySubscriptions}</span>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(faqRouter)}}>
                <a className="iconfont iconmessage"></a><span>{faq}</span>
            </div>
            <div className="basicItem" onClick={()=>{self.toUrl(monRoyalCaninRouter)}} style={{borderTop: '1px solid #DEDEDE',paddingTop:'5px'}}>
                <a className="iconfont iconzhuanfa"></a><span>{monRoyalCanin}</span>
            </div>
        </div>
    );
}