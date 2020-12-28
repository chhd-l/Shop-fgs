import React, {Component,Fragment} from 'react'
import {linkTransform} from "@/api/refuge"

class RefugeSource extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    async componentWillMount(){
        try{
          const shortLinkSuffix = this.props.location.pathname.split("/")[1]
          const res = await linkTransform({shortLinkSuffix})
          if(res.code=='K-000000'){
            const sourceParam = res.context.longLink.split("?")[1]
            this.props.history.push('/promotion-refuge.html'+'?'+sourceParam)
          }
        }catch(err){
          console.log(err)
        }
      }
    render() {
        return (
            <Fragment/>
        )
    }
}
export default RefugeSource