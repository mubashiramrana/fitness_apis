import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/common/models/admin.model';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminService {

    constructor(
        @InjectModel(Admin.name) private adminModel: Model<Admin>
    ) { }

    async create(data) {
        try {
            const { email, password } = data;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const createdCat = new this.adminModel({ email, password: hashedPassword });
            return createdCat.save();
        } catch (error) {
            throw error;
        }
    }

    async login(data){
        const { email, password } = data;
        try {
            const admin : Admin = await this.adminModel.findOne({ email });
            if(!admin){
                throw new BadRequestException('User with this email does not exist.');
            }
            const hashedPassword = await bcrypt.compare(password, admin.password);
            if (!hashedPassword) {
                throw new BadRequestException('Provided userName or password is incorrect.');
            }
            return admin;
        } catch (error) {
            throw error;
        }
    }

}
