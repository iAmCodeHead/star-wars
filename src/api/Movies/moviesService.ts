import axios from 'axios';

export class MoviesService {

    public getAllStarWarsMovies = async () => {
        
        try {

            let allMovies = await axios.get('https://swapi.dev/api/films/');

            return allMovies.data.results || [];   

        } catch (error) {

            return;

        }

    }

    public getAStarWarsMovie = async (id: number) => {

        try {
         
            let aMovie = await axios.get(`https://swapi.dev/api/films/${id}`);
            
            return aMovie.data || {};   

        } catch (error) {

            return;
            
        }
        
    }

}