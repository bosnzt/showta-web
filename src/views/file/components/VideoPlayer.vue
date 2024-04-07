<template>
  <div id="videoplayer"></div>
  <div class="player-icons">
    <el-tooltip content="PotPlayer" placement="top" effect="light">
      <svg-icon icon="potplayer" />
    </el-tooltip>
    <el-tooltip content="Infuse" placement="top" effect="light">
      <svg-icon icon="infuse" />
    </el-tooltip>
    <el-tooltip content="MX Player" placement="top" effect="light">
      <svg-icon icon="mxplayer" />
    </el-tooltip>
    <el-tooltip content="nPlayer" placement="top" effect="light">
      <svg-icon icon="nplayer" />
    </el-tooltip>
    <el-tooltip content="VLC" placement="top" effect="light">
      <svg-icon icon="vlc" />
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import Artplayer from "artplayer"
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

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