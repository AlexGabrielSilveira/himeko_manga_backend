import { Router } from 'express'
import { AdminController } from './controllers/admin'
import { AuthController } from './controllers/auth'
import { ScanlatorController } from './controllers/scanlator'
import { upload } from './configs/multer'
import { MangaController } from './controllers/manga'
import { Auth as authMiddleware } from './middlewares/auth'
import { hasRole } from './middlewares/hasRole'
import { errorHandler } from './middlewares/error_handler'
const router = Router()

const admin = new AdminController()
const auth = new AuthController()
const scanlator = new ScanlatorController()
const manga = new MangaController()

const adminRouter = Router()
const scanlatorRouter = Router()
const mangaRouter = Router()
const authRouter = Router()

adminRouter.use(hasRole('admin'))

adminRouter.post("/scanlator", upload.single('logo'), admin.createScanlator)
adminRouter.post("/manga", admin.createManga)
adminRouter.post("/manga/:mangaId/chapter/:chapterNumber", upload.array('pagesSrc'), admin.createChapter)

authRouter.post("/google/callback", auth.googleOAuth)
authRouter.get("/me", authMiddleware ,auth.me)

scanlatorRouter.get("/", scanlator.getAllScans)

mangaRouter.get("/", manga.getAllMangas)
mangaRouter.get("/:mangaId", manga.getMangaById)
mangaRouter.get("/search/:name", manga.getMangaByName)
mangaRouter.get("/:mangaId/chapters", manga.getChaptersByMangaId)
mangaRouter.get("/:mangaId/chapters/:chapterNumber", manga.getChapterPages)


router.use("/admin", authMiddleware, adminRouter)
router.use("/scanlator", scanlatorRouter)
router.use("/manga", mangaRouter)
router.use("/auth", authRouter)

router.use(errorHandler)
export default router