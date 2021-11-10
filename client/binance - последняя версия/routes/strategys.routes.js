const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const Strategy = require('../models/Strategy')
const StrategySetting = require('../models/StrategySetting')
const UserStrategy = require('../models/UserStrategy')
const router = Router()

// /api/auth/getStrategys
router.post('/getStrategys',async (req, res) => {
  try {
    const {creator_id} = req.body
    const strategys = await Strategy.find()//{"creator_id": creator_id}
    if (!strategys) {
      return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
    }

    res.json({ strategys })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
router.post('/getStrategysSetting',async (req, res) => {
    try {
      const {strategy_id, user_id} = req.body
      const setting = await StrategySetting.findOne({"strategy_id": strategy_id, "user_id": user_id})
      if (!setting) {
        const strategys = await Strategy.findOne({"_id": strategy_id})
        if (!strategys) {
          return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
        }
        const create = new StrategySetting({
          user_id,
          strategy_id,
          parametrs: strategys,
        })
        await create.save()
        res.json({ strategys })
      }
      res.json({ strategys: setting.parametrs })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })
  router.post('/updateStrategysSetting',async (req, res) => {
    try {
      const {strategy, strategy_id, user_id} = req.body
      let strategys = await StrategySetting.updateOne(
        { "strategy_id" : strategy_id, "user_id": user_id },
        { $set: {"parametrs": strategy} }
      );
      if (!strategys) {
        return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
      }
  
      res.json({ strategy })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }) 
  router.post('/getStrategysById',async (req, res) => {
    try {
      const {strategyId} = req.body
      const strategys = await Strategy.findOne({"_id": strategyId})
      if (!strategys) {
        return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
      }
  
      res.json({ strategys })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })
  router.post('/updateStrategys',async (req, res) => {
    try {
      const {strategy} = req.body
      let strategys = await Strategy.updateOne(
        { "_id" : strategy._id },
        { $set: strategy }
      );
      if (!strategys) {
        return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
      }
  
      res.json({ strategy })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }) 
router.post('/getAllStrategys',async (req, res) => {
    try {
      const strategys = await Strategy.find()
      if (!strategys) {
        return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
      }
  
      res.json({ strategys })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })
  router.post('/getAllStrategys2',async (req, res) => {
    try {
      const strategy = await Strategy.find()
      if (!strategy) {
        return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
      }
      let strategys = []
      for (const item of strategy) {
        strategys.push({strategys: item, date: ""})
      }    
      res.json({strategys})
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }) 
router.post('/getAllUserStrategys',async (req, res) => {
    try {
      const {user_id} = req.body
      const strategy = await UserStrategy.find({"user_id": user_id}).lean().exec()
      if (!strategy) {
        return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
      }
      let strategys = []
      for (const item of strategy) {
        const strateg = await Strategy.findOne({ "_id": item.strategy_id }).lean().exec()
        if(strateg)strategys.push({strategys: strateg, date: item.date})
      }  
      res.json({ strategys })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
// router.post('/getUserStrategys',async (req, res) => {
//     try {
//       const {user_id} = req.body
//       const strategys = await UserStrategy.find({"user_id": user_id})
//       if (!strategys) {
//         return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
//       }
  
//       res.json({ strategys })
  
//     } catch (e) {
//       res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//     }
//   })
router.post('/createStrategys',async (req, res) => {
    try {
      const {strategy, creator_id} = req.body
      const f_strategys = await Strategy.findOne({"name": strategy.name})
      if (f_strategys) {
        return res.status(400).json({ message: 'Ошибка! Стратегия с таким именем уже существует' })
      }     
      const c_strategy = new Strategy(strategy)

      await c_strategy.save()
      const strategys = await Strategy.find()//{"creator_id": creator_id}
      if (!strategys) {
        return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
      }
  
      res.json({ strategys })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

  router.post('/addUserStrategys',async (req, res) => {
    try {
      const {strategy, user_id} = req.body    
      const u_strategy = new UserStrategy({user_id, strategy_id: strategy._id})
      await u_strategy.save()
      const strategys = await UserStrategy.find({"user_id": user_id})
      if (!strategys) {
        return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
      }
  
      res.json({ strategys })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })
router.post('/addUserStrategys2',async (req, res) => {
    try {
        const {strategy, user_id} = req.body
        const u_strategy = new UserStrategy({user_id, strategy_id: strategy.strategys._id})
        await u_strategy.save()
        const strategys = await UserStrategy.find({"user_id": user_id})
        if (!strategys) {
            return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
        }

        res.json({ strategys })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
  router.post('/deleteUserStrategys',async (req, res) => {
    try {
      const {strategy_id, user_id} = req.body    
      const deletes = await UserStrategy.deleteOne({user_id, strategy_id: strategy_id}) 
      const strategys = await Strategy.find()
      if (!strategys) {
        return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
      }
  
      res.json({ strategys })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })
  router.post('/deleteUserStrategys2',async (req, res) => {
    try {
      const {strategy_id, user_id} = req.body    
      const deletes = await UserStrategy.deleteOne({user_id, strategy_id: strategy_id}) 
      const strategy = await UserStrategy.find({"user_id": user_id}).lean().exec()
      if (!strategy) {
        return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
      }
      let strategys = []
      for (const item of strategy) {
        const strateg = await Strategy.findOne({ "_id": item.strategy_id }).lean().exec()
        if(strateg)strategys.push({strategys: strateg, date: item.date})
      }  
      res.json({ strategys })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })
  router.post('/deleteStrategys',async (req, res) => {
    try {
      const {creator_id, id} = req.body
      const deletes = await Strategy.deleteOne({"_id": id})
      const strategys = await Strategy.find()//{"creator_id": creator_id}
      if (!strategys) {
        return res.status(400).json({ message: 'Ошибка при запросе стратегий' })
      }
  
      res.json({ strategys })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

router.post('/getStrategyDefault',async (req, res) => {
    try {
        const strategy = {
            name: "test",
            series_type: 1,
            win_seriess: "false",
            take_profit: 100,
            stop_loss: 100,
            take_profit_global: 1000,
            stop_loss_global: 1000,
            stop_loss_stake_mult:"1.5,2",
            stop_loss_stake_mult_cnt:5,
            expire_m: 1,
            price: 0,
            creator_id: 0,
            bet: 0.35,
            max_bet: 10000,
            expire: 5,
            expire_t: "t",
            martin: "true",
            mult: 2.5,
            mstep: 5,
            mstart: 0,
            sstep: 2,
            smult: 3,
            martin_alt: "false",
            mult_alt: 2.5,
            mstep_alt: 10,
            mstep_colen_alt: 2,
            addbet: "false",
            stop_loss_cnt: 0,
            stop_loss_cnt_trade: 0,
            trade_type: "one trade"
        }   
      res.json({ strategy })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })
module.exports = router