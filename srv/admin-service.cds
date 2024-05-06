using { sap.capire.bookshop as my } from '../db/schema';

service AdminService @(require: 'authenticated-user') {
  entity Books as projection on my.Books;
  entity Authors as projection on my.Authors;
  entity Genres as projection on my.Genres;
  entity Orders @insertonly as projection on my.Orders;
}