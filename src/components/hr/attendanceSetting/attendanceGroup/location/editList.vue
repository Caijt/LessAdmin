<template>
  <div>
    <div style="display:flex">
      <div style="flex:auto">
        <el-button @click="add" type="primary">添加</el-button>
        <el-button @click="removeBatch">删除</el-button>
      </div>
      <div style="flex:none">
        <slot></slot>
      </div>
    </div>
    <el-table v-loading="loading" ref="table" :data="data" @selection-change="onCheckedChange">
      <el-table-column type="selection" width="40" align="center"></el-table-column>
      <el-table-column label="考勤地址" min-width="100" prop="address"></el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" icon="el-icon-edit" @click="edit(row)"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="remove($index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <map-dialog ref="mapDialog" in-dialog selectable @select="onSelect" />
  </div>
</template>
<script>
import mapDialog from "@/components/common/maps/qq/mapDialog";
export default {
  components: { mapDialog },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: [],
      checkedRows: [],
      loading: false,
      editItem: null
    };
  },
  methods: {
    setData(data) {
      this.data = data;
    },
    onSelect(data) {
      if (this.editItem) {
        this.editItem.address = data.address;
        this.editItem.lat = data.location.lat;
        this.editItem.lng = data.location.lng;
      } else {
        this.data.push({
          address: data.address,
          lat: data.location.lat,
          lng: data.location.lng
        });
      }
    },
    add() {
      this.editItem = null;
      this.$refs.mapDialog.open().then(that => {
        that.goLocalCity();
      });
    },
    edit(row) {
      this.editItem = row;
      this.$refs.mapDialog.open().then(that => {
        that.setLocation(row);
      });
    },
    clear() {
      this.data = [];
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    removeBatch() {
      this.checkedRows.forEach(item => {
        let index = this.data.indexOf(item);
        this.remove(index);
      });
    },
    onCheckedChange(rows) {
      this.checkedRows = rows;
    }
  }
};
</script>