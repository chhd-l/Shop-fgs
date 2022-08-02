import React, { useEffect, useState } from 'react';
import { getConsentGroupList } from '@/api/consent';
import Consent from '@/components/Consent';
import { inject, observer } from 'mobx-react';

interface Props {
  loginStore?: any;
  onValidChange?: any;
  onCheckedItemsChange?: any;
}

const ConsentModule = ({
  loginStore,
  onValidChange,
  onCheckedItemsChange
}: Props) => {
  const { userInfo } = loginStore;
  const [list, setList] = useState<any[]>([]);

  const sendList = (list: any) => {
    setList(list);
    onCheckedItemsChange({
      requiredList: list
        .filter((item: any) => item.isRequired)
        .map((item: any) => item.id),
      optionalList: list
        .filter((item: any) => !item.isRequired)
        .map((item: any) => item.id)
    });
    onValidChange(
      list
        .filter((item: any) => item.isRequired)
        .every((item: any) => item.isChecked)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const res: any = await getConsentGroupList({
        consentGroup: 'assistanceDogs'
      });
      const optionalList = res?.context?.optionalList.map((item: any) => ({
        id: item.id,
        consentTitle: item.consentTitle,
        isChecked: false,
        isRequired: false,
        detailList: item.detailList,
        consentDesc: item.consentDesc
      }));
      const requiredList = res?.context?.requiredList.map((item: any) => ({
        id: item.id,
        consentTitle: item.consentTitle,
        isRequired: true,
        detailList: item.detailList,
        consentDesc: item.consentDesc
      }));
      setList([...requiredList, ...optionalList]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    window?.document
      ?.getElementById('wrap')
      ?.addEventListener('click', (e: any) => {
        if (e.target.localName === 'font') {
          let keyWords = e.target.innerText;
          let index = Number(
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode
              .parentNode.parentNode.id
          );
          let arr = list[index].detailList.filter((item: any) => {
            return item.contentTitle === keyWords;
          });

          let tempArr = [...list];
          tempArr[index].innerHtml = tempArr[index].innerHtml
            ? ''
            : arr[0]
            ? arr[0].contentBody
            : '';

          setList(tempArr);
        }
      });
  }, []);

  return (
    <Consent
      // @ts-ignore
      list={list}
      key={list.length}
      sendList={sendList}
      pageType="Landing page"
    />
  );
};

export default inject('loginStore')(observer(ConsentModule));
