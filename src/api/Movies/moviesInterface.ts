export class IMovies {
    name: string;
    opening_crawls: string;
    comments_count?: number;
    release_date: Date;
    characters: Array<string>;
    // comments: Array<Comments>;
}

export enum order {
    ASC="asc",
    DESC="desc"
}

export enum sortType {
    NAME="name",
    GENDER="gender",
    HEIGHT="height"
}