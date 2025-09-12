import React, { createRef, forwardRef, memo, useImperativeHandle } from 'react';
import isEqual from 'react-fast-compare';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';

import { RootState, store } from '@src/redux/store'; // Import trực tiếp `store`

type ActionBase = Action<string>;

const RXStoreComponent = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  useImperativeHandle(
    ref,
    () => ({
      dispatch: (action: ActionBase) => {
        dispatch(action);
      },
      getState: <K extends keyof RootState>(key: K) => {
        // Truy cập trực tiếp `store.getState()` để lấy `state`
        return store.getState()[key];
      },
    }),
    [dispatch],
  );

  return null;
});

type RXStoreType = {
  dispatch: (action: ActionBase) => void;
  getState: <K extends keyof RootState>(selector: K) => RootState[K];
};

const storeRef = createRef<RXStoreType>();

export const RXStore = memo(() => <RXStoreComponent ref={storeRef} />, isEqual);

export const dispatch = (action: ActionBase) => {
  if (storeRef.current) {
    storeRef.current.dispatch(action);
  } else {
    console.warn('RXStore is not initialized yet.');
  }
};

export function getState<K extends keyof RootState>(selector: K): RootState[K] {
  if (storeRef.current) {
    return storeRef.current.getState(selector);
  } else {
    console.warn('RXStore is not initialized yet.');
    return {} as RootState[K];
  }
}
