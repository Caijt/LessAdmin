<template>
  <common-dialog ref="dialog" title="领用记录明细列表" :in-dialog="inDialog" width="950px">
    <list ref="list" >
      <slot name="table" slot="table"></slot>
    </list>
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
  </common-dialog>
</template>
<script>
import commonDialog from "@/components/common/dialog";
import list from "./itemList";
import listDialogMixins from "@/mixins/listDialog";
export default {
  components: { commonDialog, list },
  mixins: [listDialogMixins]
};
</script>