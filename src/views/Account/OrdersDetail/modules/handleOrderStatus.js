//处理正常普通订单流程
export function handleOrderStatusMap(orderStatusMap) {
  const normalProgressList = [1000, 2000, 4000, 5000].map((el) => {
    let flowStateIds = [orderStatusMap[el]?.flowStateId];
    // 组装所有归属于此状态的订单状态
    switch (el) {
      // case 1000:
      //   flowStateIds.push(orderStatusMap[2000]?.flowStateId);
      //   break;
      case 2000:
        flowStateIds.push(orderStatusMap[3000]?.flowStateId);
        break;
      // case 3000:
      //   flowStateIds.push(orderStatusMap[3010]?.flowStateId);
      //   break;
      case 4000:
        flowStateIds.push(orderStatusMap[3010]?.flowStateId);
        // flowStateIds.push(orderStatusMap[5000]?.flowStateId);
        break;
      case 5000:
        flowStateIds.push(orderStatusMap[4010]?.flowStateId);
        flowStateIds.push(orderStatusMap[9000]?.flowStateId);
        break;
    }
    return Object.assign(orderStatusMap[el], {
      flowStateIds: [...flowStateIds],
      showInFlow: true
    });
  });
  return normalProgressList;
}

//处理Felin订单流程
export function handleFelinOrderStatusMap(orderStatusMap) {
  const FelinProgressList = [1000, 2000, 5000].map((el) => {
    let flowStateIds = [orderStatusMap[el]?.flowStateId];
    let flowStateDesc = orderStatusMap[el]?.flowStateDesc;
    // 组装所有归属于此状态的订单状态
    switch (el) {
      case 1000:
        // flowStateDesc = 'Appointment confirmed';
        //   flowStateIds.push(orderStatusMap[2000]?.flowStateId);
        break;
      case 2000:
        // flowStateDesc = 'Order paid';
        flowStateIds.push(orderStatusMap[3000]?.flowStateId);
        break;
      // case 3000:
      //   flowStateIds.push(orderStatusMap[3010]?.flowStateId);
      //   break;
      case 5000:
        // flowStateDesc = 'Check in';
        flowStateIds.push(orderStatusMap[4010]?.flowStateId);
        flowStateIds.push(orderStatusMap[9000]?.flowStateId);
        break;
    }
    return Object.assign(orderStatusMap[el], {
      flowStateDesc: flowStateDesc,
      flowStateIds: [...flowStateIds],
      showInFlow: true
    });
  });
  console.log(FelinProgressList);
  return FelinProgressList;
}

// 处理取消订单流程
export function handleCancelOrderStatusMap(orderStatusMap) {
  const cancelProgressList = [1000, 9999].map((el) => {
    let flowStateIds2 = [orderStatusMap[el]?.flowStateId];
    // 组装所有归属于此状态的订单状态
    switch (el) {
      case 1000:
        flowStateIds2.push(
          orderStatusMap[2000]?.flowStateId,
          orderStatusMap[3000]?.flowStateId,
          orderStatusMap[4000]?.flowStateId,
          orderStatusMap[4010]?.flowStateId,
          orderStatusMap[5000]?.flowStateId
        );
        break;
      case 9999:
        flowStateIds2.push(
          orderStatusMap[9000]?.flowStateId,
          orderStatusMap[9999]?.flowStateId
        );
        break;
    }
    return Object.assign(orderStatusMap[el], {
      flowStateIds: [...flowStateIds2],
      showInFlow: true
    });
  });
  return cancelProgressList;
}
