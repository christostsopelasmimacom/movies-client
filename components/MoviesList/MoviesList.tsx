import React from 'react';
import styles from './MoviesList.module.css';
import {Movie} from "../../pages";

interface MovieListProps {
  movies: Movie[];
}

const MovieCard = ({ movie }: { movie: Movie }) => (
  <div className={styles['movie-card']}>
    {movie.thumbnail && (
      <img
        className={styles['movie-thumbnail']}
        src={movie.thumbnail}
        alt={movie.title}
        width={movie.thumbnail_width}
        height={movie.thumbnail_height}
      />
    )}
    <div className={styles['movie-details']}>
      <h3 className={styles['movie-title']}>
        {movie.title} ({movie.year})
      </h3>
      <p className={styles['movie-cast']}>Cast: {movie.cast.join(', ')}</p>
      <div className={styles['movie-genres']}>
        {movie.genres.map((genre, key) => (
          <div key={key} className={styles['genre-tag']}>
            {genre}
          </div>
        ))}
      </div>
      {movie.extract && (
        <p className={styles['movie-extract']}>{movie.extract}</p>
      )}
      {movie.href && (
        <a className={styles['movie-link']} href={movie.href}>
          More Info
        </a>
      )}
    </div>
  </div>
);

export const MoviesList = ({ movies }: MovieListProps) => (
  <div className={styles['movie-list']}>
    {movies.map((movie, index) => (
      <MovieCard movie={movie} key={index} />
    ))}
  </div>
);
