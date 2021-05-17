export type SubscriptionType = 'club' | 'autoship'

export enum SubScriptionStatusNumber {
  "one-off" = 0,
  autoship,
  club
}

export declare interface ObjectConstructor {
  assign(...objects: Object[]): Object;
}