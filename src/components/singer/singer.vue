<template>
    <div class="singer" ref="singer">
      <list-view :data="singers"></list-view>
    </div>
</template>

<script type="text/ecmascript-6">
import { getSingerList } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import Singer from '../../common/js/singer'
import ListView from '../../base/list-view/list-view'
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  name: 'singer',
  components: {
    ListView
  },
  data() {
    return {
      singers: []
    }
  },
  mounted() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          if (res.data.list.length > 0) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })

      // 排序
      let hot = []
      let ret = []
      for (let key in map) {
        if (map[key].title.match(/[a-zA-Z]/)) {
          ret.push(map[key])
        } else if (map[key].title === HOT_NAME) {
          hot.push(map[key])
        }
      }
      // 字母排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
