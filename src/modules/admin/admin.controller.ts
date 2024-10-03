import { Controller, Post, Req } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {

    constructor(
        private adminService: AdminService
    ) { }

    @Post()
    register(@Req() request: Request) {
        const { body } = request;
        return this.adminService.create(body);
    }

    @Post('/login')
    login(@Req() request: Request) {
        const { body } = request;
        return this.adminService.login(body);
    }
}
