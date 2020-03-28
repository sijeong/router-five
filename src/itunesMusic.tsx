import React from 'react';
import { AsyncResolver } from 'reenhance-components';

interface Album {
  artistName: string;
  collectionName: string;
  collectionViewUrl: string;
  artworkUrl100: string;
  artistId: string;
  collectionId: string;
}

interface AlbumResponse {
  resultCount: number;
  results: Album[];
}

interface ErrorResponse {
  error: string;
}

interface AsyncArgs {
  query: string;
}

const queryToUrl = (query: string) =>
  `https://itunes.apple.com/search?term=${'spring'}&entity=album&limit=3`;

const asyncFetch = ({ query }: AsyncArgs) =>
  fetch(queryToUrl(query))
    .then(res => res.json())
    .catch(err => ({ error: err.toString() }));

const itemRenderer = (item: Album) => (
  <li key={item.artistId + item.collectionId}>
    <a href={item.collectionViewUrl} target="_blank">
      <img src={item.artworkUrl100} />
      <div>{item.collectionName}</div>
      <div>{item.artistName}</div>
    </a>
  </li>
);

const AlbumsAsyncResolver = AsyncResolver<
  AlbumResponse | ErrorResponse,
  AsyncArgs
>('query', { resultCount: 0, results: [] });

export const Albums = ({ query }: AsyncArgs) => {
  return (
    <AlbumsAsyncResolver query={query} subject={asyncFetch}>
      {(props: AlbumResponse | ErrorResponse) => {
        // console.log(props);
        return (
          <div>
            {(props as AlbumResponse) ? (
              (props as AlbumResponse).results.map(itemRenderer)
            ) : (
              //   <p>{(props as ErrorResponse).error}</p>

              <ul>
                <p>{typeof props}</p>
              </ul>
            )}
          </div>
        );
      }}
    </AlbumsAsyncResolver>
  );
};
