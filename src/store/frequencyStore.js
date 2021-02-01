import { action, observable } from 'mobx';

const sessionItemRoyal = window.__.sessionItemRoyal;

class FrequencyStore {
  @observable buyWay = sessionItemRoyal.get('rc-buyway') || 'once'; // once/frequency
  @observable frequencyName = sessionItemRoyal.get('rc-frequencyName');

  @action.bound
  updateBuyWay(data) {
    this.buyWay = data;
    sessionItemRoyal.set('rc-buyway', data);
  }

  @action.bound
  updateFrequencyName(data) {
    this.frequencyName = data;
    sessionItemRoyal.set('rc-frequencyName', data);
  }
}
export default FrequencyStore;
