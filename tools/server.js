import express from 'express'
import path from 'path'

import paths from './paths'

const app = express()
const port = process.env.PORT || 3001

app.use(express.static(paths.appBuild))

app.get('/*', (req, res) => {
    res.sendFile(path.join(paths.appBuild, 'index.html'))
})

app.listen(port, () => console.log('\nHttp Server is running...'))
