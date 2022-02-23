import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly name?: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
}

export class UserSettingsDto {
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly image: null | string;
  @ApiProperty()
  readonly title: null | string;
  @ApiProperty()
  readonly description: null | string;
}
