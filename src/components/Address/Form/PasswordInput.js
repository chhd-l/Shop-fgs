import React from 'react';
import cn from 'classnames';
import { Input } from '@/components/Common';
import { injectIntl, FormattedMessage } from 'react-intl-phraseapp';
import './PasswordInput.less';

const pass_word = 'pass' + 'word';
const regs = {
  lowerReg: /[a-z]+/,
  upperReg: /[A-Z]+/,
  nameReg: /[\d]+/,
  specialReg:
    /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im
};

@injectIntl
class PasswordInput extends React.Component {
  static defaultProps = {
    onChange() {}
  };

  state = {
    passwordValue: '',
    passwordInputType: pass_word,
    passwordValid: true,
    passwordMessage: '',
    passwordChanged: false,

    ruleLength: false,
    ruleLower: false,
    ruleUpper: false,
    ruleAname: false,
    ruleSpecial: false
  };

  getInputState = () => {
    const { passwordValue, passwordValid } = this.state;
    return {
      value: passwordValue,
      valid: passwordValid
    };
  };

  setInputValue = (value) => {
    this.inputChange({ target: { value } });
  };

  inputChange = (e) => {
    const value = e.target.value;
    const { onChange } = this.props;
    const { lowerReg, upperReg, nameReg, specialReg } = regs;

    onChange(value);

    this.setState(
      {
        passwordValue: value,
        ruleLength: value.length >= 8,
        ruleLower: lowerReg.test(value),
        ruleUpper: upperReg.test(value),
        ruleAname: nameReg.test(value),
        ruleSpecial: specialReg.test(value)
      },
      () => {
        this.validInput(value);
      }
    );
  };

  validInput = (value) => {
    const { ruleLength, ruleLower, ruleUpper, ruleAname, ruleSpecial } =
      this.state;

    const valid =
      ruleLength && ruleLower && ruleUpper && ruleAname && ruleSpecial;

    this.setState({
      passwordValid: valid,
      passwordMessage: value.trim()
        ? this.props.intl.messages.registerPasswordFormat
        : this.props.intl.messages.registerFillIn
    });
  };

  inputFocus = () => {
    this.setState({
      passwordChanged: true
    });
  };

  inputBlur = (e) => {
    const value = e.target.value;
    this.setState({
      passwordChanged: false
    });
    this.validInput(value);
  };

  deleteInput = () => {
    this.setState({
      passwordValue: '',
      passwordMessage: this.props.intl.messages.registerFillIn,
      ruleLength: false,
      ruleLower: false,
      ruleUpper: false,
      ruleAname: false,
      ruleSpecial: false
    });
  };

  render() {
    const {
      passwordInputType,
      passwordValue,
      passwordValid,
      passwordMessage,
      passwordChanged,

      ruleLength,
      ruleLower,
      ruleUpper,
      ruleAname,
      ruleSpecial
    } = this.state;

    return (
      <Input
        className="password-input-wrapper"
        id="registerPassword"
        type={passwordInputType}
        maxLength="32"
        minLength="8"
        name="password"
        valid={passwordValid}
        onChange={this.inputChange}
        onFocus={this.inputFocus}
        autocomplete="new-password"
        onBlur={this.inputBlur}
        value={passwordValue}
        label={<FormattedMessage id="registerPassword" />}
        inValidLabel={passwordMessage}
        rightOperateBoxJSX={
          <>
            {!passwordValue ? null : (
              <span
                className={
                  'iconfont iconchahao font-bold icon-unsuscribe cursor-pointer inline-block py-3 px-2'
                }
                style={{ color: '#c03344' }}
                onClick={this.deleteInput}
              />
            )}
            <span
              style={{ color: '#666' }}
              className={cn(
                'iconfont cursor-pointer font-bold text-lg inline-block py-3 px-2',
                passwordInputType === pass_word ? 'iconeye' : 'iconeye-close'
              )}
              onClick={() => {
                this.setState({
                  passwordInputType:
                    this.state.passwordInputType === pass_word
                      ? 'text'
                      : pass_word
                });
              }}
            />
            <button
              type="button"
              className={`rc-btn rc-btn--icon rc-icon rc-iconography rc-input__password-toggle hidden ${
                passwordInputType === pass_word ? 'rc-show--xs' : 'rc-hide--xs'
              }`}
              onClick={() => {
                this.setState({
                  passwordInputType:
                    this.state.passwordInputType === pass_word
                      ? 'text'
                      : pass_word
                });
              }}
            >
              <span className="rc-screen-reader-text">
                <FormattedMessage id="registerTogglePassword" />
              </span>
            </button>
          </>
        }
        toolTip={
          <div
            className={cn('tippy-popper', {
              hidden: !passwordChanged
            })}
            role="tooltip"
            id="password-tooltip"
            x-placement="top"
          >
            <div
              className="tippy-tooltip brand4-theme rc-brand4-theme"
              data-size="regular"
              data-animation="shift-away"
              data-state="visible"
              data-interactive=""
            >
              <div className="tippy-arrow" />
              <div className="tippy-content" data-state="visible">
                <div className="rc-tooltip rc-text--left">
                  <div className="rc-meta">
                    <FormattedMessage id="registerRules" />
                  </div>
                  {[
                    {
                      status: ruleLength,
                      label: <FormattedMessage id="registerLength" />
                    },
                    {
                      status: ruleLower,
                      label: <FormattedMessage id="registerLowercase" />
                    },
                    {
                      status: ruleUpper,
                      label: <FormattedMessage id="registerUppercase" />
                    },
                    {
                      status: ruleAname,
                      label: <FormattedMessage id="registerAname" />
                    },
                    {
                      status: ruleSpecial,
                      label: <FormattedMessage id="registerSpecial" />
                    }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={cn('rc-badge--label', {
                        'rc-text-colour--success': item.status
                      })}
                      data-password-strength="length"
                    >
                      {item.status ? (
                        <span className="iconfont green mr-2 iconchenggong" />
                      ) : null}
                      <span className="icon-validation rc-epsilon rc-b rc-hidden" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      />
    );
  }
}

export default PasswordInput;
