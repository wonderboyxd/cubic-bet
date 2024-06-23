import {create} from 'zustand';
import { createUserSlice, UserSlice } from '@/entities/user/model/userSlice';

type StoreState = UserSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
}));
