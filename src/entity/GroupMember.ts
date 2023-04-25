import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import GroupMemberRole from "../others/enums/GroupMemberRole";
import Group from "./Group";

@Entity({ name: "group_members" })
class GroupMember {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "role", type: "enum", enum: GroupMemberRole, nullable: false })
  public role: GroupMemberRole;

  @Column({ name: "name", nullable: false, type: "varchar" })
  public name: string;

  @Column({ name: "description", type: "text" })
  public description: string;

  @ManyToOne(() => Group, (group) => group.id, { nullable: false })
  public group: Group;

  @CreateDateColumn({ name: "create_at", type: "timestamp with time zone" })
  public createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  public updatedAt: Date;

  public constructor(
    id?: number,
    role?: GroupMemberRole,
    name?: string,
    description?: string,
    group?: Group
  ) {
    if (id) this.id = id;
    if (role) this.role = role;
    if (name) this.name = name;
    if (description) this.description = description;
    if (group) this.group = group;
  }
}

export default GroupMember;
