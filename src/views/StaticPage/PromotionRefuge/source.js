import React, {Component,Fragment} from 'react'
import {linkTransform} from "@/api/refuge"
import Loading from '@/components/Loading';

class RefugeSource extends Component {
    constructor(props){
        super(props)
        this.state = {
          circleLoading: true,
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
export default RefugeSource