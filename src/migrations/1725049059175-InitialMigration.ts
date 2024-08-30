import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1725049059175 implements MigrationInterface {
    name = 'InitialMigration1725049059175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measure" DROP CONSTRAINT "FK_f4cde6e5d69af515d00901ac8d6"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "PK_ca90eb4361711ae10f6753fcb57"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "customer_code"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "customer_code" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "PK_ca90eb4361711ae10f6753fcb57" PRIMARY KEY ("customer_code")`);
        await queryRunner.query(`ALTER TABLE "measure" DROP COLUMN "customerCustomerCode"`);
        await queryRunner.query(`ALTER TABLE "measure" ADD "customerCustomerCode" integer`);
        await queryRunner.query(`ALTER TABLE "measure" ADD CONSTRAINT "FK_f4cde6e5d69af515d00901ac8d6" FOREIGN KEY ("customerCustomerCode") REFERENCES "customer"("customer_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measure" DROP CONSTRAINT "FK_f4cde6e5d69af515d00901ac8d6"`);
        await queryRunner.query(`ALTER TABLE "measure" DROP COLUMN "customerCustomerCode"`);
        await queryRunner.query(`ALTER TABLE "measure" ADD "customerCustomerCode" uuid`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "PK_ca90eb4361711ae10f6753fcb57"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "customer_code"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "customer_code" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "PK_ca90eb4361711ae10f6753fcb57" PRIMARY KEY ("customer_code")`);
        await queryRunner.query(`ALTER TABLE "measure" ADD CONSTRAINT "FK_f4cde6e5d69af515d00901ac8d6" FOREIGN KEY ("customerCustomerCode") REFERENCES "customer"("customer_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
