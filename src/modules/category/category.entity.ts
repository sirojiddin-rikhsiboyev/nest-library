import { Column, Entity, OneToMany } from "typeorm"
import { AbstractEntity } from "@/app/abstracts"
import { Book } from "@/modules/book"

@Entity("categories")
export class Category extends AbstractEntity {
  @Column()
  name: string

  @Column()
  description: string

  @OneToMany(() => Book, (book) => book.category, { cascade: true })
  books: Book[]
}
