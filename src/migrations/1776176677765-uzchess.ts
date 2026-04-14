import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1776176677765 implements MigrationInterface {
    name = 'Uzchess1776176677765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "souvenir-image" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "souvenirId" integer NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_adbcaffe280d21cfbb1c34cac3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "color" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "title" character varying(128) NOT NULL, "color" character varying(10) NOT NULL, CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "souvenirColor" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "souvenirId" integer NOT NULL, "colorId" integer NOT NULL, "colorsId" integer, CONSTRAINT "PK_aa1a5d91ff90983e6bac1dcf72a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "souvenirs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "title" character varying(128) NOT NULL, "description" text NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_48244e3bc881a2aedb21d225d23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "souvenir-review" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "userId" integer NOT NULL, "souvenirId" integer NOT NULL, "rating" integer NOT NULL, "comment" character varying NOT NULL, CONSTRAINT "PK_990f136d3cdb6fec8ef37829fc0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "souvenir-likes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "userId" integer NOT NULL, "souvenirId" integer NOT NULL, CONSTRAINT "PK_32f8c41ec2bcebacd3a5b3d567e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "souvenir-image" ADD CONSTRAINT "FK_b12f79cffbbc53a376b87b3a3ee" FOREIGN KEY ("souvenirId") REFERENCES "souvenirs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "souvenirColor" ADD CONSTRAINT "FK_958e95af8b07a1c11f517e1b298" FOREIGN KEY ("souvenirId") REFERENCES "souvenirs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "souvenirColor" ADD CONSTRAINT "FK_27a2f26953589d83ef384fe1ac3" FOREIGN KEY ("colorsId") REFERENCES "color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "souvenir-review" ADD CONSTRAINT "FK_eafe468d8f20621adfb15566dd4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "souvenir-review" ADD CONSTRAINT "FK_2b684a3c1f2f07b81075e12f8bc" FOREIGN KEY ("souvenirId") REFERENCES "souvenirs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "souvenir-likes" ADD CONSTRAINT "FK_ecafcd76d1b92409af0f702ab84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "souvenir-likes" DROP CONSTRAINT "FK_ecafcd76d1b92409af0f702ab84"`);
        await queryRunner.query(`ALTER TABLE "souvenir-review" DROP CONSTRAINT "FK_2b684a3c1f2f07b81075e12f8bc"`);
        await queryRunner.query(`ALTER TABLE "souvenir-review" DROP CONSTRAINT "FK_eafe468d8f20621adfb15566dd4"`);
        await queryRunner.query(`ALTER TABLE "souvenirColor" DROP CONSTRAINT "FK_27a2f26953589d83ef384fe1ac3"`);
        await queryRunner.query(`ALTER TABLE "souvenirColor" DROP CONSTRAINT "FK_958e95af8b07a1c11f517e1b298"`);
        await queryRunner.query(`ALTER TABLE "souvenir-image" DROP CONSTRAINT "FK_b12f79cffbbc53a376b87b3a3ee"`);
        await queryRunner.query(`DROP TABLE "souvenir-likes"`);
        await queryRunner.query(`DROP TABLE "souvenir-review"`);
        await queryRunner.query(`DROP TABLE "souvenirs"`);
        await queryRunner.query(`DROP TABLE "souvenirColor"`);
        await queryRunner.query(`DROP TABLE "color"`);
        await queryRunner.query(`DROP TABLE "souvenir-image"`);
    }

}
