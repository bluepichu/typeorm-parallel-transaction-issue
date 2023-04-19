import { Entity, PrimaryColumn } from "typeorm"

@Entity()
export class Pokemon {
    @PrimaryColumn()
    name: string
}
