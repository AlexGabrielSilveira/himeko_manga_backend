const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post("/login", async(req, res) => {
    const {email, password} = req.body

    const credentialsCheck = {
        password: password == null || password == undefined || !password,
        email: email == null || email == undefined || !email,
    }

    if(credentialsCheck.password || credentialsCheck.email) {
        return res.status(422).json({msg: "Suas credencias não foram enviadas corretamente, verifique!"})
    }
    const user = await User.findOne({where: {email: email} })
    if(!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!"})
    }

    const decodePassword = await bcrypt.compare(password, user.password)
    if(!decodePassword) {
        return res.status(422).json({ msg: "Senha incorreta!"})
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({
            id:user._id
        }, secret)

        res.status(200).json({msg: "Usuário autenticado!", token})
    }catch(err) {
        console.log(err)
    }

})
router.post("/register", async(req, res) => {
    const { username, password, email} = req.body

    const credentialsCheck = {
        username: username == null || username == undefined || !username,
        password: password == null || password == undefined || !password,
        email: email == null || email == undefined || !email,
    }

    if(credentialsCheck.username || credentialsCheck.password || credentialsCheck.email) {
        return res.status(422).json({msg: "Suas credencias não foram enviadas corretamente, verifique!"})
    }
    const userExists = await User.findOne({where: {email: email} })
    if(userExists) {
        return res.status(422).json({ msg: "esse e-mail já está cadastrado em nosso banco de dados!"})
    }

    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

    User.create({ username, email, password: hashPassword, roles: "user"})

    res.status(200).json({msg: "Registrado com sucesso!"})
})


module.exports = router