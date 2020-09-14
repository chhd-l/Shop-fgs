// 条款组件
import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import "./index.css"
import Skeleton from "react-skeleton-loader";
// import { confirmAndCommit } from "@/api/payment";
// import {  Link } from 'react-router-dom'
// import store from "storejs";

class TermsCommon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[]
    };
  }
  componentDidMount(){

  }
  componentWillReceiveProps (nextProps) {
    console.log({nextProps})
    this.setState({
      list:this.props.listData
    })
  }
  render() {
    const createMarkup = (text) => ({ __html: text });
    return (
      <div>
        {/* checkbox组 */}
        <div className="required-checkbox" style={{margin: "15px 0 0 40px"}}>
          {
              this.state.isLoading
              ?
              <div className="pt-2 pb-2">
                  <Skeleton color="#f5f5f5" width="100%" count={4} />
              </div>
              :
              this.state.list.map((item, index) => {
                  return (
                      <div className="footerCheckbox" style={{paddingLeft:0}} key={index}>
                          <input
                              className="form-check-input ui-cursor-pointer-pure"
                              id="id-checkbox-cat-2"
                              value=""
                              type="checkbox"
                              name="checkbox-2"
                              onChange={() => {
                                  //替换属性start
                                  let itemObj = Object.assign(item, {
                                      isChecked: !item.isChecked
                                  })
                                  let list = [...this.state.list]
                                  list.splice(index, 1, itemObj)
                                  this.setState({
                                      list
                                  });
                                  //替换属性end
                              }}
                              checked={item.isChecked}
                          />
                          <div className="d-flex">
                              <div
                                  className="description"
                                  dangerouslySetInnerHTML={createMarkup(
                                      item.consentTitle
                                  )}
                              ></div>
                              {item.isRequired ? <span className="pl-2 rc-text-colour--brand1">*</span> : null}
                          </div>

                      </div>
                  )
              })
          }

      </div>
      </div>
    );
  }
}

export default injectIntl(TermsCommon);
