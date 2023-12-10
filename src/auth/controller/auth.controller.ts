import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import {
    AuthOutputDto,
    LoginDto,
    RefreshTokenDto,
    RegisterDto,
} from '../dto/register.dto';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        summary: '회원가입',
        description: '회원가입을 합니다.',
    })
    @ApiCreatedResponse({ description: '회원가입 성공' })
    @Post('register')
    async register(@Body() body: RegisterDto): Promise<AuthOutputDto> {
        return await this.authService.register(body);
    }

    @ApiOperation({
        summary: '로그인',
        description: '로그인을 합니다.',
    })
    @ApiOkResponse({ description: '로그인 성공' })
    @Post('login')
    async login(@Body() body: LoginDto): Promise<AuthOutputDto> {
        return await this.authService.login(body);
    }

    @ApiOperation({
        summary: '로그아웃',
        description: '로그아웃을 합니다.',
    })
    @ApiOkResponse({ description: '로그아웃 성공' })
    @UseGuards(AuthGuard)
    @Delete('logout')
    async logout() {
        // 캐시 제거
        return 'logout';
    }

    @ApiOperation({
        summary: '토큰 재발급',
        description: '토큰을 재발급 합니다.',
    })
    @ApiOkResponse({ description: '토큰 재발급 성공' })
    @Put('refresh')
    async refresh(@Body() body: RefreshTokenDto): Promise<AuthOutputDto> {
        return await this.authService.tokenRefresh(body.refreshToken);
    }
}
