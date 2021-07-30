import React, { useEffect, useState } from 'react';
import './questionnaire.less';
export const FormContext = React.createContext({});
export default function QuestionnaireForm({ components }) {
  const [formData, setFormData] = useState({});
  /**
   * 当form组件下的子组件 值改变 修改formData
   * @param id
   * @param data
   */
  const changeFormData = (id, data) => {
    formData[id] = data;
    setFormData(formData);
  };
  return (
    <FormContext.Provider
      value={{
        changeFormData: changeFormData
      }}
    >
      <div className="questionnaire-form">
        <form>
          <div className="questionnaire-form-content">
            {components.map((item, index) => (
              <div className="questionnaire-form-item">
                {item}
                <div></div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </FormContext.Provider>
  );
}
