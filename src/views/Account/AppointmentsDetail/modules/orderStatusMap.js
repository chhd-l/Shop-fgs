// Created / To be delivered / Shipped / Delivered
// 1000 /    3000 /   4000 /   9000
// 1000-2000 / 3000-3010 / 4000-4010-5000 / 9000

// Created / Cancelled
// 9000-9999
export default {
  1000: {
    flowStateId: 'INIT',
    flowStateDesc: 'Created'
  },
  2000: {
    flowStateId: 'PENDING_REVIEW',
    flowStateDesc: 'Processing'
  },
  3000: {
    flowStateId: 'TO_BE_DELIVERED',
    flowStateDesc: 'Processing'
  },
  3010: {
    flowStateId: 'PARTIALLY_SHIPPED',
    flowStateDesc: 'Partially Shipped'
  },
  4000: {
    flowStateId: 'SHIPPED',
    flowStateDesc: 'Shipped'
  },
  4010: {
    flowStateId: 'PARTIALLY_DELIVERED',
    flowStateDesc: 'Partially Delivered'
  },
  5000: {
    flowStateId: 'DELIVERED',
    flowStateDesc: 'Delivered'
  },
  8000: {
    flowStateId: 'REJECTED',
    flowStateDesc: 'Rejected'
  },
  9000: {
    flowStateId: 'COMPLETED',
    flowStateDesc: 'Completed'
  },
  9999: {
    flowStateId: 'VOID',
    flowStateDesc: 'Cancelled'
  }
};
