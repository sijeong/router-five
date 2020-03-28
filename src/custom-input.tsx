import {
  useObservableCallback,
  pluckCurrentTargetValue,
  useSubscription
} from 'observable-hooks';
import React, { FormEvent } from 'react';

export interface InputProps {
  text: string;
  onChange: (text: string) => any;
}

export const CustomInput = (props: InputProps) => {
  const [onChange, textChange$] = useObservableCallback<
    string,
    FormEvent<HTMLInputElement>
  >(pluckCurrentTargetValue);

  useSubscription(textChange$, props.onChange);

  return (
    <input
      className="input"
      type="input"
      placeholder="Search here"
      value={props.text}
      onChange={onChange}
    />
  );
};
