import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1611154027213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "path",
            type: "varchar",
          },
          {
            //criando uma coluna que sera chave estrangeira
            name: "orphanage_id",
            type: "integer",
          },
        ],
        //declarando a chave estrangeira criada e linkando ela com outra table
        foreignKeys: [
          {
            name: "ImageOrphanage",
            columnNames: ["orphanage_id"],
            referencedTableName: "orphanages",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE", //O que vai acontecer se o ID do orfanato for atualizado
            //Cascade faz com que caso o ID seja alterado as imagens vao "seguir" ele tambem
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("images");
  }
}
