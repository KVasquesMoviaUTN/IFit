import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPurchasePriceToSaleDetail1765327731910 implements MigrationInterface {
    name = 'AddPurchasePriceToSaleDetail1765327731910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_details" ADD "purchase_price" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "paymentChannel" character varying DEFAULT 'Local'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "paymentChannel"`);
        await queryRunner.query(`ALTER TABLE "sale_details" DROP COLUMN "purchase_price"`);
    }

}
