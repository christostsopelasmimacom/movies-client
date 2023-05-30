import styles from './index.module.css';
import React, { useCallback, useEffect, useState } from 'react';
import {MoviesList} from "../components/MoviesList/MoviesList";

export interface Movie {
  title: string;
  year: number;
  cast: string[];
  genres: string[];
  href?: string;
  extract?: string;
  thumbnail?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
}
export const Index = ({
  q,
  movies: initialMovies,
}: {
  q: string;
  movies: Movie[];
}) => {
  const [search, setSearch] = useState('');
  const [movie, setMovie] = useState<Movie[]>(initialMovies);

  useEffect(() => {
    console.log('hey hey');
    fetch(`http://localhost:3333/search?q=${escape(search)}`)
      .then((resp) => resp.json())
      .then((data) => setMovie(data));
  }, [search]);

  const onSetSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value);
    },
    []
  );

  return (
    <div className={styles.page}>
      <input
        className={styles.search}
        value={search}
        onChange={onSetSearch}
        placeholder="Search movie..."
      />
      <MoviesList movies={movie} />
    </div>
  );
};

export async function getStaticProps(context: any) {
  let movies = [];
  if (context?.query?.q) {
    const res = await fetch(
      `http://localhost:3333/search?q=${escape(context.query.q)}`
    );
    movies = await res.json();
  }

  return {
    props: {
      q: context?.query?.q ?? '',
      movies,
    },
  };
}

export default Index;
