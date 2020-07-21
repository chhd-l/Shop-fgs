import { action, observable, computed, runInAction } from "mobx";
import store from 'storejs'

class CheckoutStore {
  @observable linkClinicId = store.get('rc-clinic-id-link') || ''
  @observable linkClinicName = store.get('rc-clinic-name-link') || ''

  @observable selectClinicId = store.get('rc-clinic-id-select') || ''
  @observable selectClinicName = store.get('rc-clinic-name-select') || ''

  @observable defaultClinicId = store.get('rc-clinic-id-default') || ''
  @observable defaultClinicName = store.get('rc-clinic-name-default') || ''

  @computed get clinicId () {
    return this.linkClinicId || this.selectClinicId || this.defaultClinicId
  }
  @computed get clinicName () {
    return this.linkClinicName || this.selectClinicName || this.defaultClinicName
  }

  @action
  setLinkClinicId (data) {
    this.linkClinicId = data
    store.set('rc-clinic-id-link', data)
  }

  @action
  setLinkClinicName (data) {
    this.linkClinicName = data
    store.set('rc-clinic-name-link', data)
  }

  @action
  removeLinkClinicId () {
    this.linkClinicId = ''
    store.remove('rc-clinic-id-link')
  }

  @action
  removeLinkClinicName () {
    this.linkClinicName = ''
    store.remove('rc-clinic-name-link')
  }

  @action
  setSelectClinicId (data) {
    this.linkClinicId = data
    store.set('rc-clinic-id-select', data)
  }

  @action
  setSelectClinicName (data) {
    this.linkClinicName = data
    store.set('rc-clinic-name-select', data)
  }

  @action
  setDefaultClinicId (data) {
    this.linkClinicId = data
    store.set('rc-clinic-id-default', data)
  }

  @action
  setDefaultClinicName (data) {
    this.linkClinicName = data
    store.set('rc-clinic-name-default', data)
  }
}
export default CheckoutStore;