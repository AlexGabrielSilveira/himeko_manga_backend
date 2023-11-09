import { Router } from 'express'
import { AdminController } from './controllers/admin'
import { AuthController } from './controllers/auth'
import { ScanlatorController } from './controllers/scanlator'
import { upload } from './configs/multer'
const router = Router()

const admin = new AdminController()
const auth = new AuthController()
const scanlator = new ScanlatorController()

const adminScanlatorRouter = Router()

adminScanlatorRouter.post("/", upload.single('logo'), admin.createScanlator)

router.use("/auth/login", auth.login)
router.use("/auth/register", auth.register)
router.use("/admin/scanlator", adminScanlatorRouter)
router.use("/scanlator", scanlator.getAllScans)


export default router