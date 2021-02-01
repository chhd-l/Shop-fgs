import { action, observable } from "mobx";

class HeaderSearchStore {
  @observable query = '' //Corresponds to the keyword searched on the internal search engine
  @observable results = ''//Number of results (0 if no results)
  @observable type = ''//with results, without results

  @action clear () {
    this.query = ""
    this.results = ""
    this.type = ""
  }
  @action getNoResult (keyword="") {
    this.query = keyword
    this.results = 0
    this.type = 'without results'
  } 
  @action getResult (keyword="",number) {
    this.query = keyword
    this.results = number
    this.type = 'with results'
  } 
}
export default HeaderSearchStore;