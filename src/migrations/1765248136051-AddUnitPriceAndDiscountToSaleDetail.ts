import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUnitPriceAndDiscountToSaleDetail1765248136051 implements MigrationInterface {
    name = 'AddUnitPriceAndDiscountToSaleDetail1765248136051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "discount_applied"`);
        await queryRunner.query(`ALTER TABLE "sale_details" ADD "unit_price" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "sale_details" ADD "discount" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "sale_details" DROP CONSTRAINT "FK_ff07d1ac574d56390cf66820fae"`);
        await queryRunner.query(`ALTER TABLE "presentation" DROP CONSTRAINT "FK_1d0b458f8ae4612ace81fa24f55"`);
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_4f166bb8c2bfcef2498d97b4068"`);
        await queryRunner.query(`ALTER TABLE "product_price_history" DROP CONSTRAINT "FK_64438a29390089f436eeeaae038"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "products_id_seq" OWNED BY "products"."id"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "id" SET DEFAULT nextval('"products_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "surname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_4f166bb8c2bfcef2498d97b4068" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "presentation" ADD CONSTRAINT "FK_1d0b458f8ae4612ace81fa24f55" FOREIGN KEY ("product") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_details" ADD CONSTRAINT "FK_ff07d1ac574d56390cf66820fae" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_price_history" ADD CONSTRAINT "FK_64438a29390089f436eeeaae038" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_price_history" DROP CONSTRAINT "FK_64438a29390089f436eeeaae038"`);
        await queryRunner.query(`ALTER TABLE "sale_details" DROP CONSTRAINT "FK_ff07d1ac574d56390cf66820fae"`);
        await queryRunner.query(`ALTER TABLE "presentation" DROP CONSTRAINT "FK_1d0b458f8ae4612ace81fa24f55"`);
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_4f166bb8c2bfcef2498d97b4068"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "surname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "products_id_seq"`);
        await queryRunner.query(`ALTER TABLE "product_price_history" ADD CONSTRAINT "FK_64438a29390089f436eeeaae038" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_4f166bb8c2bfcef2498d97b4068" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "presentation" ADD CONSTRAINT "FK_1d0b458f8ae4612ace81fa24f55" FOREIGN KEY ("product") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_details" ADD CONSTRAINT "FK_ff07d1ac574d56390cf66820fae" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_details" DROP COLUMN "discount"`);
        await queryRunner.query(`ALTER TABLE "sale_details" DROP COLUMN "unit_price"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "discount_applied" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

}
