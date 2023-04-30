import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Debt from "../debt/Debt";

@Entity({ name: "groups" })
class Group {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "name", type: "varchar", nullable: false })
  public name: string;

  @Column({ name: "description", type: "text", nullable: true })
  public description: string;

  @OneToMany(() => Debt, (debt) => debt.id, { nullable: false })
  public debts: Array<Debt>;

  @OneToMany(() => Group, (group) => group.id, { nullable: false })
  public groups: Array<Group>;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  public createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  public updatedAt: Date;

  public constructor(id?: number, name?: string, description?: string) {
    if (id) this.id = id;
    if (name) this.name = name;
    if (description) this.description = description;
  }
}

export default Group;
