import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { AbstractEntity } from "@/app/abstracts"
import { Category } from "@/modules/category/category.entity"
import { Favorite } from "@/modules/favorite/favorite.entity"

@Entity("books")
export class Book extends AbstractEntity {
  @Column()
  name: string

  @Column()
  description: string

  @Column()
  author: string

  @Column()
  year: number

  @Column()
  categoryId: number

  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: "category_id" })
  category: Category

  @OneToMany(() => Favorite, (favorite) => favorite.book)
  favorites: Favorite[]
}
