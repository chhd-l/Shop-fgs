import React from "react"
import { ShipmentConditions_contents } from "../../modules/ShipmentConditions";

const ShipmentConditionsReturnList = () => {
    const returnList = (type: string, Subvalue: any) => {
      switch (type) {
        case 'span':
          return <p className="mb-16">{Subvalue}</p>;
  
        case 'list':
          return (
            <div className="border border-solid relative text-center">
              {Subvalue.map((strs: string[], idx: number) => {
                if (idx === 0)
                  return (
                    <div
                      className="hover:bg-cs-gray-f6 h-12 bg-white flex-1 border-t border-solid flex absolute left-1/2 w-1/2"
                      style={{
                        transform: 'translateX(-50%)',
                        top: '3rem'
                      }}
                    >
                      {strs.map((str: string, index: number) => (
                        <span
                          key={index}
                          className="flex-1 flex items-center justify-center"
                        >
                          {str}
                        </span>
                      ))}
                    </div>
                  );
                if (idx === 1)
                  return (
                    <div className="flex h-24 hover:bg-cs-gray-f6">
                      {strs.map((str: string, index: number) => {
                        if (index === 1)
                          return (
                            <div key={index} className="w-1/2 flex">
                              <span className="h-1/2 flex items-center justify-center w-full">
                                {str}
                              </span>
                            </div>
                          );
                        return (
                          <div
                            key={index}
                            className="flex-1 flex items-center justify-center"
                          >
                            {str}
                          </div>
                        );
                      })}
                    </div>
                  );
                return (
                  <div className="flex hover:bg-cs-gray-f6 h-12 border-t border-solid">
                    {strs.map((str: string, index: number) => (
                      <div
                        key={index}
                        className="flex-1 flex items-center justify-center"
                      >
                        {str}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          );
  
        default:
          break;
      }
    };
    return <div>{ShipmentConditions_contents.map((item:any, idx: any) => (
        <div key={idx}>
          <h1 className="my-6 text-red-500 font-light">{item.title}</h1>
          {returnList(item.type, item.Subvalue)}
        </div>
      ))}</div>
}

export default ShipmentConditionsReturnList