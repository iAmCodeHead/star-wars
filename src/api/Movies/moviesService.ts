import axios from 'axios';
import { IMovies } from './moviesInterface';

export class MoviesService {

    public getAllStarWarsMovies = async (): Promise<IMovies[]> => {
        
        let allMovies = await axios.get('https://swapi.dev/api/films');

        return allMovies.data.results || [];
        

    }

    public getAStarWarsMovie = async (id: number): Promise<IMovies> => {

        try {
         
            let aMovie = await axios.get(`https://swapi.dev/api/films/${id}`);
            
            return aMovie.data || {};   

        } catch (error) {

            if(error.response.status == 404) return;
            
        }
        
    }

}