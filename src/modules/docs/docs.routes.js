import { Router } from "express";
import fs from "fs"
import path from "path"
import yaml from "js-yaml"

const docRouter = Router()

docRouter.get("/", (req, res, next) => {
    try {
        const filePath = path.join(
            process.cwd(),
            "src",
            "modules",
            "docs",
            "docs.yaml"
        )

        const file = fs.readFileSync(filePath, "utf8")
        const doc = yaml.load(file)

        res.setHeader("Content-Type", "application/yaml")
        res.send(yaml.dump(doc))
    } catch (err) {
        next(err)
    }
})

export default docRouter