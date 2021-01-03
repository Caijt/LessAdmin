<template>
    <el-dialog
        class="c-dialog-fixed"
        title="合同项目列表"
        width="90%"
        :visible.sync="show"
        :append-to-body="inDialog"
        @open="openDialog"
        @close="closeDialog"
    >
        <list :show-checkbox="showCheckbox" in-dialog ref="list">
            <slot name="column" slot="column"></slot>
        </list>
        <template slot="footer">
            <slot name="footer"></slot>
        </template>
    </el-dialog>
</template>
<script>
import list from "./list";
import listDialog from "@/mixins/listDialog";
export default {
    mixins: [listDialog],
    components: {
        list
    },
    props: {
    },
    data() {
        return {
            
        };
    },
    methods: {
        
    }
};
</script>