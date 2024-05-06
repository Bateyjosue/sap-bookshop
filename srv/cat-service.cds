using {sap.capire.bookshop as my} from '../db/schema';

@impl: 'srv/cat-service.js'

service CatalogeService @(path: '/browse') {
  @readonly
  entity Books as
    select from my.Books {
      *,
      author.name as author,
      // genre.name as genre_name
    
    }
    excluding {
      createBy,
      modifiedBy
    };

  // @readonly
  entity Orders as
    select from my.Orders {
      *
    };

  @requires: 'authenticated-user'
  action submitOrder(book : Books:ID, quantity : Integer);
}