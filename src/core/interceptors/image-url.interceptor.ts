import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const IMAGE_FIELDS = new Set(['image', 'thumbnail', 'icon', 'profileImage', 'video']);

@Injectable()
export class ImageUrlInterceptor implements NestInterceptor {
  constructor(private readonly config: ConfigService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.transform(data)));
  }

  private transform(value: any, seen: WeakSet<object> = new WeakSet()): any {
    if (value === null || typeof value !== 'object' || value instanceof Date || Buffer.isBuffer(value)) {
      return value;
    }

    if (seen.has(value)) {
      return value;
    }
    seen.add(value);

    if (Array.isArray(value)) {
      for (const item of value) {
        this.transform(item, seen);
      }
      return value;
    }

    for (const key of Object.keys(value)) {
      const fieldValue = value[key];
      if (typeof fieldValue === 'string' && IMAGE_FIELDS.has(key)) {
        value[key] = this.toAbsoluteUrl(fieldValue);
      } else if (fieldValue && typeof fieldValue === 'object') {
        this.transform(fieldValue, seen);
      }
    }

    return value;
  }

  private toAbsoluteUrl(path: string): string {
    if (!path || /^https?:\/\//i.test(path)) {
      return path;
    }

    const baseUrl = this.config.getOrThrow<string>('BASE_URL');
    const normalized = path.replace(/\\/g, '/').replace(/^\.?\//, '');
    return `${baseUrl}/${normalized}`;
  }
}