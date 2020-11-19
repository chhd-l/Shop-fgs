import React from 'react'
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {LinkJSX} from "./link"

export const bannerTips = () =>{
    return (
        <div id="bannerTip" className="red font-weight-normal p-1 position-relative text-center pr-4 pl-4 rc-bg-colour--brand4">
        {process.env.REACT_APP_IS_PROMOTION === 'true' && (
          <div
            style={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              fontSize: '1em',
              fontWeight: '300',
              marginBottom: '-.4rem'
            }}
          >
            <span className="iconfont mr-2" style={{ fontSize: '1.4em',color:'#E41E35',fontWeight:'bold' }}>&#xe675;</span>
            <div style={{minWidth:'220px'}}>
              <FormattedMessage id="home.promotionTip" />
            </div>
            <div>
              <LinkJSX/>
            </div>
          </div>
        )}
        <FormattedMessage id="home.note1" defaultMessage={' '} />{' '}
        <FormattedMessage id="home.note2" defaultMessage={' '} />
      </div>
    )
}