export default {
  lang: 'English',
  login: {
    title: 'Login to the ',
    phUsername: 'username',
    phPassword: 'password',
    tipForgot: 'Forgot password?',
    btnLogin: 'Login',
    btnClear: 'Clear',
    btnView: 'Browse as a guest',
    ruleUsername: 'Username cannot be empty',
    rulePassword: 'Password cannot be empty',
  },
  file: {
    lbSearch: 'Search',
    titSearch: 'Search',
    searchOptionsAll: 'All',
    searchOptionsFile: 'File',
    searchOptionsFolder: 'Folder',
    tipSearchEmpty: 'The result is empty',
    lbHome: 'Home',
    tipEmpty: 'Empty Directory',
    lbCopyRight: 'Powered by ShowTa',
    lbAdmin: 'Admin',
    btnCopyLink: 'Copy link',
    btnDownload: 'Download',
    msgCopy: 'copy success',
    lbAccessPwd: 'Please enter access password',
    phAccessPwd: 'Access password',
    tipHaveAccount: 'Already have an account?',
    lbSignin: 'Sign in',
    lbPdfLoad: 'PDF loading',
    lbPdfPages: '#replace page(s)',
    lbPdfShowAll: 'Show all pages',
    tipPdfHelp: 'Supports flipping pages using ← →',
    msgExcelErr: 'Excel read failed',
    msgVideoErr: 'Unsupported playback format: ',
  },
  home: {
    lbUsername: 'Username',
    lbRole: 'Role',
    lbLoginIp: 'Login Ip',
    lbLoginTime: 'Login Time',
    tagAdmin: 'admin',
    tagUser: 'general',
    tagGuest: 'guest',
    btnChangePwd: 'Change Password',
    tipChangePwd: 'Please enter a new login password',
    prPassword: 'Please enter password',
  },
  site: {
    lbTitle: 'Site title',
    lbLogo: 'Site logo',
    lbFavicon: 'Favicon.ico',
    lbDomain: 'Site domain',
    tipDomain: 'Default is empty; To enable HTTPS, configure config.ini; Example: http://www.demo.com',
    lbNotice: 'Site notice',
    tipNotice: 'Pop up notification in the upper right corner of the cloud disk homepage, supporting markdown',
    lbSignExpire: 'File Link Expiration',
    lbHour: 'hour(s)',
    lbSign: 'All Files Signed',
    swYes: 'Yes',
    swNo: 'No',
  },
  display: {
    lbVideo: 'Preview video',
    lbPicture: 'Preview picture',
    lbText: 'Preview text',
    lbAudio: 'Preview audio',
    lbSelectAll: 'Select all',
    lbOffice: 'Preview Office',
    officeOptLocal: 'Local preview',
    officeOptMS: 'MS Office Preview',
    tipOffice: 'Local preview only supports docx and xlsx format; MS Office preview requires domain name access, port 80 or 443, and external network access.',
  },
  storage: {
    phFilter: 'Filter by storage type',
    lbStatus: 'Status',
    statework: 'work',
    statedisabled: 'disabled',
    stateerror: 'error',
    lbEngineType: 'Storage Type',
    phEngineType: 'Choose storage type',
    prEngineType: 'Choose a storage type',
    lbMountPath: 'Mount Path',
    tipMountPath: 'The path for mounting, cannot be duplicated, example: ',
    prMountPath: 'Mount path cannot be empty',
    lbRemark: 'Remark',
    prChoose: 'Choose',
    ruleMustRender: 'Required: ',
    ruleMustChoose: 'Required: ',
  },
  folder: {
    phSelectDir: 'Please choose or input folder path',
    tagRead: 'read',
    tagWrite: 'write',
    tagTop: 'top',
    tagBottom: 'bottom',
    btnSelectDir: 'Select Folder',
    lbTopAnnouncement: 'Top Announcement',
    phAnnouncement: 'Render a Markdown text or Markdown url link',
    tipTopAnnouncement: 'Display priority: The backend top announcement > top.md file in the directory',
    lbBottomAnnouncement: 'Bottom Announcement',
    tipBottomAnnouncement: 'Display priority: The backend bottom announcement > readme.md file in the directory',
    ruleFolder: 'Folder path cannot be empty',
  },
  user: {
    swEnabled: 'Enabled',
    swDisabled: 'Disabled',
    msgEnable: 'enable',
    msgDisable: 'disable',
    msgSwitch: 'Are you sure want to #action #user?',
    titleEditUser: 'Edit user',
    titleAddUser: 'Add user',
    lbPassword: 'Password',
    lbEnable: 'Enable',
    swYes: 'Yes',
    swNo: 'No',
    lbPerm: 'Permission',
    permFileCreate: 'File create or upload',
    permFileDelete: 'File delete',
    permFileRename: 'File rename',
    permFileMove: 'File move',
    permFileCopy: 'File copy',
    permWebdavRead: 'Webdav read',
    ruleUsername: 'Username cannot be empty',
  },
  btn: {
    add: 'Add',
    edit: 'Edit',
    modify: 'Modify',
    delete: 'Delete',
    save: 'Save',
    confirm: 'Confirm',
    cancel: 'Cancel',
    disable: 'Disable',
    enable: 'Enable',
  },
  msg: {
    addSuccess: 'add success',
    updateSuccess: 'update success',
    modifySuccess: 'change success',
    saveSuccess: 'save success',
    deleteSuccess: 'delete success',
  },
  dialog: {
    warn: 'warn',
    actEnable: 'enable',
    actDisable: 'disable',
    swConfirmTitle: 'Are you sure want to #action [#replace]?',
    delConfirmTitle: 'Are you sure want to delete [#replace]?',
  },
  table: {
    username: 'Username',
    role: 'Role',
    status: 'Status',
    updateTime: 'Update Time',
    operation: 'Operations',
    dirPath: 'Folder Path',
    readWrite: 'Read & Write',
    accessPwd: 'Access Password',
    tipApplySub: 'Apply to subfolders',
    announcement: 'Announcement',
    name: 'Name',
    modified: 'Modified',
    size: 'Size',
  },
  resp: {
    errTokenExpired: 'Token is expired',
    errTokenInvalid: 'Invalid token',
    errAuthAccount: 'Account or password error',
    errAccessPwd: 'Access password error',
  },
}
