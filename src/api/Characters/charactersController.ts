import { CharactersService } from './charactersService';
import { BaseController } from '../baseController';
import { order, sortType } from '../Movies/moviesInterface';
import { numericSort, plainSort, queryFilter } from '../../utils/helpers';

/**
 * Character controller
 *
 * @export
 * @class CharacterController
 */
export class CharactersController extends BaseController {
    private charactersService = new CharactersService();

    public getStarWarsCharacters = async (query) => {
        
        const allStarWarsCharacters = await this.charactersService.getCharacters();

        if(allStarWarsCharacters) {

            const sortParam = query.sortBy;
    
            if(sortParam) {
    
                this.sortHandler(sortParam, allStarWarsCharacters, query.orderBy);
    
            }     
    
            if(query[sortType.GENDER]) {
                
                const filteredCharacters = queryFilter(allStarWarsCharacters.results, sortType.GENDER, query[sortType.GENDER]);
    
                return this.sendResponse({data: filteredCharacters});
    
            }
    
            return this.sendResponse({data: allStarWarsCharacters.results});
        }

        return;
    }

    private sortHandler = (sortParam: string, allStarWarsCharacters, orderBy?: order) => {
        switch (sortParam) {
            case sortType.NAME:
                
                plainSort(allStarWarsCharacters.results, sortType.NAME, orderBy);
                break;

            case sortType.GENDER:
                
                plainSort(allStarWarsCharacters.results, sortType.GENDER, orderBy);
                break;

            case sortType.HEIGHT:
                
                numericSort(allStarWarsCharacters.results, sortType.HEIGHT, orderBy);
                break;

            default:
                break;
        }
    }

}
