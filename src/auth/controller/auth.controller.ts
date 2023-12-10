import { Body, Controller, Delete, Post } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        summary: '회원가입',
        description: '회원가입을 합니다.',
    })
    @ApiCreatedResponse({ description: '회원가입 성공' })
    @Post('register')
    async register(@Body() body: RegisterDto) {
        return await this.authService.register(body);
    }

    @ApiOperation({
        summary: '로그인',
        description: '로그인을 합니다.',
    })
    @ApiOkResponse({ description: '로그인 성공' })
    @Post('login')
    async login(@Body() body: RegisterDto) {
        return 'login';
    }

    @ApiOperation({
        summary: '로그아웃',
        description: '로그아웃을 합니다.',
    })
    @ApiOkResponse({ description: '로그아웃 성공' })
    @Delete('logout')
    async logout() {
        return 'logout';
    }

    @ApiOperation({
        summary: '토큰 재발급',
        description: '토큰을 재발급 합니다.',
    })
    @ApiOkResponse({ description: '토큰 재발급 성공' })
    @Post('refresh')
    async refresh() {
        return 'refresh';
    }
}
