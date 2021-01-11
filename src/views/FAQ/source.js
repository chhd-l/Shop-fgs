import React, {Component,Fragment} from 'react'
import {getFaq} from "@/api/faq"
import Loading from '@/components/Loading';


class FAQSource extends Component {
    constructor(props){
        super(props)
        this.state = {
          circleLoading: true,
        }
    }
    async componentWillMount(){
        const {match,history} = this.props
        try{
         const res = await getFaq({
                language: process.env.REACT_APP_LANG,
                storeId: process.env.REACT_APP_STOREID
              })
          if(res.code=='K-000000'){
            const dataFAQ = res.context
            history.push({pathname:`/FAQ/${match.params.catogery}`,state:{dataFAQ}})
          }
        }catch(err){
          console.log(err)
        }finally{
          this.setState({
            circleLoading: false
          });
        }
      }
    render() {
        return (
            <div>
              {this.state.circleLoading ? <Loading bgColor={'#fff'} /> : null}
            </div>
        )
    }
}
export default FAQSource