import cds from '@sap/cds'
// import { request } from 'express'

export default async function  () {

  const db = await cds.connect.to('db')
  const { Books } = db.entities
  
  this.on('submitOrder', async req => {
    const { book, quantity } = req.data
    const n = await UPDATE(Books, book)
    .with({ stock: { '-=': quantity } })
    .where({ stock: { '>=': quantity } })
    n > 0 || req.error (409, `${quantity} exceeds stock for book #${book}`)
  })

  this.before('CREATE', 'Orders', async (req) => {
    const order = req.data

    if (!order.amount || order.amount < 1) return req.error(400, 'Order at least 1 book')
    
    const updatedBook = await UPDATE(Books)
    .set({
      stock: {'-=': order.amount}
    })
      .where({
        stock: { '>=': order.amount },
        ID: order.book_ID
      })
    
    if (updatedBook === 0) req.error(409, 'Sold Out, Sorry')
  })
  
  this.after('each', 'Books', book => {
    if (book.stock > 111) {
      book.title += ` -- 11% discount!`
    }
  })
}  

// export default class CatalogService extends cds.ApplicationService { 
//   init() {
//     const { Books } = cds.entities('sap.capire.bookshop')
//     const { ListOfBooks } = this.entities
    
//     this.after('each', ListOfBooks, book => {
//     if (book.stock > 111) book.title += ` -- 11% discount!`
//     })

//     this.on('submitOrder', async req => {
//       let { book:id, quantity } = req.data
//       let book = await SELECT.from (Books, id, b => b.stock)

//       // Validate input data
//       if (!book) return req.error (404, `Book #${id} doesn't exist`)
//       if (quantity < 1) return req.error (400, `quantity has to be 1 or more`)
//       if (quantity > book.stock) return req.error (409, `${quantity} exceeds stock for book #${id}`)

//       // Reduce stock in database and return updated stock value
//       await UPDATE (Books, id) .with ({ stock: book.stock -= quantity })
//       return book
//     })
    
//     return super.init()
//   }

// }