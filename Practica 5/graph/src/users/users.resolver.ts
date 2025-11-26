<<<<<<< HEAD
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './dto/entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
=======
// src/users/users.resolver.ts
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserType } from '../types/user.type';
import { UsersRestService } from './users.service';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private usersService: UsersRestService) {}

  @Query(() => [UserType], { name: 'users' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @Query(() => UserType, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: string) {
    return this.usersService.findOne(id);
  }
>>>>>>> 42786dbd4d58bd492ad636ce7715e0c6b41b4731
}
