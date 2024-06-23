import { createStore, StateCreator } from 'zustand';

export type UserSlice = {
  isLogin: boolean;
  userLogin: string;
  userBalance: number;
  setIsLogin: (value: boolean) => void;
  setUserLogin: (value: string) => void;
  setUserBalance: (value: number) => void;
};



export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  isLogin: false,
  setIsLogin: (value: boolean) => set(() => ({ isLogin: value })),
  userLogin: '',
  userBalance: 100,
  setUserLogin: (value: string) => set(() => ({ userLogin: value })),
  setUserBalance: (value: number) => set(() => ({ userBalance: value }))
});
