<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="$t('folder.btnSelectDir')"
    :before-close="handleClose"
    class="select-dialog"
  >
    <el-tree
      :data="dataSource"
      highlight-current 
      :expand-on-click-node="false"  
      ref="eltreeRef"
      @node-click="onSelectNode"
      @node-expand="onExpandNode"
      node-key="path"
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" @click="handleConfirm">
          {{$t('btn.confirm')}}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref, nextTick} from 'vue'
import {subdir} from '@/api/file'

const props = defineProps({
  dialogVisible: {
    type: Boolean
  }
})
const eltreeRef = ref()
const dataSource = ref([
  {
    path: "/",
    label: 'root',
    children: [{}],
  },
])

const emits = defineEmits(['update:modelValue', "selectPath"])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = () => {
  handleClose()
}

const onSelectNode = (data) => {
  emits('selectPath', data.path)
}

const onExpandNode = async (data) => {
  data.children = []
  let dirs = await subdir({rpath:data.path})
  if (!dirs) {
    return
  }

  const newChild = []
  for (const val of dirs) {  
    newChild.push({
      path: val.path,
      label: val.name,
      children: [{}],
    })
  }

  eltreeRef.value.updateKeyChildren(data.path, newChild)
}

</script>

<style lang="scss" scoped>
:deep(.el-tree-node).is-current > .el-tree-node__content {
  background-color: #c2d6ea;
}

:deep(.el-tree-node__label) {
  font-size: 1rem;
}

:deep(.el-tree-node__expand-icon) {
  width: 1.5rem;
  height: 1.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}

</style>

<style lang="scss">
.select-dialog {
  border-radius: $borderRadius;
  width: 40%;
  min-width: 366px;
}

@media (min-width:600px) and (max-width:1000px) {
  .select-dialog {
    width: 58% !important;
  }
}

@media (max-width:600px) {
  .select-dialog {
    width: 98% !important;
  }
}
</style>
