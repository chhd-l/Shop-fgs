import React from 'react';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { findUserSelectedList,userBindConsent} from "@/api/consent"
import { inject, observer } from 'mobx-react';
@inject('configStore')
@observer
class CommunicationDataEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormVisible: false,
      list:[],
      isLoading:false
    };
  }
  async componentDidMount() {
    document.getElementById('wrap').addEventListener('click',(e)=>{     
        if(e.target.localName === 'span'){
            let keyWords = e.target.innerText
            let index = Number(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id)
          
            let arr = this.state.list[index].detailList.filter(item=>{
                return item.contentTitle == keyWords
            })

            let tempArr = [...this.state.list]
            tempArr[index].innerHtml = arr.length!=0 ? arr[0].contentBody:''
           
            this.setState({list: tempArr})

        }
    })
    this.setState({
        isLoading:true
    })
    try {
        let result = await findUserSelectedList({})
          
        const optioalList = result.context.optionalList.map(item => {
            return {
                id: item.id,
                consentTitle: item.consentTitle,
                isChecked: item.selectedFlag,
                isRequired: false,
                detailList: item.detailList
            }
        })

        let list = [...optioalList]
        this.setState({
            list
        })

        console.log(51,this.state.list)
        
    } catch (err) {
        console.log(err.message)
    } finally{
        this.setState({
            isLoading:false
        })
    }
  }
  //组装submit参数
  bindSubmitParam = (list)=>{
    let obj = {optionalList:[]}
    list.filter(item=>!item.isRequired).forEach((item=>{
        obj.optionalList.push({id:item.id,selectedFlag:item.isChecked})
    }))

    return obj
  }
  //保存
  async handleSave() {
    try{
         let submitParam = this.bindSubmitParam(this.state.list)

         const result = await userBindConsent(submitParam)
         if (result.code === 'K-000000'){
           window.location.reload();
         }
    }catch(err){
        console.log(err.message)
    }    
  }
  handleCancel = () => {
    this.setState({
        editFormVisible:false
    })
  };

  render() {
    const {editFormVisible} = this.state
    const createMarkup = (text) => ({ __html: text });
    return (
      <div>
        <div className="userContactPreferenceInfo">
          <div className="profileSubFormTitle">
            <h5 className="rc-espilon rc-margin--none">
              <FormattedMessage id="account.preferredMmethodsOfCommunication" />
            </h5>
            <FormattedMessage id="edit">
              {(txt) => (
                <button
                  className={`editPersonalInfoBtn rc-styled-link pl-0 pr-0 ${
                    editFormVisible ? 'hidden' : ''
                  }`}
                  name="contactPreference"
                  id="contactPrefEditBtn"
                  title={txt}
                  alt={txt}
                  onClick={() => {
                    this.setState({ editFormVisible: true });
                  }}
                >
                  {txt}
                </button>
              )}
            </FormattedMessage>
          </div>
          <hr />
          <span className="rc-meta">
            <b>
              <FormattedMessage id="account.emailCommunication" />
            </b>
          </span>
          <div
            className={`row rc-padding-top--xs rc-margin-left--none rc-padding-left--none contactPreferenceContainer ${
              editFormVisible ? 'hidden' : ''
            }`}
          >
          </div>
          <div>
            {/* checkbox组 */}
            <div className="account-infomation required-checkbox" id="wrap">
                {
                    this.state.isLoading
                    ?
                    <div className="pt-2 pb-2">
                        <Skeleton color="#f5f5f5" width="100%" count={4} />
                    </div>
                    :
                    this.state.list.map((item, index) => {
                        return (
                            <div id={index}> 
                                <div className="footerCheckbox" key={index} className='d-flex align-items-sm-start' style={{paddingLeft:'20px'}}>
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
                                    disabled={!editFormVisible}
                                    checked={item.isChecked}
                                />
                                    <div className="d-flex align-items-sm-center" style={{marginTop:'-1px'}}>
                                        <div
                                            className="description"
                                            dangerouslySetInnerHTML={createMarkup(
                                                item.consentTitle
                                            )}
                                        ></div>
                                        {item.isRequired ? <em className="pl-2 rc-text-colour--brand1">*</em> : null}
                                    </div>
                                </div>
                                <div style={{paddingTop:'5px',paddingLeft: '20px',fontSize: '12px',color: '#C0392B',marginBottom:'10px',marginTop:'-5px'}} dangerouslySetInnerHTML={createMarkup(
                                    item.innerHtml
                                )}>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* 取消和保存 按钮 */}
            <div className={`text-right contactPreferenceFormBtn ${
                editFormVisible ? '' : 'hidden'
              }`}>
              <a
                className="rc-styled-link editPersonalInfoBtn"
                name="contactPreference"
                onClick={() => this.handleCancel()}
              >
                <FormattedMessage id="cancel" />
              </a>
              &nbsp;
              <FormattedMessage id="or" />
              &nbsp;
              <button
                className="rc-btn rc-btn--one submitBtn"
                name="contactPreference"
                type="submit"
                onClick={() => this.handleSave()}
              >
                <FormattedMessage id="save" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CommunicationDataEditForm;
