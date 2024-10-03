import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {

    constructor(
        private memberService: MembersService
    ) { }

    @Post()
    create(@Req() req: Request) {
        const { body } = req;
        return this.memberService.create(body);
    }

    @Post(':id')
    edit(@Req() req: Request, @Param() query) {
        const { body } = req;
        const { id } = query;
        return this.memberService.edit(id, body);
    }

    @Post('get')
    getAll(@Req() req: Request) {
        const { body } = req;
        return this.memberService.getAll(body);
    }
}
