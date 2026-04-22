import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageAdminController } from './controllers/languages/language.admin.controller';
import { LanguagePublicController } from './controllers/languages/language.public.controller';
import { CountryAdminController } from './controllers/countries/country.admin.controller';
import { CountryPublicController } from './controllers/countries/country.public.controller';
import { CountryPublicService } from './services/countries/country.public.service';
import { CountryAdminService } from './services/countries/country.admin.service';
import { LanguagePublicService } from './services/languages/language.public.service';
import { LanguageAdminService } from './services/languages/language.admin.service';
import { MatchesAdminService } from './services/matches/matches.admin.service';
import { MatchesPublicService } from './services/matches/matches.public.service';
import { MatchesAdminController } from './controllers/matches/matches.admin.controller';
import { MatchesPublicController } from './controllers/matches/matches.public.controller';
import { DifficultyAdminService } from './services/difficulties/difficulty.admin.service';
import { DifficultyPublicService } from './services/difficulties/difficulty.public.service';
import { DifficultyAdminController } from './controllers/difficulties/difficulty.admin.controller';
import { DifficultyPublicController } from './controllers/difficulties/difficulty.public.controller';
import { PlayersAdminService } from './services/players/players.admin.service';
import { PlayersPublicService } from './services/players/players.public.service';
import { PlayersAdminController } from './controllers/players/players.admin.controller';
import { PlayersPublicController } from './controllers/players/players.public.controller';
import { AuthorAdminService } from './services/author/author.admin.service';
import { AuthorPublicService } from './services/author/author.public.service';
import { CountryRepository } from './repository/country.repository';
import { LanguageRepository } from './repository/language.repository';
import { DifficultyRepository } from './repository/difficulty.repository';
import { MatchesRepository } from './repository/matches.repository';
import { PlayersRepository } from './repository/players.repository';
import { AuthorRepository } from './repository/author.repository';
import { Country } from './entities/country.entity';
import { Language } from './entities/language.entity';
import { Difficulty } from './entities/difficulty.entity';
import { MatchesEntity } from './entities/matches.entity';
import { Player } from './entities/players.entity';
import { Author } from './entities/author.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Country, Language, Difficulty, MatchesEntity, Player, Author])
  ],
  providers : [
    CountryAdminService,
    CountryPublicService,
    CountryRepository,
    LanguageAdminService,
    LanguagePublicService,
    LanguageRepository,
    MatchesAdminService,
    MatchesPublicService,
    MatchesRepository,
    DifficultyAdminService,
    DifficultyPublicService,
    DifficultyRepository,
    PlayersAdminService,
    PlayersPublicService,
    PlayersRepository,
    AuthorAdminService,
    AuthorPublicService,
    AuthorRepository,
  ],
  controllers : [
    LanguageAdminController,
    LanguagePublicController,
    CountryAdminController,
    CountryPublicController,
    MatchesAdminController,
    MatchesPublicController,
    DifficultyAdminController,
    DifficultyPublicController,
    PlayersAdminController,
    PlayersPublicController
  ]
})

export class CommonModule {}
