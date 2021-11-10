const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const User = require('../models/User')
const Referal = require('../models/Referal')
const Payment = require('../models/Payment')
const Strategy = require('../models/Strategy')
const UserStrategy = require('../models/UserStrategy')
const BinanceKeys = require('../models/BinanceKeys')
const router = Router()

// /api/auth/getUsers
router.post(
    '/getUserData', async (req, res) => {
      try {
        const {id} = req.body
        const user = await User.findOne({ "_id": id })
        if (!user) {
          return res.status(400).json({ result: "error", message: 'Пользователь не найден' })
        }
        const keys = await BinanceKeys.findOne({ "creatorId": id })
        if (!keys) {
          return res.status(200).json({ result: "success", userData: user, keyData: null, message: '' })
        }
        else return res.status(200).json({ result: "success", userData: user, keyData: keys, message: '' })
        //res.json({ name: user.name, _id: user._id, binanceId: user.binanceId, email: user.email })
      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
    })
router.post(
    '/updateBinanceKeys', async (req, res) => {
      try {
        const {id, binanceApiKey, binanceSecret} = req.body
        const keys = await BinanceKeys.findOne({ "creatorId": id })
        if (!keys) {
          const keysCreate = new BinanceKeys({ creatorId: id, binanceApiKey: binanceApiKey, binanceSecret: binanceSecret})
          await keysCreate.save()
          return res.status(200).json({ result: "success", message: 'ключи созданы' })
        }
        else{
          const keysUpdate = await BinanceKeys.updateOne({ creatorId: id}, {binanceApiKey, binanceSecret})
          return res.status(200).json({ result: "success", message: 'ключи обновлены' })
        }
      } catch (e) {
        //console.log(e)
        //console.log(req.body)
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
    })
router.post('/getUsers', async (req, res) => {
  try {
    const { id } = req.body

    const user = await User.findOne({ "_id": id })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const users = await User.find({})

    if (!users) {
      return res.status(400).json({ message: 'Ошибка при запросе пользователей' })
    }

    res.json({ users })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
router.post('/sendUserEmail', async (req, res) => {
  try {
    let mailer = require('nodemailer')
    let smtpTransport = require('nodemailer-smtp-transport')

    let options = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "no.reply.botmarket24@gmail.com",
        pass: "KIT123red@"
      }
    }

    let transport = mailer.createTransport(options)

    let mail = {
      from: 'no.reply.botmarket24@gmail.com',
      to: 'mql4.coder@mail.ru',
      subject: "Уведомление системы безопастности",
      html: `<div>
        <div style="display: flex; margin:0 auto; width:70%;background:#1b203a;color:#fbfeff; justify-content: center; align-items: center;flex-direction:column;border-radius:15px;">
          <div style="background:#272b4a; padding:35px; display: flex;justify-content: center; align-items: center;flex-direction:column;">
            <h1 style="color:#fd2f59;">Здравствуйте</h1>
            <h3>Вы можете сбросить пароль от <strong style="text-decoration:underline;">Botmarket24.online</strong>, нажав кнопку ниже.<br /> Если вы не запрашивали новый пароль, пожалуйста, игнорируйте это письмо.</h3>
            <a style="background:#139a5c; padding:15px 35px;outline:none; border:1px solid black; color:#fbfeff;text-decoration:none; cursor:pointer;">Сбросить пароль</a>
          </div>
        </div>
      </div>`
    }

    transport.sendMail(mail, (error, response) => {
      transport.close()
      if (error) {
        console.log(error)
        res.status(400).json({ error });
      } else {
        res.status(200).json({ response: 'Mail sent.' });
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
// /api/auth/getUser
router.post('/getUser', async (req, res) => {
  try {
    const { id } = req.body

    const user = await User.findOne({ "_id": id }).lean().exec()

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    user.password = ""
    const referal = await Referal.find({ "refL": user._id }).lean().exec()
    const payment = await Payment.find({ "payer": user._id }).lean().exec()
    const strategys = await UserStrategy.find({ "user_id": user._id }).lean().exec()
    let r_payment = 0
    let u_payment = 0
    let r_cnt = 0;
    let s_arr = []
    for (const item of strategys) {
      const strategy = await Strategy.findOne({ "_id": item.strategy_id }).lean().exec()
      if (strategy) s_arr.push(strategy)
    }
    payment.forEach(element => {
      if (element.status === "success") u_payment += element.amount
    })
    for (const element of referal) {
      r_cnt++
      const payments = await Payment.find({ "payer": element.refOn }).lean().exec()
      payments.forEach(element2 => {
        if (element2.status === "success") r_payment += element2.amount
      })
    }
    res.json({ user, u_payment, r_cnt, r_payment, s_arr })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
// /api/auth/updateUser
router.post('/updateUser', async (req, res) => {
  try {
    const { id } = req.body

    const user = await User.findOne({ "_id": id })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    user.password = ""
    res.json({ user })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
router.post('/getAllReferals', async (req, res) => {
  try {
    const { id } = req.body
    const user = await User.findOne({ "_id": id }).lean().exec()
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    const referal = await Referal.find({ "refL": id }).lean().exec()

    if (!referal) {
      return res.status(200).json({ referals: [] })
    }
    let r_cnt = 0
    let r_payment = 0
    for (const element of referal) {
      r_cnt++
      const payments = await Payment.find({ "payer": element.refOn }).lean().exec()
      payments.forEach(element2 => {
        if (element2.status === "success") r_payment += element2.amount
      })
    }
    let r_arr = []
    for (const element of referal) {
      const users = await User.findOne({ "_id": element.refOn }).lean().exec()
      if (users) r_arr.push(users)

    }
    res.json({ referals: r_arr, r_cnt, r_payment, refpayout: user.refpayout })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
// /api/auth/deleteUser
router.post('/deleteUser', async (req, res) => {
  try {
    const { id } = req.body

    const user = await User.findOne({ "_id": id })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    const deletes = await User.deleteOne({ "_id": id })
    const deletes2 = await UserStrategy.deleteMany({ "user_id": id })
    const users = await User.find({})
    res.json({ users })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
module.exports = router