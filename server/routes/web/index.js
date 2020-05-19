module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')

  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新闻分类',
    })
    const cats = await Category.find()
      .where({
        parent,
      })
      .lean()
    const newsTitles = [
      'UI改造日志第四期：背包系统优化在即，局内快捷消息更智能！',
      '《五虎上将交响曲》揭秘，一起来看看你的音乐公开课随堂笔记吧！',
      '0元免流畅玩包，轻轻松松上王者',
      '王者荣耀联合乘车码送豪华大礼，五五开黑不氪金！',
      '五虎有灵，音乐发声，王者荣耀音乐公开课来啦！',
      '5月18日体验服停机更新公告',
      '未成年人防沉迷新规接入公告',
      '5月15日全服不停机优化公告',
      '5月13日“演员”惩罚名单',
      '5月13日外挂专项打击公告',
      '峡谷迎初夏，好礼领不停',
      '黄忠-烈魂五虎上将限定皮肤即将上架，缤纷好礼齐降临',
      '“五五打卡游”活动开启',
      '与我为伍，彼此守护，活动专属皮肤&amp;五五局内表现获取全攻略',
      '五五开黑节，赵云-龙胆即将上架，多重福利来袭',
      '虎牙明星主播踢馆名校战队，峡谷高材生与学霸的荣耀对决',
      '2020年KPL春季赛常规赛最佳阵容及最佳选手评选方式公布',
      '2020年KPL春季赛季后赛赛程赛制公布，5月28日16:00热血开战',
      '【原创内容大赛音乐比赛】优秀作品合集（二）',
      '大众赛事合作赛道全面开启，携手合作伙伴共建王者电竞生态',
    ]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        title,
        categories: randomCats.slice(0, 2),
      }
    })
    await Article.deleteMany({})
    await Article.insertMany({ newsList })
    res.send(newsList)
  })

  router.get('/news/list', async (req, res) => {
    /* const parent = await Category.findOne({
      name: '新闻分类'
    }).populate({
      path: 'children',
      populate: {
        path: 'newsList'
      }
    }).lean() */
    const parent = await Category.findOne({
      name: '新闻分类',
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList',
        },
      },
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] },
        },
      },
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find()
        .where({
          categories: { $in: subCats },
        })
        .populate('categories')
        .limit(5)
        .lean(),
    })
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName =
          cat.name === '热门' ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })

  app.use('/web/api', router)
}
