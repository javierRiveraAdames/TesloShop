import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
        name: 'TesloDB',
        useFactory: () => ({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [],
            synchronize: true,
            autoLoadEntities: true,
        })
    }),
    ]
})
export class CommonModule { }
