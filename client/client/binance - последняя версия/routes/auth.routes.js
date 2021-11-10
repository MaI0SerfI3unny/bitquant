const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const User = require('../models/User')
const csv = require('csv-parser')
const fs = require('fs')
const router = Router()


// /api/auth/register
router.post(
  '/register',async (req, res) => {
  try {
    const {email, password, binanceId, name} = req.body
    const candidate = await User.findOne({ email })
    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }
    let results = []
    await fs.createReadStream('user-data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          // console.log(results);
          if(results){
            let found = false
            for(let el of results){
              if(el["User ID"]===binanceId){
                found = true
                break
              }
            }
            if(found) {
              const hashedPassword = await bcrypt.hash(password, 12)
              const user = new User({email, password: hashedPassword, binanceId: binanceId, name: name})
              await user.save()
              res.status(201).json({message: 'Пользователь создан'})
            }
            else{
              res.status(400).json({message: 'Binance ID Error. Зарегистрироваться могут только наши партнеры'})
            }
          }
          //res.status(201).json({ message: results })
        });
    // if(results){
    //   for(let el of results){
    //     if(el["User ID"]===binanceId){
    //       const hashedPassword = await bcrypt.hash(password, 12)
    //       const user = new User({ email, password: hashedPassword, binanceId: binanceId, name: name})
    //       await user.save()
    //       res.status(201).json({ message: 'Пользователь создан' })
    //       break
    //     }
    //   }
    // }
    // else{
    //   res.status(400).json({ message: 'Binance ID Error' })
    // }
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// /api/auth/login
router.post(
  '/login', async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }
    res.json({ name: user.name, _id: user._id, binanceId: user.binanceId, email: user.email })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
router.post(
    '/login_check', async (req, res) => {
      try {

        const {email, token} = req.body

        const user = await User.findOne({ email })

        if (!user) {
          return res.status(400).json({ message: 'Пользователь не найден' })
        }

        const isMatch = token==user.password

        if (!isMatch) {
          return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
        }

        res.json({ token: user.password, userId: user._id, role: user.role, email: user.email })

      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
    })
function selfRandom(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
router.post(
  '/startrecovery', async (req, res) => {
  try {

    const {email} = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    let secret = "" //selfRandom(1000, 9999).toString()
    let mails = ""
    const r = await Recovery.findOne({ email })
    if (!r) {
      secret = selfRandom(1000, 9999).toString()
      mails = email
      const recovery = new Recovery({secret, email})
      await recovery.save()
    }
    else{
      secret = r.secret
      mails = r.email
    }
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
      to: mails,
      subject: "Уведомление системы безопастности",
      html: `<div>
        <div style="display: flex; margin:0 auto; width:70%;background:#1b203a;color:#fbfeff; justify-content: center; align-items: center;flex-direction:column;border-radius:15px;">
          <div style="background:#272b4a; padding:35px; display: flex;justify-content: center; align-items: center;flex-direction:column;">
            <h1 style="color:#fd2f59;">Здравствуйте</h1>
            <h3>Вы можете сбросить пароль от <strong style="text-decoration:underline;">Botmarket24.online</strong>, введя код ${secret}.<br /> Если вы не запрашивали сброс пароля, пожалуйста, игнорируйте это письмо.</h3>
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
        res.status(200).json({ response: 'success' });
      }
    })   
    
    
    //res.json(secret)

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
router.post(
  '/recovery', async (req, res) => {
  try {

    const {email, secret, password} = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    const r = await Recovery.findOne({ email })
    if (!r) {
      return res.status(400).json({ message: 'Непредвиденная ошибка. Попробуйте снова' })
    }
    if(r.secret!==secret)return res.status(400).json({ message: 'Неверный проверочный код из письма' })
    const dr = await Recovery.deleteOne({ email })   
    const hashedPassword = await bcrypt.hash(password, 12)
    const useru = await User.updateOne({email},{ $set: {"password": hashedPassword}}).lean().exec()
   
    res.status(201).json({ message: 'Пароль успешно изменен' })    
    
    
    //res.json(secret)

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
module.exports = router
