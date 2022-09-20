import React, { useMemo } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import {
    formatMoney,
    formatDate,
    formatJPDate,
    formatJPTime
} from '@/utils/utils';
import { FormattedMessage } from 'react-intl-phraseapp';
import { DivWrapper } from './style';
import { jpSetAddressFields } from '@/utils/constant';

const COUNTRY = window.__.env.REACT_APP_COUNTRY;

interface ListType {
    fieldKey: string;
    value: any;
}

interface Props {
    configStore?: any;
    data: any;
    nameCls?: string;
    pickupNameCls?: string;
}

/**
 * 地址信息预览
 * 1. pick up point时情况
 * 2. 俄罗斯单独处理，因为要显示运费
 * 3. 其他情况: city, region, state, county, country, postCode根据potal配置，排序及显示
 */
const AddressPreview = ({
    configStore,
    data,
    nameCls,
    pickupNameCls
}: Props) => {
    const {
        localAddressForm: { settings, fieldKeyEnableStatus }
    } = configStore;

    console.log({settings})
    console.log({data})

    const {
        receiveType,
        pickupName,
        pickupPriceVisible = true,
        pickupPrice,
        workTime,
        minDeliveryTime,
        maxDeliveryTime,

        calculation,
        deliveryDate,
        timeSlot,
        newDeliveryDate,

        name,
        phone,
        countryName,
        address1,
        address2,
        city,
        area,
        province,
        county,
        postCode,
        rfc,
        buyerRemark,
        consigneeName,
        lastName,
        firstName,
        firstNameKatakana,
        lastNameKatakana,
        consigneeNumber,
        showDeliveryDateAndTimeSlot = true
    } = data;

    /**
     * 根据接口字段设置，进行排序/过滤，然后显示到页面
     * @param {*} list 需要排序的列表
     * @returns 排序后的列表
     */
    const handleSortAndFilter = (list: ListType[]) => {
        const ret = list
            .sort((a, b) => {
                const targetA = settings.find(
                    (ele: ListType) => ele.fieldKey === a.fieldKey
                );
                const targetB = settings.find(
                    (ele: ListType) => ele.fieldKey === b.fieldKey
                );
                return targetA?.sequence - targetB?.sequence;
            })
            .filter(
                (ele: ListType) =>
                    !ele.fieldKey || (fieldKeyEnableStatus[ele.fieldKey] && ele.value)
            );
        return ret;
    };

    const arrangedList = useMemo(() => {
        const tmpList: ListType[] = [
            {
                fieldKey: 'postCode',
                value: postCode
            },
            {
                fieldKey: 'city',
                value: city
            },
            {
                fieldKey: 'region',
                value: area
            },
            {
                fieldKey: 'state',
                value: province
            },
            // {
            //     fieldKey: 'county',
            //     value: county
            // },
            // { fieldKey: 'country', value: countryName }
        ];
        return handleSortAndFilter(tmpList);
    }, [city, area, province, county, postCode, countryName]);

    return (
        <DivWrapper>
            <div className='flex'>
                <div>
                    <span className="iconfont iconposition pr-1"></span>
                    <span className={cn(nameCls)}>{name}</span>
                </div>
                <div className='px-2'>-</div>
                <div className='flex-1'>
                    {address1 && (<p>{address1}</p>)}
                    {fieldKeyEnableStatus['address2'] && address2 && (
                        <p>{address2}</p>
                    )}
                    {arrangedList.length && (
                        <p
                            className={cn(
                                `preview_${arrangedList.map((t) => t.fieldKey).join('|')}`
                            )}
                        >
                            {arrangedList.map((t) => t.value).join(', ')}
                        </p>
                    )}
                    {phone && (<p>{phone}</p>)}
                    {/* {rfc && (<p>{rfc}</p>)}
                    {buyerRemark && (<p>{buyerRemark}</p>)} */}
                </div>
            </div>


        </DivWrapper>
    );
};

export default inject('configStore')(observer(AddressPreview));
