import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { Rootstate, AppDispatch } from 'app/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;