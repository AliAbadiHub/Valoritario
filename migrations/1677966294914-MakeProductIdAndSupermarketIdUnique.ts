import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeProductIdAndSupermarketIdUnique1635809829568
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_PRODUCT_SUPERMARKET_UNIQUE" ON "inventory" ("productId", "supermarketId")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "IDX_PRODUCT_SUPERMARKET_UNIQUE"
        `);
  }
}
