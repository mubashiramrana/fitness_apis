import { Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
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

    @Post('get')
    getAll(@Req() req: Request) {
        const { body } = req;
        return this.memberService.getAll(body);
    }

    @Post('save-fee')
    saveFee(@Req() req: Request) {
        const { body } = req;
        return this.memberService.addFee(body);
    }

    @Post('get-fee')
    getFee(@Req() req: Request) {
        const { body } = req;
        return this.memberService.getAllFees(body);
    }

    @Post(':id')
    edit(@Req() req: Request, @Param() query) {
        const { body } = req;
        const { id } = query;
        return this.memberService.edit(id, body);
    }

    @Delete(':id')
    delete(@Req() req: Request, @Param() query) {
        const { id } = query;
        return this.memberService.delete(id);
    }

    @Delete('delete-fee/:id')
    deleteFee(@Req() req: Request, @Param() query) {
        const { id } = query;
        return this.memberService.deleteFee(id);
    }
}
