import React from 'react';
import { FormattedMessage } from 'react-intl';
import Skeleton from 'react-skeleton-loader';
import { findUserSelectedList,userBindConsent} from "@/api/consent"
import { inject, observer } from 'mobx-react';
import Consent from "@/components/Consent"
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
            //tempArr[index].innerHtml = arr.length!=0 ? arr[0].contentBody:''
            tempArr[index].innerHtml = tempArr[index].innerHtml?'':arr[0]?arr[0].contentBody:''
           
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
  //从子组件传回
  sendList = (list)=>{
    this.setState({list})
}

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
          <div id="wrap" style={{marginLeft:'20px'}}>
            {/* checkbox组 */}
            <Consent list={this.state.list} sendList={this.sendList} disabled={!this.state.editFormVisible} zoom={"150%"}/>
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
