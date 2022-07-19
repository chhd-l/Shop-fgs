import Footer from "@/components/Footer"
import Header from "@/components/Header"
import React from "react"
import { Link } from 'react-router-dom';
import './index.less'

const specialWorksConditions = () => {
    return <div className="ui-custom-hub text-black specialWorksConditions">
        <Header
          showMiniIcons={true}
          showUserIcon={true}
           />
        <div className="rc-content--fixed-header text-base">
            <div className="p-8">
                <Link className='ml-4 cursor-pointer' to='#'>Информация о компании</Link>
            </div>
            <div className="p-8">
                <div className="max-w-screen-md m-auto">
                    <ol className="pl-8">
                        <li>11</li>
                        <li>11</li>
                        <li>11</li>
                    </ol>
                </div>
            </div>
        </div>
        <Footer />
    </div>
}

export default specialWorksConditions