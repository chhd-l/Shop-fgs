import React from "react";
import { Link } from 'react-router-dom';
import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
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
            <div className="already">{alreadyRegistered}?</div>
            <LoginButton
                btnStyle={{ width: '11rem', margin: '.5rem 0' }}
                history={history}
            />
            <div className="newUser">{newUser}?<span onClick={() => { self.toUrl(registerRouter) }}>{registerNow}</span></div>
            <div className="Offers" onClick={() => { self.toUrl(reimbursementsRouter) }}>
                <a className="rc-icon rc-icon-user"></a> <span>{offers} & {reimbursements}</span>
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
        //router
        overviewRouter,
        personInformationRouter,
        petsRouter,
        subscriptionsRouter,
        offersRouter,
        paymentsRouter,
        securityRouter,
        reimbursementsRouter,
        breederPortalRouter,
        vetPortalRouter,
    } = self.props
    const {
        overview,
        personalInformation,
        pets,
        subscriptions,
        payments,
        addresses,
        security,
        Offers,
        Reimbursements,
        royalCaninPartner,
        breederPortal,
        vetPortal
    } = intl_user.loginUser
    return (
        <div className={`user-login-popover`}>
            <div className="Media">
                <div className="Media-figure">{userInfo && userInfo.firstName && userInfo.firstName.slice(0, 1)}</div>
                <div className="Media-body">
                    <div className="fullName">{userInfo && userInfo.firstName}</div>
                    {/* <div className="logout" onClick={self.handleLogout}>{logOut}</div> */}
                    <LogoutButton />
                </div>
            </div>
            <div className="basicItem" onClick={() => { self.toUrl(overviewRouter) }}>
                <a className="rc-icon rc-icon-user"></a><span>{overview}</span>
            </div>
            <div className="basicItem" onClick={() => { self.toUrl(personInformationRouter) }}>
                <a className="rc-icon rc-icon-user"></a><span>{personalInformation}</span>
            </div>
            <div className="basicItem" onClick={() => { self.toUrl(petsRouter) }}>
                <a className="rc-icon rc-icon-user"></a><span>{pets}</span>
            </div>
            <div className="basicItem" onClick={() => { self.toUrl(subscriptionsRouter) }}>
                <a className="rc-icon rc-icon-user"></a><span>{subscriptions}</span>
            </div>
            <div className="basicItem" onClick={() => { self.toUrl(offersRouter) }}>
                <a className="rc-icon rc-icon-user"></a><span>{Offers}</span>
            </div>
            <div className="basicItem" onClick={() => { self.toUrl(paymentsRouter) }}>
                <a className="rc-icon rc-icon-user"></a><span>{payments} & {addresses}</span>
            </div>
            <div className="basicItem" onClick={() => { self.toUrl(securityRouter) }}>
                <a className="rc-icon rc-icon-user"></a><span>{security}</span>
            </div>
            <div className="Offers" onClick={() => { self.toUrl(reimbursementsRouter) }}>
                <a className="rc-icon rc-icon-user"></a> <span>{Offers} & {Reimbursements}</span>
            </div>
            <div className="brandName">{royalCaninPartner}?</div>
            <div className="breeder"><em onClick={() => { self.toUrl(breederPortalRouter) }}>{breederPortal}</em><span>or</span><em onClick={() => { self.toUrl(vetPortalRouter) }}>{vetPortal}</em></div>
        </div>
    );
}