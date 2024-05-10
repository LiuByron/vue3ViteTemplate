import { createPinia } from 'pinia';

const store = createPinia();

export default store;

export * from './mdules/counter';

// import { useUserStore } from "./modules/user";

// export default function useStore() {
//   return {
//     user: useUserStore(),
//   }
// }