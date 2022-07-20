import React from "react"
import { ExplanationTable_contents } from "../../modules/ShipmentConditions";

const FileUrl = window.__.env.REACT_APP_EXTERNAL_ASSETS_PREFIX + '/img/ru-local/shipment-conditions/';

const ExplanationTable = () => {
    return <div className="pt-8 md:px-16 w-full overflow-hidden px-8">
        {
            ExplanationTable_contents.map((item, idx) => {
                return <div key={idx} className="grid md:grid-cols-2 grid-cols-1 md:gap-x-24 gap-y-20">
                    {
                        item.map((val, key) => {
                            return <div className={`flex items-center ${key !== 1 && 'justify-center'} text-center flex-col`} key={key}>
                            {
                                val?.title && <h1 className="text-red-600 md:mb-4">{val.title}</h1>
                            }
                            {
                                val?.span && <p className="md:mb-10">{val.span}</p>
                            }
                            {
                                val?.url && <img src={FileUrl + val.url + '.png'} alt="" />
                            }
                            </div>
                        })
                    }
                    <div></div>
                </div>
            })
        }
    </div>
}

export default ExplanationTable