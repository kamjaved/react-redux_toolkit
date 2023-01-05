import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementCount,
  decrementCount,
  reset,
  incrementByValue
} from '../../redux/slices/counterSlice';

const Counter = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const count = useSelector(state => state.count.count);
  return (
    <>
      <div>
        <p>Count: {count} </p>
        <button onClick={() => dispatch(incrementCount())}>Increment+</button>
        <button onClick={() => dispatch(decrementCount())}>Decrement -</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
      <div>
        <input value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={() => dispatch(incrementByValue(Number(value)))}>
          Increment By Value
        </button>
      </div>
    </>
  );
};

export default Counter;
