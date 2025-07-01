import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Conta } from './conta.entity';
import { CriarContaDTO } from './dtos/criar-conta.dto';
import { Usuario } from 'src/usuario/usuario.entity';

export class ContaService {
  constructor(
    @InjectRepository(Conta)
    private readonly repository: Repository<Conta>,
    private readonly dataSource: DataSource,
  ) {}

  async criar(
    dto: CriarContaDTO,
    internal: boolean = false,
    auth: Partial<Usuario>,
    queryRunner?: QueryRunner,
  ) {
    const qrunner = queryRunner || this.dataSource.createQueryRunner();

    if (!queryRunner) {
      await qrunner.connect();
      await qrunner.startTransaction();
    }

    try {
      const conta = qrunner.manager.create(Conta, {
        ...dto,
        usuario: { id: auth.id },
        saldo: dto.saldo_inicial,
        is_carteira: internal ? dto.is_carteira : false,
      });

      const conta_db = await qrunner.manager.save(conta);

      return conta_db;
      if (!queryRunner) qrunner.rollbackTransaction();
    } finally {
      if (!queryRunner) await qrunner.release();
    }
  }
}
