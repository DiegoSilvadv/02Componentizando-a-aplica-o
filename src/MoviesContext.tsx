import { ReactNode, createContext, useEffect, useState, useContext } from "react";
import { api } from './services/api';

// Tipagem
interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface MoviesProviderProps {
    children: ReactNode;
}

interface MovieProps {
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}

interface MoviesContextData {
    genres: GenreResponseProps[];
    selectedGenreId: number;
    selectedGenre: GenreResponseProps;
    handleClickButton: (id: number) => void;
    movies: MovieProps[];
}

export const MoviesContext = createContext({} as MoviesContextData)

export function MoviesProvider({ children }: MoviesProviderProps) {

    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    return (
        <MoviesContext.Provider
            value={{
                selectedGenreId,
                genres,
                movies,
                selectedGenre,
                handleClickButton
            }}>
            {children}
        </MoviesContext.Provider>
    )
}

export function useMovies() {
    const context = useContext(MoviesContext);
    return context;
}