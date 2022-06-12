import UsersDao from '../dao/users.dao';
import {CRUD} from "../common/interfaces/crud.interface";
import {PatchUserDto, PutUserDto, UserDto} from "../dto/user.dto";

class UsersService implements CRUD {

    async create(resource: UserDto) {
        return UsersDao.addUser(resource);
    }

    async deleteById(resourceId: string) {
        return UsersDao.removeUserById(resourceId);
    };

    async list(limit: number, page: number) {
        return UsersDao.getUsers(limit, page);
    };

    async putById(id: string, resource: PutUserDto): Promise<any> {
        return UsersDao.updateUserById(id, resource);
    }

    async patchById(id: string, resource: PatchUserDto) {
        return UsersDao.updateUserById(id, resource)
    };

    async readById(resourceId: string) {
        return UsersDao.getUserById(resourceId);
    };

    async updateById(resource:any) {
        return UsersDao.updateUserById(resource.id, resource)
    };

    async getUserByEmail(email: string) {
        return UsersDao.getUserByEmail(email);
    }
}

export default new UsersService();