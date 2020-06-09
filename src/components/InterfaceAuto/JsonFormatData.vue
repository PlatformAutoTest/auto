<template>
  <div class="app-container">
    <el-table ref="menusTable" :data="formatData(this.jsonData)">
      <el-table-column
        prop="key"
        label="菜单名称">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.key"
            placeholder="请输入内容"
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        label="图标">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.value"
            placeholder="请输入内容"
            v-if="scope.row.children===undefined"
          >
          </el-input>
          <el-button type="primary" v-else>{{scope.row.value}}</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-button @click="dss()">das</el-button>
  </div>
</template>


<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import {IJsonFormatData} from "@/api/InterfaceAuto/types";

  @Component({
    name: 'JsonFormatData',

  })
  export default class extends Vue {
    @Prop() jsonData:any;

    private tableData: IJsonFormatData[]=[];

    private formatData(values:any):IJsonFormatData[]{
      let objKey: string[],tabData:IJsonFormatData[];
      tabData=[]
      objKey = Object.keys(values);
      for (const i of objKey){
        console.log(i)
        if(Array.isArray(values[i])){
              tabData.push({
              children: this.formatData(values[i]),
              key: i,
              level: 0,
              type: 'Array',
              value: 'add',
            }
          )
        }else if (values[i] instanceof Object){
          tabData.push({
              children: this.formatData(values[i]),
              key: i,
              level: 0,
              type: 'Object',
              value: 'add',
            }
          )

        }else {
          tabData.push({
              children: undefined,
              key: i,
              level: 0,
              type: typeof values[i],
              value: values[i],
          }
          )
        }
      }
      return tabData
    }
    private dss(){
      console.log(this.jsonData)
      console.log(this.tableData)
    }
    create(){
     this.tableData=this.formatData(this.jsonData)
    }
  }
</script>

<style scoped>

</style>
