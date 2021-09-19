import { Button } from './Button';
import { api } from '../services/api';

import { useMovies } from '../MoviesContext';



export function SideBar() {
  // Complete aqui
  const {genres, handleClickButton, selectedGenreId } = useMovies();

  return (
    < nav className="sidebar" >
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav >
  )


}
