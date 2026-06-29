import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1779359982590 implements MigrationInterface {
    name = 'Uzchess1779359982590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "newPrice" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "newPrice" DROP NOT NULL`);
    }

}
