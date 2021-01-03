<!-- 
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <el-table
      ref="table"
      :data="data"
      :select-on-indeterminate="false"
      v-loading="loading"
      border
      stripe
      default-expand-all
      row-key="id"
    >
      <el-table-column width="40" type="index" align="center">
        <template #header>
          <el-checkbox
            :indeterminate="isIndeterminate(topRow,'isChecked')"
            v-model="topRow.isChecked"
            @change="onChange($event,topRow,'checkboxMenu_','isChecked')"
          ></el-checkbox>
        </template>
        <template slot-scope="{row}">
          <el-checkbox
            :ref="'checkboxMenu_'+row.id"
            :indeterminate="isIndeterminate(row,'isChecked')"
            v-model="row.isChecked"
            v-data:row="row"
            @change="onChange($event,row,'checkboxMenu_','isChecked')"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="菜单名称" min-width="150"></el-table-column>
      <el-table-column width="60" align="center" label="读">
        <template #header>
          <el-checkbox
            class="_checkbox"
            :indeterminate="isIndeterminate(topRow,'canRead')"
            :disabled="!isShow(topRow,'hasRead') ||(!isIndeterminate(topRow,'isChecked') &&!topRow.isChecked)"
            v-model="topRow.canRead"
            @change="onChange($event,topRow,'checkboxRead_','canRead')"
          >读</el-checkbox>
        </template>
        <template slot-scope="{row}">
          <el-checkbox
            class="_checkbox"
            :ref="'checkboxRead_'+row.id"
            :indeterminate="isIndeterminate(row,'canRead')"
            :disabled="!isIndeterminate(row,'isChecked') && !row.isChecked"
            v-data:row="row"
            v-model="row.canRead"
            v-if="isShow(row,'hasRead')"
            @change="onChange($event,row,'checkboxRead_','canRead')"
          >读</el-checkbox>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label="写">
        <template #header>
          <el-checkbox
            class="_checkbox"
            :indeterminate="isIndeterminate(topRow,'canWrite')"
            :disabled="!isShow(topRow,'hasWrite') ||(!isIndeterminate(topRow,'isChecked') &&!topRow.isChecked)"
            v-model="topRow.canWrite"
            @change="onChange($event,topRow,'checkboxWrite_','canWrite')"
          >写</el-checkbox>
        </template>
        <template v-slot="{row}">
          <el-checkbox
            class="_checkbox"
            :ref="'checkboxWrite_'+row.id"
            :indeterminate="isIndeterminate(row,'canWrite')"
            :disabled="!isIndeterminate(row,'isChecked') && !row.isChecked"
            v-data:row="row"
            v-if="isShow(row,'hasWrite')"
            v-model="row.canWrite"
            @change="onChange($event,row,'checkboxWrite_','canWrite')"
          >写</el-checkbox>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column width="70" align="center" label="审核">
        <template #header>
          <el-checkbox
            class="_checkbox"
            :indeterminate="isIndeterminate(topRow,'canReview')"
            :disabled="!isShow(topRow,'hasReview') ||(!isIndeterminate(topRow,'isChecked') &&!topRow.isChecked)"
            v-model="topRow.canReview"
            @change="onChange($event,topRow,'checkboxReview_','canReview')"
          >审核</el-checkbox>
        </template>
        <template v-slot="{row}">
          <el-checkbox
            class="_checkbox"
            :ref="'checkboxReview_'+row.id"
            :indeterminate="isIndeterminate(row,'canReview')"
            :disabled="!isIndeterminate(row,'isChecked') && !row.isChecked"
            v-data:row="row"
            v-if="isShow(row,'hasReview')"
            v-model="row.canReview"
            @change="onChange($event,row,'checkboxReview_','canReview')"
          >审核</el-checkbox>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from "@/api/sys/menu";
