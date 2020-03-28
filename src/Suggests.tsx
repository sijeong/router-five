import {
  useObservableCallback,
  useObservablePropsCallback,
  pluckFirst,
  useObservable,
  useObservableState
} from 'observable-hooks';
import React from 'react';
import {
  filter,
  distinctUntilChanged,
  switchMap,
  tap,
  withLatestFrom,
  map,
  startWith,
  catchError
} from 'rxjs/operators';

import { Observable, forkJoin, timer, of } from 'rxjs';

export interface SuggestsItem {
  href: string;
  title: string;
  content: string;
}

export type SuggestsList = SuggestsItem[];

export type SuggestsFetcher = (text: string) => Observable<SuggestsList>;

export interface SuggestsProps {
  text: string;
  fetchFunc: SuggestsFetcher;
}

const StateDefault = () => null;
const StateLoading = () => <div>Searching...</div>;
const StateFinish = (X: SuggestsList) => (
  <ul>
    {X.map(item => (
      <li className="box" key={item.href}>
        <strong>
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        </strong>
        <p>{item.content}</p>
      </li>
    ))}
  </ul>
);

const StateError = () => <div className="">Failed fetching...</div>;

export const Suggests = (props: SuggestsProps) => {
  const fetchFunc$ = useObservable(pluckFirst, [props.fetchFunc]);
  return useObservableState(
    useObservable(
      inputs$ =>
        inputs$.pipe(
          // @ts-ignore
          filter(([text]) => text.length > 1),
          distinctUntilChanged(),
          switchMap(([text]) =>
            forkJoin(
              timer(1000),
              timer(700).pipe(
                tap(() => console.log(`>>> really start searching...`)),
                withLatestFrom(fetchFunc$),
                switchMap(([, fetchFunc]) => fetchFunc(text))
              )
            ).pipe(
              map(([, suggests]) => <StateFinish {...suggests} />),
              startWith(<StateLoading />)
            )
          ),
          catchError(() => of(<StateError />)),
          startWith(<StateDefault />)
        ),
      [props.text]
    )
  );
};
