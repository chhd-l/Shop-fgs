/*
 * Created By ZuoQin On 2021/07/02
 * First order Welcome Box:1、会员 2、第一次下单 3、学生购student promotion 50% discount（未定）
 */
import React from 'react';
import { injectIntl } from 'react-intl';

@injectIntl
class InfosPreview extends React.Component {
  static defaultProps = { checkedValue: 'yes', welcomeBoxChange: () => {} }; //默认选中值
  constructor(props) {
    super(props);
    this.state = {
      welcomeList: [
        {
          label: this.props.intl.messages['firstOrderWelcomeBox.yes'],
          value: 'yes'
        },
        {
          label: this.props.intl.messages['firstOrderWelcomeBox.no'],
          value: 'no'
        }
      ],
      checkedBox: ''
    };
  }
  componentDidMount() {
    this.setState({ checkedBox: this.props.checkedValue });
  }
  welcomeBoxCheckedChange = (e, value) => {
    this.setState({ checkedBox: value });
    this.props.welcomeBoxChange(value);
  };
  render() {
    const { welcomeList, checkedBox } = this.state;
    return (
      <div style={{ borderBottom: '1px solid #d7d7d7' }} className="mb-4">
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.intl.messages['firstOrderWelcomeBox.title']
          }}
        />
        <div className="flex flex-row mb-2 mt-1">
          {welcomeList.map((item, index) => (
            <div className="rc-input rc-input--inline mw-100">
              <input
                className="rc-input__checkbox ui-cursor-pointer-pure"
                id={`id-checkbox-welcome-box-${index}`}
                onChange={(e) => this.welcomeBoxCheckedChange(e, item.value)}
                type="checkbox"
                checked={item.value === checkedBox}
              />
              <label
                className="rc-input__label--inline text-break"
                htmlFor={`id-checkbox-welcome-box-${index}`}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default InfosPreview;
