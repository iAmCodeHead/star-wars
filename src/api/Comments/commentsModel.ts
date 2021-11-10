import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class Comments extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({nullable: true, type: 'integer'})
    public movieId: number;

    @Column({nullable: true, type: 'varchar', length: 500})
    public body: string;

    @Column({nullable: true, default: "Anonymous"})
    public commentBy: string;

    @Column({nullable: true})
    public publicIp: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
