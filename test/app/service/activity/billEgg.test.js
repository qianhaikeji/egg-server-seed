const { app, assert, mock } = require('egg-mock/bootstrap')

describe('test/service/activity/billEgg', () => {
  before(() => {
    // const ctx = app.mockContext()
    // await ctx.service.activity.billEgg.addBillEgg({
    //   name: 'teset',
    //   budget: 100,
    //   password: 'admin123'
    // })
  })

  // afterEach(() => {
  //   // 创建当前应用的 app 实例
  //   const ctx = app.mockContext()
  //   ctx.model.User.destroy({truncate: true})
  // })

  // it('trigger bill egg', async () => {
  //   const ctx = app.mockContext()
  //   const bill = await ctx.service.finance.bill.syncBillFromRelay({
  //     hash: '1231231122222xxxxxx',
  //     account_id: '1231231',
  //     client_order_id: '1231231',
  //     size: 100,
  //     volume: 10,
  //     price: 0.1,
  //     filled_size: 10,
  //     filled_volume: 1,
  //     valid_since: 1111,
  //     valid_until: 111,
  //     created_at: 1576830221575,
  //     side: 1,
  //     market: 'eth0-eth1',
  //     address: '11111sdfdfs1111'
  //   })
  // })

  // it('calc prize money', async () => {
  //   const ctx = app.mockContext()
    
  //   while (true) {
  //     let money = await ctx.service.activity.billEgg.calcEggPrizeMoney({
  //       moneyRule: [{"rate": 0.3, "maxPrize": 10}, {"rate": 0.7, "maxPrize": 20}],
  //       budget: 1000,
  //       expend: 0,
  
  //     })
  //     console.log(money)
  //   }
  // })

  // it('test', async () => {
  //   const ctx = app.mockContext()
    
  //   await ctx.service.activity.billEgg.test()
  // })
})