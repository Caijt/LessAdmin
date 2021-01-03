<template>
  <div>
    <el-tabs v-model="tabName" @tab-click="handleClick">
      <el-tab-pane label="来源渠道" name="sourceChannel">
        <source-channel-list ref="sourceChannelList" :disabled="!$permission.canRead()">
          <template slot="toolbar-left">
            <el-button type="primary" @click="create" :disabled="!$permission.canWrite()">创建来源渠道</el-button>
          </template>
          <el-table-column
            fixed="right"
            slot="table"
            label="操作"
            width="80"
            align="center"
            v-if="$permission.canWrite()"
          >
            <template slot-scope="{row}">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
              <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
            </template>
          </el-table-column>
        </source-channel-list>
      </el-tab-pane>
      <el-tab-pane label="灭害种类" name="metacilType">
        <metacil-type-list ref="metacilTypeList" :disabled="!$permission.canRead()">
          <template slot="toolbar-left">
            <el-button type="primary" @click="create" :disabled="!$permission.canWrite()">创建灭害种类</el-button>
          </template>
          <el-table-column
            fixed="right"
            slot="table"
            label="操作"
            width="80"
            align="center"
            v-if="$permission.canWrite()"
          >
            <template slot-scope="{row}">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
              <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
            </template>
          </el-table-column>
        </metacil-type-list>
      </el-tab-pane>
      <el-tab-pane label="职务" name="post">
        <post-list ref="postList" :disabled="!$permission.canRead()">
          <template slot="toolbar-left">
            <el-button type="primary" @click="create" :disabled="!$permission.canWrite()">创建职务</el-button>
          </template>
          <el-table-column
            fixed="right"
            slot="table"
            label="操作"
            width="80"
            align="center"
            v-if="$permission.canWrite()"
          >
            <template slot-scope="{row}">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
              <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
            </template>
          </el-table-column>
        </post-list>
      </el-tab-pane>
      <el-tab-pane label="岗位" name="job">
        <job-list ref="jobList" :disabled="!$permission.canRead()">
          <template slot="toolbar-left">
            <el-button type="primary" @click="create" :disabled="!$permission.canWrite()">创建岗位</el-button>
          </template>
          <el-table-column
            fixed="right"
            slot="table"
            label="操作"
            width="80"
            align="center"
            v-if="$permission.canWrite()"
          >
            <template slot-scope="{row}">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
              <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
            </template>
          </el-table-column>
        </job-list>
      </el-tab-pane>
      <el-tab-pane label="客户类型" name="customerType">
        <customer-type-list ref="customerTypeList" :disabled="!$permission.canRead()">
          <template slot="toolbar-left">
            <el-button type="primary" @click="create" :disabled="!$permission.canWrite()">创建客户类型</el-button>
          </template>
          <el-table-column
            fixed="right"
            slot="table"
            label="操作"
            width="80"
            align="center"
            v-if="$permission.canWrite()"
          >
            <template slot-scope="{row}">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
              <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
            </template>
          </el-table-column>
        </customer-type-list>
      </el-tab-pane>
      <el-tab-pane label="投诉类型" name="complainType">
        <complain-type-list ref="complainTypeList" :disabled="!$permission.canRead()">
          <template slot="toolbar-left">
            <el-button type="primary" @click="create" :disabled="!$permission.canWrite()">创建投诉类型</el-button>
          </template>
          <el-table-column
            fixed="right"
            slot="table"
            label="操作"
            width="80"
            align="center"
            v-if="$permission.canWrite()"
          >
            <template slot-scope="{row}">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
              <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
            </template>
          </el-table-column>
        </complain-type-list>
      </el-tab-pane>
      <el-tab-pane label="收款方式" name="receiptMethod">
        <receipt-method-list ref="receiptMethodList" :disabled="!$permission.canRead()">
          <template slot="toolbar-left">
            <el-button type="primary" @click="create" :disabled="!$permission.canWrite()">创建收款方式</el-button>
          </template>
          <el-table-column
            fixed="right"
            slot="table"
            label="操作"
            width="80"
            align="center"
            v-if="$permission.canWrite()"
          >
            <template slot-scope="{row}">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
              <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
            </template>
          </el-table-column>
        </receipt-method-list>
      </el-tab-pane>
      <el-tab-pane label="业务来源" name="businessSource">
        <business-source-list ref="businessSourceList" :disabled="!$permission.canRead()">
          <template slot="toolbar-left">
            <el-button type="primary" @click="create" :disabled="!$permission.canWrite()">创建业务来源</el-button>
          </template>
          <el-table-column
            fixed="right"
            slot="table"
            label="操作"
            width="80"
            align="center"
            v-if="$permission.canWrite()"
          >
            <template slot-scope="{row}">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
              <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
            </template>
          </el-table-column>
        </business-source-list>
      </el-tab-pane>
      <el-tab-pane label="工资类型" name="wageType">
        <wage-type-list ref="wageTypeList" :disabled="!$permission.canRead()">
          <template slot="toolbar-left">
            <!-- <el-button type="primary" @click="create" :disabled="!$permission.canWrite()">创建工资类型</el-button> -->
          </template>
          <el-table-column
            fixed="right"
            slot="table"
            label="操作"
            width="80"
            align="center"
            v-if="$permission.canWrite()"
          >
            <template slot-scope="{row}">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
              <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
            </template>
          </el-table-column>
        </wage-type-list>
      </el-tab-pane>
      <el-tab-pane label="款项类别" name="moneyType">
        <money-type-list ref="moneyTypeList" :disabled="!$permission.canRead()">
          <template slot="toolbar-left">
            <el-button type="primary" @click="create" :disabled="!$permission.canWrite()">创建款项类别</el-button>
          </template>
          <el-table-column
            fixed="right"
            slot="column"
            label="操作"
            width="80"
            align="center"
            v-if="$permission.canWrite()"
          >
            <template slot-scope="{row}">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
              <el-button size="mini" type="text" icon="el-icon-delete" @click="del(row)" />
            </template>
          </el-table-column>
        </money-type-list>
      </el-tab-pane>
    </el-tabs>

    <source-channel-dialog ref="sourceChannelDialog" @close-saved="reload"></source-channel-dialog>
    <metacil-type-dialog ref="metacilTypeDialog" @close-saved="reload"></metacil-type-dialog>
    <post-dialog ref="postDialog" @close-saved="reload"></post-dialog>
    <job-dialog ref="jobDialog" @close-saved="reload"></job-dialog>
    <customer-type-dialog ref="customerTypeDialog" @close-saved="reload"></customer-type-dialog>
    <complain-type-dialog ref="complainTypeDialog" @close-saved="reload"></complain-type-dialog>
    <receipt-method-dialog ref="receiptMethodDialog" @close-saved="reload"></receipt-method-dialog>
    <business-source-dialog ref="businessSourceDialog" @close-saved="reload"></business-source-dialog>
    <wage-type-dialog ref="wageTypeDialog" @close-saved="reload"></wage-type-dialog>
    <money-type-dialog ref="moneyTypeDialog" @close-saved="reload"></money-type-dialog>
  </div>
