import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductIdToProductSupermarket1645426152311
  implements MigrationInterface
{
  name = 'AddProductIdToProductSupermarket1645426152311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_supermarket" ADD "productId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_supermarket" ADD CONSTRAINT "FK_123456789" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_supermarket" DROP CONSTRAINT "FK_123456789"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_supermarket" DROP COLUMN "productId"`,
    );
  }
}
