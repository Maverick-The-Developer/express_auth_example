import { Router, Request, Response } from "express";

const router = Router();

router.use(async (req: Request, res: Response, next) => {
  // middle ware
  const startTime = new Date().toLocaleTimeString()
  const startMilli = new Date().getMilliseconds()
  console.log(`========= BBS MIDDLEWARE Starts at ${startTime}.${startMilli} ========`)
  const delay = await new Promise((resolve) => setTimeout(() => resolve('done'), 1000))
  const endTime = new Date().toLocaleTimeString()
  const endMili = new Date().getMilliseconds()
  console.log(`========= BBS MIDDLEWARE End. at ${endTime}.${endMili} ========`)
  next()
})
// base path is /bbs
router.post("/", async (req: Request, res: Response) => {
  if (req.files) {
    const tempo = Object.entries(req.files).map(([key, value]) => {
      return { key, value }
    })
    for(const {key, value} of tempo) {
      console.log('fieldName:', key)
      console.log('file', value)
      console.log('========================================================================')
    }
  }
  console.log('========= FILES DONE ========')
  //
  const { title, content } = req.body
  console.log("🚀 ~ router.post ~ title:", title)
  console.log("🚀 ~ router.post ~ content:", content)
  console.log('========= JSON DONE ========')

  const newId = 0;
  res.status(200).json({ success: true, message: `created new post, id is ${newId}` })
})

router.get("/", async (req: Request, res: Response) => {
  const dataList:string[] = []
  res.status(200).json({ success: true, message: `get all posts`, list: dataList })
})

export default router