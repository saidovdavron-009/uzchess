import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SouvenirPublicService } from './services/souvenir/souvenir.public.service';
import { SouvenirAdminService } from './services/souvenir/souvenir.admin.service';
import { ColorsAdminService } from './services/color/colors.admin.service';
import { ColorsPublicService } from './services/color/colors.public.service';
import { SouvenirImagesAdminService } from './services/souvenir-image/souvenirImages.admin.service';
import { SouvenirColorsAdminService } from './services/souvenir-color/souvenirColors.admin.service';
import { SouvenirLikesPublicService } from './services/souvenir-likes/souvenirLikes.public.service';
import { SouvenirReviewsPublicService } from './services/souvenir-reviews/souvenirReviews.public.service';
import { CartItemPublicService } from './services/cart-item/cartItem.public.service';

import { SouvenirPublicController } from './controllers/souvenir/souvenir.public.controller';
import { SouvenirAdminController } from './controllers/souvenir/souvenir.admin.controller';
import { ColorsAdminController } from './controllers/colors/colors.admin.controller';
import { ColorsPublicController } from './controllers/colors/colors.public.controller';
import { SouvenirImagesAdminController } from './controllers/souvenirImages/souvenirImages.admin.controller';
import { SouvenirColorsAdminController } from './controllers/souvenirColors/souvenirColors.admin.controller';
import { SouvenirLikesPublicController } from './controllers/souvenirLikes/souvenirLikes.public.controller';
import { SouvenirReviewsPublicController } from './controllers/souvenirReviews/souvenirReviews.public.controller';
import { CartItemPublicController } from './controllers/cartItems/cartItem.public.controller';
import { CartItemRepository } from './repository/cart-item.repository';
import { ColorsRepository } from './repository/colors.repository';
import { SouvenirRepository } from './repository/souvenir.repository';
import { SouvenirColorRepository } from './repository/souvenir-color.repository';
import { SouvenirImageRepository } from './repository/souvenir-image.repository';
import { SouvenirLikesRepository } from './repository/souvenir-likes.repository';
import { SouvenirReviewsRepository } from './repository/souvenir-reviews.repository';
import { Souvenir } from './entities/souvenir.entity';
import { Colors } from './entities/colors.entity';
import { SouvenirColor } from './entities/souvenirColor.entity';
import { SouvenirImages } from './entities/souvenirImages.entity';
import { SouvenirLikes } from './entities/souvenir.likes.entity';
import { SouvenirReviews } from './entities/souvenirReviews.entity';
import { CartItem } from './entities/cartItem.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Souvenir, Colors, SouvenirColor, SouvenirImages, SouvenirLikes, SouvenirReviews, CartItem])
  ],
  providers: [
    SouvenirPublicService,
    SouvenirAdminService,
    SouvenirRepository,
    ColorsAdminService,
    ColorsPublicService,
    ColorsRepository,
    SouvenirImagesAdminService,
    SouvenirImageRepository,
    SouvenirColorsAdminService,
    SouvenirColorRepository,
    SouvenirLikesPublicService,
    SouvenirLikesRepository,
    SouvenirReviewsPublicService,
    SouvenirReviewsRepository,
    CartItemPublicService,
    CartItemRepository,
  ],
  controllers: [
    SouvenirPublicController,
    SouvenirAdminController,
    ColorsAdminController,
    ColorsPublicController,
    SouvenirImagesAdminController,
    SouvenirColorsAdminController,
    SouvenirLikesPublicController,
    SouvenirReviewsPublicController,
    CartItemPublicController,
  ],
})
export class CartModule {}
