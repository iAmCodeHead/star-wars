import { MoviesService } from "./moviesService";
import { BaseController } from "../baseController";
import { filterMovies, numericSort } from "../../utils/helpers";
import { CommentsService } from "../Comments";
import { order } from "./moviesInterface";

export class MoviesController extends BaseController {
    private moviesService = new MoviesService();
    private commentsService = new CommentsService();

    public getAllStarWarsMovies = async () => {
        
        let allMovies = await this.moviesService.getAllStarWarsMovies();

        let filteredMovies = [];

        for (let i = 0; i < allMovies.length; i++) {
            
            await this.commentsService.getComments(i + 1).then((comment) => {

                console.log(comment.length);
                
                allMovies[i]["comments_count"] = comment.length;
                
                const x = filterMovies(allMovies[i]);

                filteredMovies.push(x);

            });
            
        }

        numericSort(filteredMovies, "release_date", order.DESC);

        return this.sendResponse({data: filteredMovies});
    }

    public getAStarWarsMovie = async (id: number) => {
        const aMovie = await this.moviesService.getAStarWarsMovie(id);

        if(!aMovie) return this.sendResponse({
            data: aMovie,
            message: "NOT FOUND",
            statusCode: 404
        });

        const filteredMovie = filterMovies(aMovie);
                
        return this.sendResponse({data: filteredMovie});
    }

}