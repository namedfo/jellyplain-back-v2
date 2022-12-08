import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
// import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

// config();

@Injectable()
export class GoogleAdminStrategy extends PassportStrategy(
  Strategy,
  'google-admin',
) {
  constructor() {
    super({
      clientID:
        '1084904286708-7r6fmqc93ge4gi2gor2ubscjas6djgoc.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL:
        'https://jellyplain-back.onrender.com/auth/login/google-admin/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
