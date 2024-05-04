export const isMdUrl = (fileName) => {
  const pattern = /^https?:\/\/.*\.md$/  
  return pattern.test(fileName)
}

export const formatFileSize = (row) => {
  if (row.is_folder) {
    return '-'
  }

  let bytes = row.size
  if (bytes < 1024) {  
    return bytes + " B";  
  } else if (bytes < 1048576) {  
    return (bytes / 1024).toFixed(2) + " KB";  
  } else if (bytes < 1073741824) {  
    return (bytes / 1048576).toFixed(2) + " MB";  
  } else {  
    return (bytes / 1073741824).toFixed(2) + " GB";  
  }  
}

const videoTypes = ["avi", "flv", "m3u8", "mkv", "mov", "mp4", "swf", "rmvb", "webm"]
const pictureTypes = ["bmp", "gif", "ico", "jpeg", "jpg", "png", "svg", "tiff", "webp"]
const textTypes = ["ass", "bat", "c", "conf", "cpp", "go", "h", "hpp", "htm", "html", "ini", "java", "js", "log", "lrc", "md", "pdf", "php", "py", "rs", "sh", "sql", "srt", "tsx", "txt", "vtt", "vue", "xml", "yaml", "yml"]
const audioTypes = ["flac", "m4a", "mp3", "ogg", "opus", "wav", "wma"]
const compressTypes = ["7z", "bz2", "gz", "rar", "tar", "zip"]
const excelTypes = ["csv", "xlam", "xls", "xlsb", "xlsm", "xlsx", "xlt", "xltm", "xltx"]
const wordTypes = ["doc", "docm", "docx", "dot", "dotm", "dotx"]
const pptTypes = ["ppt", "pptx"]

export const fileIcon = (row) => {
  if (row.is_folder) {
    return 'file-dir'
  }

  let arr = row.name.split('.')
  if (arr.length < 2) {
    return 'file-other'
  }
  
  let suffix = arr.pop().toLowerCase()
  if (suffix === 'pdf') {
    return 'file-pdf'
  } else if (wordTypes.includes(suffix)) {
    return 'file-word'
  } else if (excelTypes.includes(suffix)) {
    return 'file-excel'
  } else if (pptTypes.includes(suffix)) {
    return 'file-ppt'
  } else if (videoTypes.includes(suffix)) {
    return 'file-video'
  } else if (audioTypes.includes(suffix)) {
    return 'file-audio'
  }  else if (pictureTypes.includes(suffix)) {
    return 'file-pic'
  } else if (textTypes.includes(suffix)) {
    return 'file-text'
  } else if (compressTypes.includes(suffix)) {
    return 'file-comp'
  }

  return 'file-other'
}

export const isMarkdownFile = (fileinfo) => {
  return fileinfo.name.toLowerCase().endsWith('.md')
}

export const isPdfFile = (fileinfo) => {
  return fileinfo.name.toLowerCase().endsWith('.pdf')
}

export const isDocFile = (fileinfo) => {
  return fileinfo.name.toLowerCase().endsWith('.docx')
}

export const isXlsxFile = (fileinfo) => {
  return fileinfo.name.toLowerCase().endsWith('.xlsx')
}
