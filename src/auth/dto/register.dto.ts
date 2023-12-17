import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBase64,
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';
import { UserType } from '../../users/enum/users.enum';

export class RegisterDto {
    @ApiProperty({ description: '이메일' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: '비밀번호' })
    @IsBase64()
    password!: string;

    @ApiPropertyOptional({ description: '이름' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: '닉네임' })
    @IsString()
    nickname!: string;

    @ApiProperty({ description: '소셜 아이디' })
    @IsString()
    socialId!: string;

    @ApiProperty({ description: '전화번호' })
    @IsString()
    phone!: string;

    @ApiProperty({
        description: '사용자 타입',
        enum: UserType,
    })
    @IsEnum(UserType)
    userType!: UserType;
}

export class LoginDto {
    @ApiProperty({ description: '이메일' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: '비밀번호' })
    @IsBase64()
    password!: string;
}

export class RefreshTokenDto {
    @ApiProperty({ description: '리프레시 토큰' })
    @IsString()
    refreshToken!: string;
}

export class AuthOutputDto {
    @ApiProperty({ description: '액세스 토큰' })
    @IsString()
    accessToken!: string;

    @ApiProperty({ description: '리프레시 토큰' })
    @IsString()
    refreshToken!: string;
}
