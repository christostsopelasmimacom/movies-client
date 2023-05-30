import styles from './index.module.css';
import React, { useCallback, useEffect, useState } from 'react';
import {MoviesList} from "../components/MoviesList/MoviesList";
import {ServerDown} from "../components/ServerDown/ServerDown";

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
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch('http://localhost:3333');
        if (response.ok) {
          fetch(`http://localhost:3333/search?q=${search}`)
            .then((resp) => resp.json())
            .then((data) => setMovie(data));
          setServerError(false);
          return;
        } else {
          setServerError(true);
          console.log('Server is not responding');
        }
      } catch (error) {
        setServerError(true);
        console.log('Error occurred while connecting to the server:', error);
      }
    };

    checkServerStatus();

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
      {serverError ? <ServerDown /> : <MoviesList movies={movie} />}
    </div>
  );
};

export async function getStaticProps(context: any) {
  let movies = [];
  if (context?.query?.q) {
    try {
      const res = await fetch(
          `http://localhost:3333/search?q=${context.query.q}`
      );
      movies = await res.json();
    } catch(error) {
      alert('server is down');
    }

  }

  return {
    props: {
      q: context?.query?.q ?? '',
      movies,
    },
  };
}

export default Index;
