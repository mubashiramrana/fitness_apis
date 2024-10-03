import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Members } from 'src/common/models/members.model';

@Injectable()
export class MembersService {

    constructor(
        @InjectModel(Members.name) private membersModel: Model<Members>
    ) { }

    async create(data) {
        try {
            const { phoneNo } = data;
            const exists = await this.checkExists({ phoneNo });
            if (exists) {
                throw new BadRequestException('User Already Registred with this Phone Number.');
            }
            const result = new this.membersModel(data);
            return result.save();
        } catch (error) {
            throw error;
        }
    }

    async getAll(filters) {
        const { fullName, address, joiningDate, phoneNo, page, pageSize } = filters;
        try {
            const aggQuery = [
                {
                    $match: {
                        ...(fullName && { fullName: { $regex: fullName, "$options": "i" } }),
                        ...(address && { address: { $regex: address, "$options": "i" } }),
                        ...(phoneNo && { phoneNo: { $regex: phoneNo, "$options": "i" } }),
                        ...(joiningDate && { joiningDate: new Date(joiningDate) })
                    }
                },
                {
                    $skip: (page - 1) * pageSize
                },
                {
                    $limit: pageSize
                }
            ];
            const countQuery = [
                {
                    $match: {
                        ...(fullName && { fullName: { $regex: fullName, "$options": "i" } }),
                        ...(address && { address: { $regex: address, "$options": "i" } }),
                        ...(phoneNo && { phoneNo: { $regex: phoneNo, "$options": "i" } }),
                        ...(joiningDate && { joiningDate: new Date(joiningDate) })
                    }
                },
                {
                    $count: "totalCount"
                }
            ];
            const result = await this.membersModel.aggregate(aggQuery);
            const count = await this.membersModel.aggregate(countQuery);
            return {
                data: result,
                count: count?.length ? count[0].totalCount : 0
            };
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {

    }

    async edit(id, data) {
        try {
            const { phoneNo } = data;
            const exists = await this.checkExists( { phoneNo , _id : { $ne : id } } );
            if (exists) {
                throw new BadRequestException('User Already Registred with this Phone Number.');
            }
            return this.membersModel.findByIdAndUpdate(id, data);
        } catch (error) {
            throw error;
        }
    }

    async checkExists(filters) {
        const result = await this.membersModel.findOne(filters);
        return result;
    }

    async countQuery(filters) {

    }
}
