import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class SocialService {
    private readonly logger = new Logger(SocialService.name);
    private readonly googleUrl =
        'https://accounts.google.com/giveheart/oauth2/v2/auth';

    constructor(private readonly httpService: HttpService) {}

    async googleLogin() {
        let url = `${this.googleUrl}?`;
        url += `client_id=${process.env.GOOGLE_CLIENT_ID}`;
        url += `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}`;
        url += '&response_type=code';
        url += '&scope=openid%20profile%20email';

        // google API
        const oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI,
        );
    }
}
