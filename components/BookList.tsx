import BookCard from "./BookCard"

type Props = {
  title: string
  books: Book[]
  containerClassName?: string
}

const BookList = ({ title, books, containerClassName }: Props) => {
  return (
    <section className={containerClassName}>
      <h2 className="text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map(book => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  )
}
export default BookList
