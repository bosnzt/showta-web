<template>
  <div id="videoplayer"></div>
  <div class="player-icons">
    <div @click="switchPlayer('potplayer')">
      <el-tooltip content="PotPlayer" placement="top" effect="light">
        <svg-icon icon="potplayer" />
      </el-tooltip>
    </div>
    <div @click="switchPlayer('infuse')">
      <el-tooltip content="Infuse" placement="top" effect="light">
        <svg-icon icon="infuse" />
      </el-tooltip>
    </div>
    <div @click="switchPlayer('mxplayer')">
      <el-tooltip content="MX Player" placement="top" effect="light">
        <svg-icon icon="mxplayer" />
      </el-tooltip>
    </div>
    <div @click="switchPlayer('nplayer')">
      <el-tooltip content="nPlayer" placement="top" effect="light">
        <svg-icon icon="nplayer" />
      </el-tooltip>
    </div>
    <div @click="switchPlayer('vlc')">
      <el-tooltip content="VLC" placement="top" effect="light">
        <svg-icon icon="vlc" />
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import Artplayer from "artplayer"
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import mpegts from 'mpegts.js'
import Hls from 'hls.js'

const i18n = useI18n()
const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const playFlv = (video, url, art) => {
  if (!mpegts.isSupported()) {
    art.notice.show = i18n.t('file.msgVideoErr')+'flv'
    return
  }

  const player = mpegts.createPlayer({
    type: 'flv',
    url: url,
  })
  player.attachMediaElement(video)
  player.load()
}

const playM3u8 = (video, url, art) => {
  if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy()
      const hls = new Hls()
      hls.loadSource(url)
      hls.attachMedia(video)
      art.hls = hls
      art.on('destroy', () => hls.destroy())
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url
  } else {
      art.notice.show = i18n.t('file.msgVideoErr')+'m3u8'
  }
}

let vp = null
let option = {
  airplay: true,
  aspectRatio: true,
  autoOrientation: true,
  container: '#videoplayer',
  fastForward: true,
  flip: true,
  fullscreen: true,
  fullscreenWeb: true,
  hotkey: true,
  lock: true,
  miniProgressBar: true,
  pip: true,
  playbackRate: true,
  setting: true,
  subtitleOffset: true,
  theme: '#BBAA07',
  url: "",
  moreVideoAttr: {
    'webkit-playsinline': true,
    playsInline: true,
  },
  customType: {
    flv: playFlv,
    m3u8: playM3u8,
  },
}

onMounted(() => {
  option.lang = i18n.locale.value==='zh'?'zh-cn':'en'
  option.url = props.video.url
  vp = new Artplayer(option)
})

onBeforeUnmount(()=> {
  if (vp && vp.destroy) {
    vp.destroy(false)
  }
})

const switchPlayer = (name) => {
  switch (name) {
    case 'potplayer':
      window.location = `potplayer://${props.video.url}`
      break
    case 'infuse':
      window.location = `infuse://x-callback-url/play?url=${props.video.url}`
      break
    case 'mxplayer':
      window.location = `intent:${props.video.url}#Intent;package=com.mxtech.videoplayer.ad;S.title=${props.video.name};end`
      break
    case 'nplayer':
      window.location = `nplayer-${props.video.url}`
      break
    case 'vlc':
      window.location = `vlc://${props.video.url}`
      break
  }
}
</script>

<style lang="scss" scoped>
#videoplayer {
  height: 60vh;
}

.player-icons {
  display:flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;

  svg {
    width: 1.75rem;
    height: 1.75rem;
    padding: 0.5rem;
    border-radius: $borderRadius;
    background-color: #F4FFFF;
    border: 1px solid #E9E9E9;

    &:hover {
      cursor: pointer;
      background-color: #E9E9E9;
    }
  }
}
</style>