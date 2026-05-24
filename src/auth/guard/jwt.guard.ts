// src/auth/guard/jwt.guard.ts
import { AuthGuard } from '@nestjs/passport';
export class JwtAuthGuard extends AuthGuard('jwt') {}