export interface UserDto {
   id: string;
   email: string;
   password: string;
   firstName?: string;
   lastName?: string;
   permissionLevel?: number;
}

export interface CreateUserDto {
   email: string;
   password: string;
   firstName?: string;
   lastName?: string;
   permissionLevel?: number;
}
export interface PatchUserDto {
   email: string;
   password: string;
   firstName?: string;
   lastName?: string;
   permissionLevel?: number;
}
export interface PutUserDto {
   email: string;
   password: string;
   firstName?: string;
   lastName?: string;
   permissionLevel?: number;
}