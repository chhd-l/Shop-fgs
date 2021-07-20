//  <FrequencyMatch currentId={item.periodTypeId}
//  setState={this.setState.bind(this)}
//  />
import React, { useEffect, useState } from 'react';
import { getFrequencyDict, matchNamefromDict } from '@/utils/utils';
const FrequencyMatch = (props) => {
  const [frequencyList, setFrequencyList] = useState([]);
  useEffect(() => {
    if (props.currentId) {
      getFrequencyDict(props.currentId).then((res) => {
        setFrequencyList(res);
        props.setState && props.setState({ frequencyList: res });
      });
    }
  }, [props.currentId]);
  return <>{matchNamefromDict(frequencyList, props.currentId)} </>;
};
export default FrequencyMatch;
