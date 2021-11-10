import { BaseController } from "../baseController";
import { CommentsService } from "./commentsService";

export class CommentsController extends BaseController {

    private commentService = new CommentsService();

    public makeComment = async (req: Request, movieId: number) => {
        
        req.body["publicIp"] = req.headers['x-forwarded-for'] || req["connection"]["remoteAddress"]
        req.body["movieId"] = movieId;

        const newComment = await this.commentService.create(req.body);
        return this.sendResponse({data: newComment});
    }

    public getAllCommentsByMovie = async (movieId) => {
        const comments = await this.commentService.getAllCommentsPerMovie(movieId);
        console.log(comments);
        
        return this.sendResponse({ data: comments });
    }

}