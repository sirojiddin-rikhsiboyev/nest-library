import { Column, Entity, OneToMany } from "typeorm"
import { AbstractEntity } from "@/app/abstracts"
import { Favorite } from "@/modules/favorite/favorite.entity"

@Entity("users")
export class User extends AbstractEntity {
  @Column()
  name: string

  @Column()
  surname: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[]
}
