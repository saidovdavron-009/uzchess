import { SetMetadata } from '@nestjs/common';

export const ColorsKey = 'colors'
export const Color = (...color: string[])=> SetMetadata(ColorsKey,color)