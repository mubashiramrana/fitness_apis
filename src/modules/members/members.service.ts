import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { MembersFee } from 'src/common/models/member-fee.model';
import { Members } from 'src/common/models/members.model';

@Injectable()
export class MembersService {

    constructor(
        @InjectModel(Members.name) private membersModel: Model<Members>,
        @InjectModel(MembersFee.name) private membersFeeModel: Model<MembersFee>
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
            const aggQuery: any = [
                { $sort: { createdAt: -1 } },
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
                },
                {
                    $project: {
                        fullName: '$fullName',
                        address: '$address',
                        phoneNo: '$phoneNo',
                        joiningDate: '$joiningDate',
                        createdAt: '$createdAt'
                    }
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
            console.log('error', error)
            throw error;
        }
    }

    async getOne(id) {

    }

    async edit(id, data) {
        try {
            const { phoneNo } = data;
            const exists = await this.checkExists({ phoneNo, _id: { $ne: id } });
            if (exists) {
                throw new BadRequestException('User Already Registred with this Phone Number.');
            }
            return this.membersModel.findByIdAndUpdate(id, data);
        } catch (error) {
            throw error;
        }
    }

    async delete(id){
        try {
            return this.membersModel.deleteOne({ _id : id });
        } catch (error) {
            throw error;
        }
    }

    async deleteFee(id){
        try {
            return this.membersFeeModel.deleteOne({ _id : id });
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

    async addFee(data) {
        try {
            const { month, year, memberId, amount, remainingAmount } = data;
            const check = await this.checkAlreadyAdded({ month, year, memberId });
            if (check) {
                throw new BadRequestException('Already fee added for selcted member');
            }
            const result = new this.membersFeeModel(data);
            return result.save();
        } catch (error) {
            throw error;
        }
    }

    async checkAlreadyAdded(filters) {
        return await this.membersFeeModel.findOne({ ...filters });
    }

    async getAllFees(data) {
        const { month, year, page, pageSize , memberId } = data;
        try {
            const aggQuery: any = [
                { $sort: { createdAt: -1 } },
                {
                    $match: {
                        memberId :mongoose.Types.ObjectId.createFromHexString(memberId),
                        ...(month && { month: { $regex: month, "$options": "i" } }),
                        ...(year && { year: { $regex: year, "$options": "i" } })
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
                        memberId :mongoose.Types.ObjectId.createFromHexString(memberId),
                        ...(month && { month: { $regex: month, "$options": "i" } }),
                        ...(year && { year: { $regex: year, "$options": "i" } })
                    }
                },
                {
                    $count: "totalCount"
                }
            ];
            const result = await this.membersFeeModel.aggregate(aggQuery);
            const count = await this.membersFeeModel.aggregate(countQuery);
            return {
                data: result,
                count: count?.length ? count[0].totalCount : 0
            };
        } catch (error) {
            throw error;
        }
    }
}
