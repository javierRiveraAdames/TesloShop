import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })

    title: string;
    @Column('numeric', { default: 0 })
    price: number

    @Column('text', { nullable: true })
    description: string

    @Column({ type: 'text' })
    slug: string

    @Column({ type: 'numeric' })
    stock: number

    @Column('text', {
        array: true
    })
    sizes: string[];

    @Column({ type: 'text', nullable: true })
    gender: string

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
        }
        this.slug= this.slug.toLowerCase().replace(' ','_').replace("'",'')
    }
}