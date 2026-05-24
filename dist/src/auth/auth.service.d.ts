import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    login(dto: AuthDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: string, email: string): Promise<{
        access_token: string;
    }>;
}
