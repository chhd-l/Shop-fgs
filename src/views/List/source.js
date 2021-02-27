import React, {Component,Fragment} from 'react'
import {linkTransform} from "@/api/refuge"
import Loading from '@/components/Loading';

// 这个组件的目的  是为了输入/boxer01 这种短链接 去通过接口获取长链接，再跳转到PLP页面
class RefugeSource extends Component {
    constructor(props){
        super(props)
        this.state = {
          circleLoading: true,
        }
    }
    async UNSAFE_componentWillMount(){
        try{
          const shortLinkSuffix = this.props.location.pathname.split("/")[1]
          const res = await linkTransform({shortLinkSuffix})
          window.location.href = `https://${res.context.longLink}`
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