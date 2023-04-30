import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import DebtMemberRole from "../others/enums/DebtMemberRole";
import GroupMember from "../groupMember/GroupMember";
import Debt from "../debt/Debt";

@Entity({ name: "debt_members" })
class DebtMember {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "role", type: "enum", enum: DebtMemberRole, nullable: false })
  public role: DebtMemberRole;

  @Column({ name: "amount", type: "money", nullable: true })
  public amount: number;

  @Column({ name: "is_paid", type: "boolean", nullable: false, default: false })
  public isPaid: boolean;

  @OneToOne(() => GroupMember)
  @JoinColumn({ name: "group_member_id" })
  public groupMember: GroupMember;

  @ManyToOne(() => Debt, (debt) => debt.id, { nullable: false })
  public debt: Debt;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  public createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  public updatedAt: Date;

  public constructor(
    id?: number,
    role?: DebtMemberRole,
    amount?: number,
    isPaid?: boolean,
    groupMember?: GroupMember,
    debt?: Debt
  ) {
    if (id) this.id = id;
    if (role) this.role = role;
    if (amount) this.amount = amount;
    if (isPaid) this.isPaid = isPaid;
    if (groupMember) this.groupMember = groupMember;
    if (debt) this.debt = debt;
  }
}

export default DebtMember;
