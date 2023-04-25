import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Group from "./Group";
import DebtMember from "./DebtMember";

@Entity({ name: "debts" })
class Debt {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "name", nullable: false, type: "varchar" })
  public name: string;

  @Column({ name: "description", type: "text", nullable: true })
  public description: string;

  @Column({ name: "amount", nullable: false, type: "money" })
  public amount: number;

  @ManyToOne(() => Group, (group) => group.id, { nullable: false })
  public group: Group;

  @OneToMany(() => DebtMember, (debtMember) => debtMember.debt)
  public debtMembers: Array<DebtMember>;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  public createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  public updatedAt: Date;

  public constructor(id?: number, name?: string, amount?: number, group?: Group) {
    if (id) this.id = id;
    if (name) this.name = name;
    if (amount) this.amount = amount;
    if (group) this.group = group;
  }
}

export default Debt;