</template>
<script>
import sourceChannelList from "@/components/sys/baseData/sourceChannel/list";
import metacilTypeList from "@/components/sys/baseData/metacilType/list";
import postList from "@/components/sys/baseData/post/list";
import jobList from "@/components/sys/baseData/job/list";
import customerTypeList from "@/components/sys/baseData/customerType/list";
import complainTypeList from "@/components/sys/baseData/complainType/list";
import receiptMethodList from "@/components/sys/baseData/receiptMethod/list";
import businessSourceList from "@/components/sys/baseData/businessSource/list";
import wageTypeList from "@/components/sys/baseData/wageType/list";
import moneyTypeList from "@/components/sys/baseData/moneyType/list";

import sourceChannelDialog from "@/components/sys/baseData/sourceChannel/editDialog";
import metacilTypeDialog from "@/components/sys/baseData/metacilType/editDialog";
import postDialog from "@/components/sys/baseData/post/editDialog";
import jobDialog from "@/components/sys/baseData/job/editDialog";
import customerTypeDialog from "@/components/sys/baseData/customerType/editDialog";
import complainTypeDialog from "@/components/sys/baseData/complainType/editDialog";
import receiptMethodDialog from "@/components/sys/baseData/receiptMethod/editDialog";
import businessSourceDialog from "@/components/sys/baseData/businessSource/editDialog";
import wageTypeDialog from "@/components/sys/baseData/wageType/editDialog";
import moneyTypeDialog from "@/components/sys/baseData/moneyType/editDialog";

export default {
  components: {
    sourceChannelList,
    metacilTypeList,
    postList,
    jobList,
    customerTypeList,
    complainTypeList,
    receiptMethodList,
    businessSourceList,
    wageTypeList,
    moneyTypeList,

    sourceChannelDialog,
    metacilTypeDialog,
    postDialog,
    jobDialog,
    customerTypeDialog,
    complainTypeDialog,
    receiptMethodDialog,
    businessSourceDialog,
    wageTypeDialog,
    moneyTypeDialog
  },
  data() {
    return {
      tabName: "sourceChannel"
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    handleClick() {
      this.reload();
    },
    reload() {
      this.$refs[this.tabName + "List"].reload();
      this.$nextTick(() => {
        this.$refs[this.tabName + "List"].$refs.list.$refs.table.doLayout();
      });
    },
    create() {
      this.$refs[this.tabName + "Dialog"].open();
    },
    edit(row) {
      this.$refs[this.tabName + "Dialog"].open().then(that => {
        that.setData(row);
      });
    },
    del(row) {
      this.$refs[this.tabName + "List"].delete(row);
    }
  }
};
</script>