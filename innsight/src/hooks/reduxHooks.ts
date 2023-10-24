import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "~/types/redux";


export const useReduxSelector:TypedUseSelectorHook<RootState> =  useSelector;

export const useReduxDispatch:()=>AppDispatch = useDispatch;
