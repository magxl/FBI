import { createPinia, defineStore } from 'pinia';
export const pinia = createPinia();

import launch from './store/launch.js';
import contract from './store/contract.js';
import dingding from './store/dingding.js';

export const store = {
  launch: defineStore('launch', launch),
  contract: defineStore('contract', contract),
  dingding: defineStore('dingding', dingding),
};
