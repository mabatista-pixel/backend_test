import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1725045236185 implements MigrationInterface {
    name = 'InitialMigration1725045236185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("customer_code" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_ca90eb4361711ae10f6753fcb57" PRIMARY KEY ("customer_code"))`);
        await queryRunner.query(`CREATE TABLE "measure" ("measure_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "measure_datetime" TIMESTAMP NOT NULL, "measure_type" character varying NOT NULL, "measure_value" integer NOT NULL, "has_confirmed" boolean NOT NULL DEFAULT false, "image_url" character varying NOT NULL, "customerCustomerCode" uuid, CONSTRAINT "PK_36d8ab5cd717670c171e3a660eb" PRIMARY KEY ("measure_uuid"))`);
        await queryRunner.query(`ALTER TABLE "measure" ADD CONSTRAINT "FK_f4cde6e5d69af515d00901ac8d6" FOREIGN KEY ("customerCustomerCode") REFERENCES "customer"("customer_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measure" DROP CONSTRAINT "FK_f4cde6e5d69af515d00901ac8d6"`);
        await queryRunner.query(`DROP TABLE "measure"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
