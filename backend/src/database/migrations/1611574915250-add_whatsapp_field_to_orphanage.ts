import { MigrationInterface, QueryRunner, TableColumn, Table } from "typeorm";
import { string } from "yup/lib/locale";

export class addWhatsappFieldToOrphanage1611574915250
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orphanages",
      new TableColumn({
        name: "whatsapp",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("orphanages", "whatsapp");
  }
}
