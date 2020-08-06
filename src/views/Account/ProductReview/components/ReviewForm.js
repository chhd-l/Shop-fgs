import { FormattedMessage, injectIntl } from "react-intl";
import React from "react";
import Rate from "@/components/Rate";
import ImgUpload from "@/components/ImgUpload";
import { findIndex } from "lodash";
import "../index.css";
@injectIntl
class ReviewForm extends React.Component {
  constructor() {
    super();
    this.state = {
      consumerComment: "",
      textErrorInfo: "",
      // productRate: 5
      errMessage: 0,
      title:''
    };
    this.imgUploaderRef = React.createRef();
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps, nextContext) {
    // debugger
    // if(nextProps.isSubmit) {
    //     this.textarea.blur();
    // }
  }

  selectProductRate(rate) {
    this.props.selectProductRate(rate, this.props.product);
  }
  handleConsumerCommentChange(e) {
    this.setState({
      consumerComment: e.target.value,
    });
    this.props.handleConsumerCommentChange(e, this.props.product);
    this.inputBlur(e);
  }
  handleTitleChange(e){
    this.setState({
      title: e.target.value,
    });
    this.props.handleTitleChange(e, this.props.product);
    this.inputBlur(e);
  }
  handelImgChange() {
    if (this.imgUploaderRef) {
      this.props.handleImgChange(this.imgUploaderRef, this.props.product);
    }
  }
  handleErrMessage = (flag) => {
    clearTimeout(this.timer);
    this.setState({
      errMessage: flag,
    });
    this.timer = setTimeout(() => {
      this.setState({
        errMessage: "",
      });
    }, 3000);
  };

  inputBlur(e) {
    let validDom = Array.from(
      e.target.parentElement.parentElement.children
    ).filter((el) => {
      let i = findIndex(Array.from(el.classList), (classItem) => {
        return classItem === "invalid-feedback";
      });
      return i > -1;
    })[0];
    if (validDom) {
      if (!e.target.value) {
        validDom.style.display = "block";
        if (e.target.name === "whatYouLike") {
          this.setState({
            textErrorInfo: "Review is required.",
          });
        }
      } else {
        if (e.target.name === "whatYouLike") {
          if (e.target.textLength < 500) {
            validDom.style.display = "none";
          } else {
            validDom.style.display = "block";
            this.setState({
              textErrorInfo: "Please enter less than 500 characters.",
            });
          }
        } else {
          validDom.style.display = "none";
        }
      }
    }
  }

  render() {
    return (
      <div>
        <div className="rc-five-column rc-padding-bottom--xs rc-border-bottom rc-border-colour--interface">
          <div className="rc-layout-container">
            <div className="rc-column padb0 padt0" style={{marginLeft:'-1rem'}}>
              <div className="">
                <div className="rc-margin-top--xs">
                  <span className="ui-text-overflow-line2 text-break">
                    {this.props.product.skuName}
                  </span>
                </div>
                <div className="rc-margin-top--xs">
                  <span className="text-break">
                    {this.props.product.specDetails}
                  </span>
                </div>
                <div className="rc-margin-top--xs">
                  <Rate
                    def={0}
                    disabled={false}
                    selectRate={(rate) => this.selectProductRate(rate)}
                    marginSize={'.5rem'}
                  ></Rate>
                </div>
              </div>
              <div class="row">
              <div class="form-group col-lg-6 pull-left">
                <label class="form-control-label rc-full-width" for="reference">
                 Title
                </label>
                <span
                  class="rc-input rc-input--full-width rc-input--inline rc-input--label rc-margin--none rc-full-width"
                  input-setup="true"
                >
                  {/* <input
                    type="text"
                    class="rc-input__control input__phoneField"
                    id="reference"
                    name="rfc"
                    maxlength="50"
                    value={this.state.title}
                    style={{padding:0}}
                    onChange={(e) => this.handleTitleChange(e)}
                    onBlur={(e) => this.inputBlur(e)}
                  ></input> */}
                  <input type="text" 
                  placeholder="Title" 
                  class="form-control"              
                  value={this.state.title}
                  style={{padding:0}}
                  onChange={(e) => this.handleTitleChange(e)}
                  onBlur={(e) => this.inputBlur(e)}                 
                  ></input>
                  <label class="rc-input__label" for="reference"></label>
                </span>
              </div>
            </div>

            </div>

            <div className="rc-column text-right padb0">

              <div className="img-container">
                <img className="product-img" src={this.props.product.pic} />
              </div>
            </div>
          </div>
          <div className="">
            <div className="rc-column padt0 padb0" style={{marginLeft:'-1rem'}}>
              <FormattedMessage id="writeYourReview" />
              <div className="padt20">
                <span
                  className="rc-input nomaxwidth rc-border-all rc-border-colour--interface"
                  input-setup="true"
                >
                  <FormattedMessage id="whatYouLike">
                    {(txt) => (
                      <textarea
                        className="rc-input__textarea noborder"
                        rows={2}
                        ref={(textarea) => (this.textarea = textarea)}
                        name="whatYouLike"
                        id="whatYouLike"
                        required={true}
                        placeholder={txt}
                        value={this.state.consumerComment}
                        onChange={(e) => this.handleConsumerCommentChange(e)}
                        onBlur={(e) => this.inputBlur(e)}
                      />
                    )}
                  </FormattedMessage>
                </span>
                <div className="invalid-feedback" style={{ display: "none" }}>
                  {this.state.textErrorInfo}
                </div>
              </div>
            </div>
          </div>

          <div className="rc-layout-container rc-one-column padt0">
            <div className="rc-column mb-3" style={{marginLeft:'-1rem'}}>
              <div
                className={`js-errorAlertProfile-personalInfo rc-margin-bottom--xs ${
                  this.state.errMessage ? null : "hidden"
                }`}
              >
                <aside
                  class="rc-alert rc-alert--error rc-alert--with-close errorAccount mb-3"
                  role="alert"
                >
                  <span>{this.state.errMessage}</span>
                  <button
                    class="rc-btn rc-alert__close rc-icon rc-close-error--xs"
                    aria-label="Close"
                  >
                    <span class="rc-screen-reader-text">Close</span>
                  </button>
                </aside>
              </div>
              <ImgUpload
                ref={this.imgUploaderRef}
                tipVisible={false}
                handleChange={() => this.handelImgChange()}
                geterrMessage={this.handleErrMessage}
              />
            </div>
          </div>
          <div className="rc-layout-container rc-one-column padt0">
            <div className="rc-column padt0" style={{marginLeft:'-1rem'}}>
              <label>
                <input
                  name="isAnonymous"
                  type="checkbox"
                  checked={
                    this.props.product.isAnonymous
                      ? this.props.product.isAnonymous
                      : false
                  }
                  onChange={(e) =>
                    this.props.handleInputChange(e, this.props.product)
                  }
                />
                <span className="rc-margin-left--xs">
                  <FormattedMessage id="anonymousReview" />
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewForm;
