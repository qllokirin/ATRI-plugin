import { segment } from "oicq";
import plugin from '../../../lib/plugins/plugin.js'
import { createRequire } from 'module'
import fetch from "node-fetch";
const require = createRequire(import.meta.url)
const { exec, execSync } = require('child_process')
const _path = process.cwd()
var fs = require('fs');
//返回时间大约在10多秒左右
//v2.0新增 使用免费翻译api 已经生成的语音会直接发送 无需等待
//效果：atri说xxx 会就发语音
//参照乐佬的upate.js一顿cv  cv yyds


export class atri extends plugin {
    constructor() {
        super(
            {
                name: 'ATRI说',
                dsc: 'https://github.com/70loKirin/ATRI-plugin',
                event: 'message',
                priority: '50',
                rule: [
                    {
                        reg: '^atri说(.*)',
                        fnc: 'atri',
                    }
                ]
            }
        )
    }
    async execSync(cmd) {
        return new Promise((resolve, reject) => {
            exec(cmd, { windowsHide: true }, (error, stdout, stderr) => {
                resolve({ error, stdout, stderr })
            })
        })
    }

    async atri(e) {
        let msg = e.msg.replace("atri说", "")
        //剔除空格但可以使用标点
        msg = msg.replaceAll(" ", "")
        console.log(msg)

        //遍历output文件下之前生成过的语音
        let path = `./plugins/ATRI-plugin/resources/MoeTTS/output`
        let name = fs.readdirSync(path)
        console.log(name)
        for (var i = 0; i < name.length; i++) {
            if (msg == name[i]) {
                console.log("有已经生成的语音，直接发送")
                await this.e.reply(segment.record(`./plugins/ATRI-plugin/resources/MoeTTS/output/${msg}/output_1.wav`))
                return true
            }
        }

        //之前未生成过的话就再生成一次
        let url = `http://www.iinside.cn:7001/api_req?reqmode=nmt_mt5_jez&password=3652&text=${msg}&order=zh2ja`
        const response = await fetch(url)   //调用接口获取数据
        let res = await response.json()     //结果json字符串转对象
        console.log(res)
        let tans = res.data
        console.log("正在生成语音，请稍等")
        this.e.reply("请等等我~");
        let cm = `python ./plugins/ATRI-plugin/resources/MoeTTS/main.py -tt2ck ./plugins/ATRI-plugin/resources/MoeTTS/models/atri_v2_40000.pt -hgck ./plugins/ATRI-plugin/resources/MoeTTS/models/g_atri_hifigan_02510000.pt -hgc ./plugins/ATRI-plugin/resources/MoeTTS/models/config.json -i ${tans}. -o ./plugins/ATRI-plugin/resources/MoeTTS/output/${msg}/ -p basic_cleaners`
        let ret = await this.execSync(cm)
        if (ret.error == null) {
            console.log("语音生成成功")
        }
        else {
            console.log(ret)
            logger.error("语音生成失败")
            this.e.reply("语音生成失败,请到控制台查看报错信息")
            return false
        }
        await this.e.reply(segment.record(`./plugins/ATRI-plugin/resources/MoeTTS/output/${msg}/output_1.wav`))
        return true
    }
}