export default {
  data() {
    return {
      test: true,
      data: [],
      hasData: false,
      loading: true
    };
  },
  computed: {
    topRow() {
      return {
        isChecked: false,
        canRead: false,
        canWrite: false,
        canReview: false,
        children: this.data
      };
    }
  },
  methods: {
    setData(data) {
      data.forEach(item => {
        let o = this.$refs["checkboxMenu_" + item.menuId];
        if (o) {
          let rowData = o.$el.vData.row;
          rowData.isChecked = true;
          rowData.canRead = rowData.hasRead ? item.canRead : false;
          rowData.canWrite = rowData.hasWrite ? item.canWrite : false;
          rowData.canReview = rowData.hasReview ? item.canReview : false;
          this.checkedRecursion(
            true,
            rowData,
            "checkboxMenu_",
            "isChecked",
            "up"
          );
          this.checkedRecursion(
            true,
            rowData,
            "checkboxRead_",
            "canRead",
            "up"
          );
          this.checkedRecursion(
            true,
            rowData,
            "checkboxWrite_",
            "canWrite",
            "up"
          );
          this.checkedRecursion(
            true,
            rowData,
            "checkboxReview_",
            "canReview",
            "up"
          );
        }
      });
    },
    reset() {
      let _reset = function(data) {
        data.forEach(item => {
          item.isChecked = false;
          item.canRead = false;
          item.canWrite = false;
          item.canReview = false;
          if (item.children) {
            _reset(item.children);
          }
        });
      };
      _reset(this.data);
      this.topRow.isChecked = false;
      this.topRow.canRead = false;
      this.topRow.canWrite = false;
      this.topRow.canReview = false;
    },
    getCheckedRows() {
      let checkedRows = [];
      let _getCheckedRow = function(data) {
        data.forEach(item => {
          if (item.isChecked) {
            checkedRows.push(item);
          }
          if (item.children) {
            _getCheckedRow(item.children);
          }
        });
      };
      _getCheckedRow(this.data);
      checkedRows = checkedRows.filter(item => {
        return !item["children"];
      });
      return checkedRows.map(item => {
        return {
          menuId: item.id,
          canRead: item.hasRead ? item.canRead : false,
          canWrite: item.hasWrite ? item.canWrite : false,
          canReview: item.hasReview ? item.canReview : false
        };
      });
    },
    getDataOnce(params) {
      if (this.hasData) {
        return Promise.resolve({ data: this.data });
      }
      this.loading = true;
      return new Promise((resolve, reject) => {
        api.getCommonList({isPage:false}).then(res => {
          res.data.forEach(item => {
            item.isChecked = false;
            item.canRead = false;
            item.canWrite = false;
            item.canReview = false;
          });
          this.data = this.$commonJs.toTreeData(res.data);
          resolve({
            data: this.data
          });
          this.loading = false;
          this.hasData = true;
        });
      });
    },
    onChange(e, data, refName, fieldName) {
      this.checkedRecursion(e, data, refName, fieldName);
    },
    //递归勾选
    checkedRecursion(checked, data, refName, fieldName, direction) {
      if (data.parentId && direction != "down") {
        let o = this.$refs[refName + data.parentId];
        if (o) {
          let parentData = o.$el.vData.row;
          parentData[fieldName] = parentData.children.every(
            item => item[fieldName]
          );
          this.checkedRecursion(checked, parentData, refName, fieldName, "up");
        }
      } else {
        this.topRow[fieldName] = this.topRow.children.every(
          item => item[fieldName]
        );
      }
      if (data.children && direction != "up") {
        data.children.forEach(item => {
          item[fieldName] = checked;
          this.checkedRecursion(checked, item, refName, fieldName, "down");
        });
      }
    },
    isIndeterminate(row, fieldName) {
      if (row.children) {
        let checkedItemLength = 0;
        for (let item of row.children) {
          if (item[fieldName]) {
            checkedItemLength++;
          } else if (this.isIndeterminate(item, fieldName)) {
            checkedItemLength += 0.5;
          }
        }
        return checkedItemLength > 0 && checkedItemLength < row.children.length;
      } else {
        return false;
      }
    },
    isShow(row, fieldName) {
      if (row.children) {
        return row.children.some(
          item => item[fieldName] || this.isShow(item, fieldName)
        );
      } else {
        return row[fieldName];
      }
    }
  }
};
</script>
<style lang="scss">
._checkbox {
  margin-right: 10px;
  .el-checkbox__label {
    padding-left: 6px;
    font-size: 12px;
  }
}
</style>