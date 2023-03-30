import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { AbstractEntity } from "@/app/abstracts"
import { Book } from "@/modules/book/book.entity"
import { User } from "@/modules/user/user.entity"

@Entity("favorites")
export class Favorite extends AbstractEntity {
  @Column()
  bookId: number

  @Column()
  userId: number

  @ManyToOne(() => Book, (book) => book.favorites)
  @JoinColumn({ name: "book_id" })
  book: Book

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: "user_id" })
  user: User
}
