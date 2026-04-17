import { Module } from '@nestjs/common';

import { SouvenirPublicService } from './services/souvenir.public.service';
import { SouvenirAdminService } from './services/souvenir.admin.service';
import { ColorsAdminService } from './services/colors.admin.service';
import { ColorsPublicService } from './services/colors.public.service';
import { SouvenirImagesAdminService } from './services/souvenirImages.admin.service';
import { SouvenirColorsAdminService } from './services/souvenirColors.admin.service';
import { SouvenirLikesPublicService } from './services/souvenirLikes.public.service';
import { SouvenirReviewsPublicService } from './services/souvenirReviews.public.service';
import { CartItemPublicService } from './services/cartItem.public.service';

import { SouvenirPublicController } from './controllers/souvenir/souvenir.public.controller';
import { SouvenirAdminController } from './controllers/souvenir/souvenir.admin.controller';
import { ColorsAdminController } from './controllers/colors/colors.admin.controller';
import { ColorsPublicController } from './controllers/colors/colors.public.controller';
import { SouvenirImagesAdminController } from './controllers/souvenirImages/souvenirImages.admin.controller';
import { SouvenirColorsAdminController } from './controllers/souvenirColors/souvenirColors.admin.controller';
import { SouvenirLikesPublicController } from './controllers/souvenirLikes/souvenirLikes.public.controller';
import { SouvenirReviewsPublicController } from './controllers/souvenirReviews/souvenirReviews.public.controller';
import { CartItemPublicController } from './controllers/cartItems/cartItem.public.controller';

@Module({
  providers: [
    SouvenirPublicService,
    SouvenirAdminService,
    ColorsAdminService,
    ColorsPublicService,
    SouvenirImagesAdminService,
    SouvenirColorsAdminService,
    SouvenirLikesPublicService,
    SouvenirReviewsPublicService,
    CartItemPublicService,
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
