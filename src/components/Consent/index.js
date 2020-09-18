import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";
import Skeleton from "react-skeleton-loader";
import "./index.css"

class Consent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        //组件传参start
        const list = this.props.list
        const width = this.props.width //默认consent的宽度为500
        //组件传参end
        const createMarkup = (text) => ({ __html: text });
        return (
            <div className="required-component" style={{ width: `${width}px`, margin: '0 auto' }}>
                {
                    this.state.isLoading
                        ?
                        <div className="pt-2 pb-2">
                            <Skeleton color="#f5f5f5" width="100%" count={4} />
                        </div>
                        :
                        list.map((item, index) => {
                            return (
                                <div id={index} style={{ display: 'flex' }}>
                                    <input
                                        className="form-check-input ui-cursor-pointer-pure"
                                        id="id-checkbox-cat-2"
                                        value=""
                                        type="checkbox"
                                        name="checkbox-2"
                                        onChange={() => {
                                            //勾选checkbox
                                            let itemObj = Object.assign(item, {
                                                isChecked: !item.isChecked
                                            })
                                            list.splice(index, 1, itemObj)
                                            //传回给父组件
                                            this.props.sendList(list)
                                        }}
                                        checked={item.isChecked}
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-checkbox" key={index}>
                                            <div className="d-flex">
                                                <div className="rc-text-colour--brand1" style={{ width: '20px' }}>{item.isRequired ? '*' : ''}</div>
                                                <div
                                                    className="footer-checkbox-title"
                                                    style={{ width: `${width}px` }}
                                                    dangerouslySetInnerHTML={createMarkup(
                                                        item.consentTitle
                                                    )}
                                                ></div>

                                            </div>
                                        </div>
                                        <div className="Checkbox-detail" style={{ marginLeft: '20px' }} dangerouslySetInnerHTML={createMarkup(
                                            item.innerHtml
                                        )}></div>
                                    </div>
                                </div>

                            )
                        })
                }

            </div>
        );
    }
}

export default injectIntl(Consent);
