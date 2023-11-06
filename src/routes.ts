import { Router } from 'express'
import { AdminController } from './controllers/admin'
import { AuthController } from './controllers/auth'
import { ScanlatorController } from './controllers/scanlator'
const router = Router()

const admin = new AdminController()
const auth = new AuthController()
const scanlator = new ScanlatorController()


router.use("/auth/login", auth.login)
router.use("/auth/register", auth.register)
router.use("/admin/scanlator", admin.createScanlator)
router.use("/", scanlator.getAllScans)


export default router