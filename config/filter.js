export default function queryFilter(options={}) {
    return (req, res, next)=>{
        const { q: search, sort_by, genre, price_gte, price_lte, page = 1, limit = 8 } = req.query;

        let query = {};
        let queryOptions = {
            sort: { stock: -1 }, 
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        };
    
        //common search filter
        if (search && options.enableSearch) {
            query.name = { $regex: search, $options: 'i' } 
        }

         // Book filter
        if (options.enableBookFilters) {
            if (genre) {
            query.genre = genre;
            }
    
            if (price_gte && price_lte) {
            query.price = {
                $gte: parseInt(price_gte),
                $lte: parseInt(price_lte)
            };
            }
        }
        
        //book sort
            if (sort_by === 'featured') {
              queryOptions.sort = { [sort_by]: -1 };
            } else if (sort_by === 'bestseller') {
              queryOptions.sort = { sold: -1 };
            }else if (sort_by) {
            const [sortBy, sortValue] = sort_by.split('-');
            const sortOrder = sortValue === 'ascending' ? 1 : -1;
            queryOptions.sort = { [sortBy]: sortOrder };
            console.log(queryOptions)
          }
        
    
        req.queryFilter = query;
        req.queryOptions = queryOptions;
    
        next();
       
    }
 
}
