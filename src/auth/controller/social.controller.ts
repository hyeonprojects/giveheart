import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Social')
@Controller('social')
export class SocialController {
    constructor() {}

    @ApiOperation({
        summary: '구글 소셜 로그인',
        description: '구글 소셜 로그인을 합니다.',
    })
    @Post('google')
    async googleLogin() {}

    @ApiOperation({
        summary: '구글 소셜 로그인 리다렉트',
        description: '구글 소셜 로그인 리다렉트를 합니다.',
    })
    @Post('google/redirect')
    async googleLoginRedirect() {}
}
