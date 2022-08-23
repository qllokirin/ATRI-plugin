import fs from 'node:fs'
import common from '../../lib/common/common.js'

const files = fs.readdirSync('./plugins/ATRI-plugin/apps').filter(file => file.endsWith('.js'))

let ret = []

files.forEach((file) => {
    ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
    let name = files[i].replace('.js', '')

    if (ret[i].status != 'fulfilled') {
        logger.error(`载入插件错误：${logger.red(name)}`)
        logger.error(ret[i].reason)
        continue
    }

    apps[name] = ret[i].value[name]
}

logger.info('--------------------')
logger.info('加载ATRI插件完成_v2.0')
logger.info('--------------------')

export { apps }