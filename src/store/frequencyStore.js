import { action, observable } from "mobx";
import store from 'storejs'

class FrequencyStore {
  @observable buyWay = sessionStorage.getItem('rc-buyway') || 'once' // once/frequency
  @observable frequencyName = sessionStorage.getItem('rc-frequencyName')

  @action.bound
  updateBuyWay (data) {
    this.buyWay = data
    sessionStorage.setItem('rc-buyway', data)
  }

  @action.bound
  updateFrequencyName (data) {
    this.frequencyName = data
    sessionStorage.setItem('rc-frequencyName', data)
  }
}
export default FrequencyStore;