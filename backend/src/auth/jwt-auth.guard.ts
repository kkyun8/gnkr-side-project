import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const uncheckList = ['feed-GET', 'user-GET'];

export const getLoginId = (req) => {
  let loginId = 0;
  const { user } = req;
  if (user) {
    loginId = user.id;
  }
  return loginId;
};

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    const { pathname } = context.getRequest()._parsedUrl;
    const firstpath = pathname.split('/')[1];
    const { method } = context.getRequest();
    const isUnchecked = uncheckList.includes(`${firstpath}-${method}`);

    if (err) {
      throw err;
    }

    if (!isUnchecked) {
      if (!user) {
        throw new UnauthorizedException();
      }
    }

    return user;
  }
}
