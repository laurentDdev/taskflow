import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateWorkspaceDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 300)
  description: string;
}
