import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ASKDKSDJKSDSKMDKSMDKSMDKMDSKMDKSMDKDMS123e123123123123123',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      name: payload.name,
    };
  }
}
