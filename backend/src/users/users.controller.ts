import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDocument } from './schemas/user.schema';
import { GetUsersQueryDto } from './dtos/get-users.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query() query: GetUsersQueryDto,
  ): Promise<{ users: UserDocument[]; total: number }> {
    const { page, limit, search } = query;
    return await this.usersService.getUsers(page, limit, search);
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<UserDocument> {
    return await this.usersService.getUserById(id);
  }
}
