const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('order').add({
      data: {
        user_id: event.user_id,
        res_id: event.res_id,
        user_name: event.user_name,
        phone: event.phone,
        order: event.order,
        billmoney: event.billmoney,
        destination: event.destination,
        condition: 1,
        cook: false,
        money: 2,
        date: event.date,
        resname: event.resname,
        image: event.image,
        tname: event.tname,
      }
    })
}