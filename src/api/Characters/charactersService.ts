import axios from 'axios';

export class CharactersService {

    public getCharacters = async () => {

        try {
         
            let movieCharacters = await axios.get('https://swapi.dev/api/people/');
        
            return movieCharacters.data || [];
    
        } catch (error) {

            // if(error.response.status == 404) return;
            return;
            
        }
         
    }
}
