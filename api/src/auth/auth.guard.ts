import { JwtService } from '@nestjs/jwt';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const jwt = request.cookies['jwt'];
      const { scope } = await this.jwtService.verify(jwt);

      console.log(request.path.toString());

      const links = ['/api/ambassador', '/api/auth/ambassador'];

      const link = request.path.toString();

      const is_ambassador = links.some((e) => link.includes(e));

      return (
        (is_ambassador && scope === 'ambassador') ||
        (!is_ambassador && scope === 'admin')
      );
    } catch (error) {
      return false;
    }
  }
}
