
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductImages {
    @PrimaryColumn()
    id: string

    @Column({ type: 'text' })
    images: string
    @OneToMany(
        () => Product,
        (product) => product.images,
    )
    product: Product

}