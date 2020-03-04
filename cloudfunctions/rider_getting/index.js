// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('order').doc(event.id)
    .update({
      data: {
        condition: 2,
        rid_id: event.rid_id
      }
    })
}