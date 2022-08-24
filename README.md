# ATRI-plugin

ATRI-plugin是一个可以合成atri（亚托莉）声音并发送语音的插件

> 配合[v3云崽](https://github.com/Le-niao/Yunzai-Bot)食用

~~arti！！！犯病中~~

**本人萌新，很多都是cv（~~cvyyds~~）**

**所以此插件配置会有亿点点麻烦，爱折腾的话速来**

返回需要十多秒时间，请耐心等待

---

# 强调

本插件使用了[MoeTTS](https://github.com/luoyily/MoeTTS/tree/main)仓库

此仓库写到不允许使用到**带有付费功能**的QQ机器人上，请大家遵循此协议

---

# python环境

我测试3.6、3.7、3.9，只有python3.7.3正常运行了，其他版本大家可以自行测试其他python版本

windows不管之前装没装过，再下一次**python3.7**就行了，我放个链接

> https://wwp.lanzoub.com/ioagG0a3xufc
> 密码:atri

这里借一张网图说明一下图中的√**一定要勾上**

![image](https://github.com/70loKirin/ATRI-plugin/blob/main/readme_/1.png)

# ffmpeg配置

* [点我下载ffmpeg](https://wwp.lanzoub.com/ifhhC091vp3a)解压之后放在一个之后不会移动的目录下
* 去`Yunzai-Bot\config\config\bot.yaml`里面填写路径

示例：(请复制自己的路径进行配置)

```
# ffmpeg
ffmpeg_path: D:\software\ffmpeg\bin\ffmpeg.exe
ffprobe_path: D:\software\ffmpeg\bin\ffprobe.exe
```

> linux可以输入`whereis ffmpeg`和`whereis ffprobe`找到ffmpeg的位置

# 安装

* 1.克隆项目+子模块更新

```
git clone --recurse-submodules https://github.com/70loKirin/ATRI-plugin.git ./plugins/ATRI-plugin/
```

* 2.配置MoeTTS项目

  * 下载models

    > 链接：https://pan.baidu.com/s/1sbKNoNJni1boOtoo2AnZ1A 
    > 提取码：atri

    解压出来把**models**文件夹放入`Yunzai-Bot\plugins\ATRI-plugin\resources\MoeTTS\`文件夹下

  * 进入MoeTTS文件夹下安装环境（在MoeTTS文件夹下打开终端也是一样的）

    ```
    cd plugins/ATRI-plugin/resources/MoeTTS/
    ```

  * 安装依赖

    ```
    pip install -r requirements.txt -i https://pypi
    .tuna.tsinghua.edu.cn/simple/
    ```
  
  * 测试
  
    ```
    python main.py -tt2ck ./models/atri_v2_40000.pt -hgck ./models/g_atri_hifigan_02510000.pt -hgc ./models/config.json -i 私は高性能です. -o output -p basic_cleaners
    ```
  
    如果在`Yunzai-Bot\plugins\ATRI-plugin\resources\MoeTTS\output`文件夹下出现`output_1.wav`则说明配置成功

# 配置百度翻译api

* 进入[官网](http://api.fanyi.baidu.com/manage/developer)注册登陆点击**通用翻译**
* 点击**立即使用**
* 再次进入[官网](http://api.fanyi.baidu.com/manage/developer)查看**APP ID**(appid)和**密钥**(key)
* 填到`Yunzai-Bot\plugins\ATRI-plugin\apps\atri.js`的50和51行

# 功能说明

发送**atri说xxx**则可返回指定语音，返回**较慢**，请耐心等待

# 免责声明

1. 功能仅限内部交流与小范围使用，请勿将Yunzai-Bot及ATRI-plugin用于以盈利为目的的场景
3. 图片与其他素材均来自于网络，仅供交流学习使用，如有侵权请联系，会立即删除
