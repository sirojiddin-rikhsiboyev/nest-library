import { Column, Entity } from "typeorm"
import { AbstractEntity } from "@/app/abstracts"

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
}
