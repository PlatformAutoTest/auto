<template>
  <el-table :data="listDate" height="250" border style="width: 100%">
    <el-table-column :label="textLabelKey" width="180">
      <template slot-scope="{row}">
        <el-input v-model="row.param_key" placeholder="key" @input="handleAddLine"></el-input>
      </template>
    </el-table-column>
    <el-table-column :label="textLabelValue" width="180">
      <template slot-scope="{row}">
        <el-input v-model="row.param_value" placeholder="value" @input="handleAddLine"></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Emit} from "vue-property-decorator";

  @Component({
    name: "tabform",
  })
  export default class extends Vue {
    @Prop()
    code!: number;
    @Prop()
    listDate!: any

    private textLabelKey:string ='Expect'
    private textLabelValue:string ='Actually'

    create() {
      this.getlableText()
    }

    private getlableText() {
      if (this.code === 1004) {
        this.textLabelKey = 'Expect'
        this.textLabelValue = 'Actually'
      } else {
        this.textLabelKey = 'Key'
        this.textLabelValue = 'Value'
      }
    }

    @Emit('sendValue') send(getValue: any,code:number) {
    };

    handleAddLine() {
      this.send(this.listDate,this.code)
      // let key = this.listDate[this.listDate.length - 1].param_key
      // let value = this.listDate[this.listDate.length - 1].param_value
      // if (key !== undefined || value !== undefined) {
      //]
      // }
      console.log(this.listDate)
    }
  }
</script>

<style scoped>

</style>
