import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1779358643510 implements MigrationInterface {
    name = 'Uzchess1779358643510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "newPrice" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "newPrice" DROP NOT NULL`);
    }

}
