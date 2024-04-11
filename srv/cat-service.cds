using {sap.capire.bookshop as my} from '../db/schema';

service CatalogeService @(path: '/browse') {
  @readonly
  entity Books as
    select from my.Books {
      *,
      author.name as author
    }
    excluding {
      createBy,
      modifiedBy
    };

  @requires: 'authenticated-user'
  action submitOrder(book : Books:ID, quantity : Integer);
}