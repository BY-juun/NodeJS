const { Op } = require('Sequelize');
const schedule = require('node-schedule');

const { Good, Auction, User, sequelize } = require('./models');

module.exports = async () => {
    console.log('checkAuction');
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // 어제 시간
        const targets = await Good.findAll({ //24시간 전에 생성되었는데... 낙찰되지 않은애들 >> 낙찰이 되어야함
            where: {
                SoldId: null,
                createdAt: { [Op.lte]: yesterday },
            },
        });
        targets.forEach(async (target) => { // 위에서 찾은애들 낙찰 시켜줌.
            const success = await Auction.findOne({
                where: { GoodId: target.id },
                order: [['bid', 'DESC']],
            });
            await Good.update({ SoldId: success.UserId }, { where: { id: target.id } });
            await User.update({
                money: sequelize.literal(`money - ${success.bid}`),
            }, {
                where: { id: success.UserId },
            });
        });

        const unSold = await Good.findAll({
            where: {
                SoldId: null,
                createdAt: { [Op.gt]: yesterday },
            }
        });

        unSold.forEach((target) => { // 위에서 찾은애들 낙찰 시켜줌.
            const end = new Date(unSold.createdAt);
            end.setDate(end.getDate()+1);
            schedule.scheduleJob(end, async () => {
                const success = await Auction.findOne({
                    where: { GoodId: target.id },
                    order: [['bid', 'DESC']],
                });
                await Good.update({ SoldId: success.UserId }, { where: { id: target.id } });
                await User.update({
                    money: sequelize.literal(`money - ${success.bid}`),
                }, {
                    where: { id: success.UserId },
                });
            })

        });

    } catch (error) {
        console.error(error);
    }
};