import { IComment } from "./commentsInterface";
import { Comments } from "./commentsModel"

export class CommentsService {

    public create = async (comment): Promise<IComment[]> => {
        return await Comments.save(comment);
    }

    public getAllCommentsPerMovie = async (movieId: number) => {
        return await Comments.find({where: {movieId: movieId}, order: {createdAt: "DESC"}});
    }

    public getComments = async (movieId: number): Promise<Comments[]> => {
        return await Comments.find({movieId: movieId});
    }
}
