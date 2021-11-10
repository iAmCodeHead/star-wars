import { IMovies, order, sortType } from "../api/Movies/moviesInterface";

export const queryFilter = (dataSet, filterParam: sortType, value: string) => {
    
    if(Array.isArray(dataSet)){
        
        const results = dataSet.filter((data) => {
            return data[filterParam].toLowerCase() == value.toLowerCase();
        });

        const total_height_in_cm = adder(results, sortType.HEIGHT);

        const objectData = {
            metadata: {
                total_count: results.length,
                total_height_in_cm,
                total_height_in_ft: `${total_height_in_cm * 0.032808} ft`,
                total_height_in_inches: `${total_height_in_cm * 0.39370} inches`
            },
            results
        };

        return objectData;

    }

    return;

}

export const filterMovies = (movies: any) => {
    
    if(movies) {

        let filteredMovies: Array<IMovies> = [];

        if(Array.isArray(movies) && movies.length > 0) {
            movies.forEach(movie => {
                const x: IMovies = {
                    name: movie.title,
                    opening_crawls: movie.opening_crawl,
                    release_date: movie.release_date,
                    characters: movie.characters,
                    comments_count: movie.comments_count 
                };
                filteredMovies.push(x);
            });
        
            return filteredMovies;
        }
    
        return {
            name: movies.title,
            opening_crawls: movies.opening_crawl,
            release_date: movies.release_date,
            characters: movies.characters,
            comments_count: movies.comments_count 
        };
    }

}

export const plainSort = (data, sortBy: sortType, orderBy?: order) => {

    if(Array.isArray(data)){

        const x = data.sort((a,b) => {

            if(a[sortBy] < b[sortBy]) { return -1; }

            if(a[sortBy] > b[sortBy]) { return 1; }

            return 0;
            
        });

        if(orderBy && orderBy == order.DESC) {

            return x.reverse();    

        }

        return x;

    }


    return;
}

export const numericSort = (data, sortBy, order = 'asc') => {

    switch (order.toLowerCase()) {

      case 'desc':
        
        if (sortBy.toLowerCase().includes('date')) {

          return sortInDescendingOrder(data, sortBy, true);

        }

        return sortInDescendingOrder(data, sortBy, false);
        
      default:
      
        if (sortBy.toLowerCase().includes('date')) {
            
          return sortInAscendingOrder(data, sortBy, true);

        }

        return sortInAscendingOrder(data, sortBy, false);
    }
  }
  
export const sortInAscendingOrder = (data, sortBy, hasDate = false) => {

    if (hasDate) {

      return data.sort((a, b) => {

        return new Date(a[sortBy]).valueOf() - new Date(b[sortBy]).valueOf();

      });

    } else {

      return data.sort((a, b) => a[sortBy].valueOf() - b[sortBy].valueOf());

    }

  }
  
export const sortInDescendingOrder = (data, sortBy, hasDate = false) => {
    
    if (hasDate) {

      return data.sort((a, b) => new Date(b[sortBy]).valueOf() - new Date(a[sortBy]).valueOf());

    } else {

      return data.sort((a, b) => b[sortBy].valueOf() - a[sortBy].valueOf());

    }

}

const adder = (items, prop) => {

    return items.reduce((a, b) => {

        return parseFloat(a) + parseFloat(b[prop]);

    }, 0);
}