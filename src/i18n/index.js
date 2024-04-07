import { createI18n } from 'vue-i18n'
import EN from './en/meta'

const messages = {
  en: {
    ...EN
  },
}

const defaultLang = 'en'

const langMap = {}
for (const code in messages) {
  if (messages[code].lang) {
    langMap[code] = messages[code].lang
  }
}

const getCurrentLanguage = () => {
  const storeLang = localStorage.getItem('lang')
  if (storeLang && messages[storeLang]) {
    return storeLang
  }

  const UAlang = navigator.language // zh-CN
  let langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : defaultLang
  if (!messages[langCode]) {
    langCode = defaultLang
  }
  
  localStorage.setItem('lang', langCode)
  return langCode
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getCurrentLanguage(),
  messages: messages
})

export {i18n, defaultLang, langMap}
