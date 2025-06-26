import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const logger = new Logger('TypeOrmModule');
        const hostname = config.get<string>('DB_HOST') || 'localhost';
        const port = config.get<number>('DB_PORT') || 5432;
        const user = config.get<string>('DB_USER');
        const password = config.get<string>('DB_PASS');

        if (!hostname || !port || !user || !password) {
          logger.error('Verifique as variáveis de ambiente.');
          process.exit(1);
        }
        return {
          type: 'postgres',
          host: hostname,
          port,
          username: user,
          password: password,
          database: 'finance',
          autoLoadEntities: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
