import { Router } from 'express'
import { AdminController } from './controllers/admin'
import { AuthController } from './controllers/auth'
import { ScanlatorController } from './controllers/scanlator'
import { upload } from './configs/multer'
import { MangaController } from './controllers/manga'
import { Auth as authMiddleware } from './middlewares/auth'
const router = Router()

const admin = new AdminController()
const auth = new AuthController()
const scanlator = new ScanlatorController()
const manga = new MangaController()

const adminRouter = Router()
const scanlatorRouter = Router()
const mangaRouter = Router()
const authRouter = Router()

adminRouter.post("/scanlator", upload.single('logo'), admin.createScanlator)
adminRouter.post("/manga", admin.createManga)

authRouter.post("/google/callback", auth.googleOAuth)
authRouter.get("/me", authMiddleware ,auth.me)

scanlatorRouter.get("/", scanlator.getAllScans)

mangaRouter.get("/", manga.getAllMangas)
mangaRouter.get("/:mal_id", manga.getMangaByMalId)
mangaRouter.get("/:name", manga.getMangaByName)


router.use("/admin", adminRouter)
router.use("/scanlator", scanlatorRouter)
router.use("/manga", mangaRouter)
router.use("/auth", authRouter)


export default router