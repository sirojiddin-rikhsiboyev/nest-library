import { Column, Entity } from "typeorm"
import { AbstractEntity } from "@/app/abstracts/abstract.entity"

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
}
