import { AuthGuard } from './auth.guard';
import { RegisterDto } from './dtos/register.dto';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post(['/admin/register', '/ambassador/register'])
  async register(@Body() body: RegisterDto, @Req() request: Request) {
    const { password_confirm, ...data } = body;

    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Password does not match');
    }

    const hashed = await bcrypt.hashSync(body.password, 12);

    return this.userService.create({
      ...data,
      password: hashed,
      is_ambassador: request.path === '/api/auth/ambassador/register',
    });
  }

  @Post(['/admin/login', '/ambassador/login'])
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const user = await this.userService.findOne({ email: email });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Password does not match');
    }

    const adminLogin = request.path === '/api/auth/admin/login';

    if (user.is_ambassador && adminLogin) {
      throw new UnauthorizedException();
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      scope: adminLogin ? 'admin' : 'ambassador',
    });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
    };
  }

  @UseGuards(AuthGuard)
  @Get(['admin/user', 'ambassador/user'])
  async user(@Req() request: Request) {
    console.log('fdf');
    const cookie = request.cookies['jwt'];
    const { id } = await this.jwtService.verifyAsync(cookie);

    if (request.path === '/api/auth/admin/user') {
      return await this.userService.findOne({ id });
    }

    const user = await this.userService.findOneByRelation({
      id,
      relations: ['orders', 'orders.order_items'],
    });

    const { order, password, ...data } = user;

    return {
      ...data,
      revenue: user.revenue,
    };
  }

  @UseGuards(AuthGuard)
  @Post(['admin/logout', 'ambassador/logout'])
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'success',
    };
  }

  @UseGuards(AuthGuard)
  @Put(['admin/users/info', 'ambassador/users/info'])
  async updateInfo(@Req() request: Request, @Body() body: UpdateUserDto) {
    const cookie = request.cookies['jwt'];
    const { id } = await this.jwtService.verifyAsync(cookie);
    await this.userService.update(id, body);
    return this.userService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Put(['admin/users/password', 'ambassador/users/password'])
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    const cookie = request.cookies['jwt'];
    const { id } = await this.jwtService.verifyAsync(cookie);

    if (password !== password_confirm) {
      throw new BadRequestException('Password does not match');
    }
    await this.userService.update(id, {
      password: bcrypt.hashSync(password, 12),
    });
    return this.userService.findOne({ id });
  }
}
