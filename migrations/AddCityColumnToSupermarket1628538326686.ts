import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCityColumnToSupermarket1628538326686
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "supermarkets" ADD COLUMN "city" TEXT DEFAULT 'Lecheria'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "supermarkets" DROP COLUMN "city"`);
  }
}
