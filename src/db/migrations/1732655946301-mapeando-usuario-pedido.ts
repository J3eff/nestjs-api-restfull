import { MigrationInterface, QueryRunner } from "typeorm";

export class MapeandoUsuarioPedido1732655946301 implements MigrationInterface {
    name = 'MapeandoUsuarioPedido1732655946301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos" RENAME COLUMN "delete_at" TO "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME COLUMN "delete_at" TO "deleted_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME COLUMN "deleted_at" TO "delete_at"`);
        await queryRunner.query(`ALTER TABLE "pedidos" RENAME COLUMN "deleted_at" TO "delete_at"`);
    }

}
