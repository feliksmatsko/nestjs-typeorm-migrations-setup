import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class SchemaSync1681995609103 implements MigrationInterface {
  name = 'SchemaSync1681995609103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'flight',
      new TableColumn({
        name: 'airline',
        type: 'varchar',
        length: '255',
        default: '\'Delta Air Lines\'',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('flight', 'airline');
  }

}
