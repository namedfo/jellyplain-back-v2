import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-vkontakte';

// import { HelperService } from '../../helper/helper.service';

@Injectable()
export class VKStrategy extends PassportStrategy(Strategy, 'vkontakte') {
  constructor() {
    super(
      {
        clientID: 51473574,
        clientSecret: 'eyukYXPWuEzwSvYkKM5x',
        callbackURL: 'http://localhost:3333/auth/login/vkontakte/redirect',
        scope: ['profile'],
      },
      function (
        accessToken: string,
        refreshToken: string,
        // params: Params,
        profile: Profile,
        done: VerifyCallback,
      ) {
        return done(null, {
          profile,
        });
      },
    );
  }
}
