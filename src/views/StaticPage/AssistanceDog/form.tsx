import React, { useEffect, useState } from 'react';
import { Input } from '@/components/Common';
import { FormattedMessage } from 'react-intl-phraseapp';
import cn from 'classnames';
import { EMAIL_REGEXP } from '@/utils/constant';
import Consent from './Consent';
import IMask from 'imask';
import { saveAssistanceDogs } from '@/api/pet';
import { ErrorMessage, SuccessMessage } from '@/components/Message';
import { scrollIntoView } from '@/lib/scroll-to-utils';
import { submitEvent } from './GA';
// import Selection from '@/components/Selection';

interface Props {
  intl: any;
}

interface FormType {
  name: string;
  phone: string;
  petName: string;
  email: string;
  petGraduationSchool: string;
  petID: string;
}

const Form = ({ intl }: Props) => {
  const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false);
  const [submitBtnValid, setSubmitBtnValid] = useState<boolean>(false);
  const [consentValid, setConsentValid] = useState<boolean>(false);

  // 一旦输入过，且不检验成功时，就显示红色报错和叉号
  const [formWarning, setFormWarning] = useState({
    name: false,
    phone: false,
    petName: false,
    email: false,
    petGraduationSchool: false,
    petID: false
  });

  const [formValid, setFormValid] = useState({
    name: false,
    phone: false,
    petName: false,
    email: false,
    petGraduationSchool: false,
    petID: false
  });

  const [emailMessage, setEmailMessage] = useState<string>('');
  const [submitMsg, setSubmitMsg] = useState({
    error: '',
    success: ''
  });
  const [registerForm, setRegisterForm] = useState<FormType>({
    name: '',
    phone: '',
    petName: '',
    email: '',
    petGraduationSchool: '',
    petID: ''
  });
  const [checkedConsentItems, setCheckedConsentItems] = useState({
    optionalList: [],
    requiredList: []
  });

  const registerChange = (e: any) => {
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    validInput(name, value);
    setRegisterForm((cur) =>
      Object.assign({}, cur, { [name]: value })
    );
  };

  const validInput = (name: string, value: string) => {
    let valid;
    switch (name) {
      case 'name':
        valid = !!value.trim();
        break;
      case 'petName':
        valid = !!value.trim();
        break;
      case 'petGraduationSchool':
        valid = !!value.trim();
        break;
      case 'petID':
        valid = !!value.trim();
        break;
      case 'phone':
        valid =
          /^\(\+[3][3]\)[\s](([0][1-9])|[1-9])[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}[\s][0-9]{2}$/.test(
            value
          );
        break;
      case 'email':
        valid = EMAIL_REGEXP.test(value);
        setEmailMessage(
          value
            ? intl.messages.registerEmailFormate
            : intl.messages.registerFillIn
        );
        break;
    }
    if (name === 'phone') debugger;
    setFormValid(Object.assign({}, formValid, { [name]: valid }));
    setFormWarning(Object.assign({}, formWarning, { [name]: !valid }));
  };

  const inputBlur = (e: any) => {
    const target = e.target;
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    validInput(name, value);
  };

  const deleteInput = (name: string) => {
    setRegisterForm((cur) => Object.assign({}, cur, { [name]: '' }));
    validInput(name, '');
    if (name === 'email') {
      setEmailMessage(intl.messages.registerFillIn);
    }
  };

  const onCheckedItemsChange = (data: any) => {
    setCheckedConsentItems(data);
  };

  const onSubmit = async () => {
    submitEvent();
    try {
      setSubmitBtnLoading(true);
      const param = {
        email: registerForm.email,
        phone: registerForm.phone,
        optionalList: checkedConsentItems?.optionalList.map((item: any) => ({
          id: item,
          selectedFlag: true
        })),
        requiredList: checkedConsentItems?.requiredList.map((item: any) => ({
          id: item,
          selectedFlag: true
        })),
        assistanceDogsFlag: true,
        petName: registerForm.petName,
        petSchool: registerForm.petGraduationSchool,
        petId: registerForm.petGraduationSchool,
        customerName: registerForm.name
      };
      await saveAssistanceDogs(param);
      setSubmitMsg((cur) =>
        Object.assign({}, cur, {
          success:
            'Merci! Nous avons bien reçu votre demande. nous vous recontacterons dans un délai de 48h max!'
        })
      );
    } catch (err: any) {
      setSubmitMsg((cur) => Object.assign({}, cur, { error: err.message }));
    } finally {
      setSubmitBtnLoading(false);
      setTimeout(() => {
        scrollIntoView(document.querySelector(`#registerForm`));
      });
      setTimeout(() => {
        setSubmitMsg((cur) =>
          Object.assign({}, cur, { error: '', success: '' })
        );
      }, 5000);
    }
  };

  const onValidChange = (status: boolean) => {
    setConsentValid(status);
  };

  useEffect(() => {
    const element = document.getElementById('phone');
    if (element)
      IMask(element, {
        mask: [
          { mask: '(+33) 0 00 00 00 00' },
          { mask: '(+33) 00 00 00 00 00' }
        ]
      });
  }, []);

  useEffect(() => {
    setSubmitBtnValid(
      formValid.email &&
        formValid.name &&
        formValid.phone &&
        formValid.petID &&
        formValid.petGraduationSchool &&
        formValid.petName &&
        Boolean(registerForm.name) &&
        Boolean(registerForm.phone) &&
        Boolean(registerForm.petName) &&
        Boolean(registerForm.email) &&
        Boolean(registerForm.petGraduationSchool) &&
        Boolean(registerForm.petID) &&
        consentValid
    );
  }, [
    formValid.email,
    formValid.name,
    formValid.phone,
    formValid.petID,
    formValid.petGraduationSchool,
    formValid.petName,
    registerForm.name,
    registerForm.phone,
    registerForm.petName,
    registerForm.email,
    registerForm.petGraduationSchool,
    registerForm.petID,
    consentValid
  ]);

  return (
    <div className="grid grid-cols-12 md:gap-x-14">
      <div className="col-span-12 mb-5">
        <ErrorMessage msg={submitMsg.error} />
        <SuccessMessage msg={submitMsg.success} />
      </div>
      <div className="col-span-12 md:col-span-6">
        {/* @ts-ignore */}
        <Input
          id="registerEmail"
          autocomplete="off"
          type="email"
          name="email"
          isWarning={formWarning.email}
          valid={formValid.email}
          onChange={registerChange}
          onBlur={inputBlur}
          value={registerForm.email}
          label={
            <>
              E-mail <span className="text-rc-red">*</span>
            </>
          }
          highLightSuccess={true}
          rightOperateBoxJSX={
            <RightOperateBoxJSX
              valid={formValid.email}
              isWarning={formWarning.email}
              onClear={() => deleteInput('email')}
            />
          }
          inValidLabel={emailMessage}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        {/* @ts-ignore */}
        <Input
          name="name"
          id="registerName"
          isWarning={formWarning.name}
          valid={formValid.name}
          autocomplete="off"
          onChange={registerChange}
          onBlur={inputBlur}
          value={registerForm.name}
          label={
            <>
              Nom <span className="text-rc-red">*</span>
            </>
          }
          highLightSuccess={true}
          rightOperateBoxJSX={
            <RightOperateBoxJSX
              valid={formValid.name}
              isWarning={formWarning.name}
              onClear={() => deleteInput('name')}
            />
          }
          inValidLabel={<FormattedMessage id="registerFillIn" />}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        {/* <Selection
          selectedItemChange={() => {}}
          optionList={[
            {
              value: 1,
              name: 'fr',
              no: 'fr'
            }
          ]}
        /> */}
        {/* @ts-ignore */}
        <Input
          name="phone"
          id="phone"
          valid={formValid.phone}
          isWarning={formWarning.phone}
          autocomplete="off"
          // onChange={registerChange}
          onInput={registerChange}
          
          onBlur={inputBlur}
          value={registerForm.phone}
          label={
            <>
              Numéro de téléphone <span className="text-rc-red">*</span>
            </>
          }
          highLightSuccess={true}
          rightOperateBoxJSX={
            <RightOperateBoxJSX
              valid={formValid.phone}
              isWarning={formWarning.phone}
              onClear={() => deleteInput('phone')}
            />
          }
          inValidLabel={<FormattedMessage id="registerFillIn" />}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        {/* @ts-ignore */}
        <Input
          name="petName"
          id="registerPetName"
          valid={formValid.petName}
          isWarning={formWarning.petName}
          autocomplete="off"
          onChange={registerChange}
          onBlur={inputBlur}
          value={registerForm.petName}
          label={'Nom du chien'}
          highLightSuccess={true}
          rightOperateBoxJSX={
            <RightOperateBoxJSX
              valid={formValid.petName}
              isWarning={formWarning.petName}
              onClear={() => deleteInput('petName')}
            />
          }
          inValidLabel={<FormattedMessage id="registerFillIn" />}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        {/* @ts-ignore */}
        <Input
          name="petGraduationSchool"
          id="petGraduationSchool"
          valid={formValid.petGraduationSchool}
          isWarning={formWarning.petGraduationSchool}
          autocomplete="off"
          onChange={registerChange}
          onBlur={inputBlur}
          value={registerForm.petGraduationSchool}
          label={'Ecole de provenance du chien'}
          highLightSuccess={true}
          rightOperateBoxJSX={
            <RightOperateBoxJSX
              valid={formValid.petGraduationSchool}
              isWarning={formWarning.petGraduationSchool}
              onClear={() => deleteInput('petGraduationSchool')}
            />
          }
          inValidLabel={<FormattedMessage id="registerFillIn" />}
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        {/* @ts-ignore */}
        <Input
          name="petID"
          id="petID"
          valid={formValid.petID}
          isWarning={formWarning.petID}
          autocomplete="off"
          onChange={registerChange}
          onBlur={inputBlur}
          value={registerForm.petID}
          maxLength={15}
          label={"Numero d'identification de puce du chien"}
          highLightSuccess={true}
          rightOperateBoxJSX={
            <RightOperateBoxJSX
              valid={formValid.petID}
              isWarning={formWarning.petID}
              onClear={() => deleteInput('petID')}
            />
          }
          inValidLabel={<FormattedMessage id="registerFillIn" />}
        />
      </div>
      <div className="col-span-12 leading-snug mb-2">
        Vous pouvez en savoir plus sur la manière dont{' '}
        <a
          href="https://fra.mars.com/mars-et-ses-marques/petcare"
          target="_blank"
          className="text-rc-red font-medium"
        >
          Mars Petcare et ses filiales
        </a>{' '}
        collectent et traitent vos données, nous contacter pour toute question
        relative à la confidentialité et exercer vos droits en matière de
        données à caractère personnel via la{' '}
        <a
          href="https://www.mars.com/privacy-policy-france"
          target="_blank"
          className="text-rc-red font-medium"
        >
          déclaration de confidentialité de Mars
        </a>
        . De façon ponctuelle, vos données pourront être utilisées afin
        d'améliorer nos offres de produits et de services.
      </div>

      <div className="col-span-12 ml-6">
        <Consent
          onValidChange={onValidChange}
          onCheckedItemsChange={onCheckedItemsChange}
        />
      </div>
      <div className="col-span-12 text-center">
        <button
          className={cn('rc-btn rc-btn--one mb-4', {
            'ui-btn-loading': submitBtnLoading
          })}
          disabled={!submitBtnValid}
          onClick={onSubmit}
        >
          Contactez-nous
        </button>
      </div>
      <div className="col-span-12 text-sm">
        Les données personnelles soumises via ce formulaire ne seront conservées
        que dans le but de répondre à votre demande et ne seront pas exploitées
        à des fins marketing. Vous devez être âgé de 16 ans ou plus pour
        soumettre un formulaire.{' '}
      </div>
    </div>
  );
};

export default Form;

const ChaChaIcon = ({
  className,
  onClick = () => {}
}: {
  className?: string;
  onClick?: any;
}) => {
  return (
    <span
      className={cn(
        'iconfont iconchahao font-bold icon-unsuscribe cursor-pointer inline-block py-3 px-2',
        className
      )}
      style={{ color: '#c03344' }}
      onClick={onClick}
    />
  );
};

const GouGouIcon = ({
  className,
  onClick = () => {}
}: {
  className?: string;
  onClick?: any;
}) => {
  return (
    <span
      className={cn(
        'iconfont iconchenggong font-bold icon-unsuscribe cursor-pointer inline-block py-3 px-2 text-green',
        className
      )}
      onClick={onClick}
    />
  );
};

const RightOperateBoxJSX = ({
  value,
  valid,
  isWarning,
  onClear
}: {
  value?: string;
  valid: boolean;
  isWarning?: boolean;
  onClear?: any;
}) => {
  return (
    <>
      {valid ? (
        <GouGouIcon />
      ) : isWarning ? (
        <ChaChaIcon onClick={onClear} />
      ) : null}
      {/* {isWarning ? <ChaChaIcon onClick={onClear} /> : null} */}
    </>
  );
};
