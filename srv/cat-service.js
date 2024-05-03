import cds from '@sap/cds'

export default function () {

  this.after('each', 'Books', book => {
    if (book.stock > 111) {
      book.title += ` -- 11% discount!`
    }
  })
}