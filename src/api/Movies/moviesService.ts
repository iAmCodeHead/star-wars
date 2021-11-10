import axios from 'axios';
import { IMovies } from './moviesInterface';

export class MoviesService {

    public getAllStarWarsMovies = async (): Promise<IMovies[]> => {
        
        try {
            
            let allMovies = await axios.get('https://swapi.dev/api/films');

            return allMovies.data.results || [];   

        } catch (error) {

            return;

        }

    }

    public getAStarWarsMovie = async (id: number): Promise<IMovies> => {

        try {
         
            let aMovie = await axios.get(`https://swapi.dev/api/films/${id}`);
            
            return aMovie.data || {};   

        } catch (error) {

            return;
            
        }
        
    }

}