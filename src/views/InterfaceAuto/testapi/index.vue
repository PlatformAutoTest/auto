<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.api_name"
        placeholder="接口名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.api_url"
        placeholder="接口url"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.verified"
        placeholder="是"
        clearable
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="item in verifierOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-input
        v-model="listQuery.last_update"
        placeholder="最后更新人"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-button


        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        <span>搜索</span>
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        <span>新增</span>
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="ID"
        width="50"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="ApiName" width="280">
        <template slot-scope="scope">
          {{ scope.row.apiName }}
        </template>
      </el-table-column>
      <el-table-column label="URL" width="280">
        <template slot-scope="scope">
          {{ scope.row.requestUrl }}
        </template>
      </el-table-column>
      <el-table-column
        label="Method"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.method }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="lastUpdateMember"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.lastUpdateM }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="verified"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.verified }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Action"
        width="250"
      >
        <template slot-scope="scope">
          <div align="center" class="dialog-footer">
            <el-button @click="handleUpdate(scope.row.id)">编辑</el-button>
            <el-button type="primary" @click="">运行</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="tempApiData" ref="dataForm" :inline="true">
        <el-form-item label="api名称：" :label-width="formLabelWidth">
          <el-input v-model="tempApiData.apiName" autocomplete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item :label-width="formLabelWidth" :required="true">
            <el-select v-model="tempApiData.method" placeholder="请选择">
              <el-option
                v-for="item in requestMethod"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-input v-model="tempApiData.requestUrl" autocomplete="off" placeholder="API URL"></el-input>
          </el-form-item>
        </el-row>
        <el-tabs @tab-click="handleClick" ref="pa">
          <el-tab-pane label="Params" name="first">
            <tabform :listDate="paramsData" @sendValue="getchild" :code="1001"></tabform>
          </el-tab-pane>
          <el-tab-pane label="Headers" name="second">
            <tabform :listDate="headerData" @sendValue="getchild" :code="1002"></tabform>
          </el-tab-pane>
          <el-tab-pane label="Body" name="third">
            <tabform :listDate="bodyData" @sendValue="getchild" :code="1003"></tabform>
          </el-tab-pane>
          <el-tab-pane label="Validate" name="fourth">
            <tabform :listDate="validate" @sendValue="getchild" :code="1004"></tabform>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitApi">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {getApiDetails, getApiList, defaultApiData} from "@/api/InterfaceAuto/testapi";
  import {Form} from 'element-ui'
  import tabform from "@/components/InterfaceAuto/tabform.vue";
  import {IApiData} from "@/api/InterfaceAuto/types";
  import {cloneDeep} from 'lodash'

  @Component({
    name: 'testApi',
    components: {tabform},

  })
  export default class extends Vue {
    // private list: IArticleData[] = []
    private formLabelWidth = '120px'
    private activeName = 'first'
    private listLoading = true
    private dialogFormVisible = false
    private dialogStatus = ''
    private textMap = {
      update: 'Edit',
      create: 'Create',
    }
    private verifierOptions = ['是', '否']
    private requestMethod = [
      {
        value: '选项1',
        label: 'GET'
      }, {
        value: '选项2',
        label: 'POST'
      }, {
        value: '选项3',
        label: 'PUT'
      }, {
        value: '选项4',
        label: 'DELETE'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    private paramsData: any = [];
    private headerData: any = [];
    private bodyData: any = [];
    private validate: any = [];

    private tempApiData = defaultApiData;
    private list: IApiData[] = [];
    // private tempArticleData
    private listQuery = {
      page: 1,
      limit: 20,
      api_url: undefined,
      api_name: undefined,
      verified: undefined,
      last_update: undefined,
      sort: '+id'
    }

    created() {
      this.getList()
    }

    private async getList() {
      this.listLoading = true
      const {data} = await getApiList(this.listQuery)
      this.list = data
      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 1000)
    }

    private async getDetails(apiId: number) {
      const id = {id: apiId}
      const {data} = await getApiDetails(id)
      // Just to simulate the time of the request
      this.tempApiData = data
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 1000)
    }

    private handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }


    private submitApi() {
      this.dialogFormVisible = false
    }

    private resetTempApiData() {
      this.tempApiData = cloneDeep(defaultApiData)
      this.paramsData = []
      this.headerData = []
      this.bodyData = []
      this.validate = []
    }

    private handleCreate() {
      this.resetTempApiData()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        (this.$refs.dataForm as Form).clearValidate()
      })
    }

    private handleUpdate(apiId: number) {
      this.resetTempApiData()
      this.getDetails(apiId).then(() => {
          this.tabDataFilter()
        }
      )
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        (this.$refs.dataForm as Form).clearValidate()
      })

    }

    private handleClick(tab: string, event: any) {
      console.log(tab, event)
      console.log(this.tempApiData)
    }

    private tabDataFilter() {
      let headerData = this.tempApiData.requestHeaders
      let bodyData = this.tempApiData.requestBody
      let paramData = this.tempApiData.requestParams
      let validateData = this.tempApiData.requestValidate
      for (const textHeader in headerData) {
        if (headerData.hasOwnProperty(textHeader)) {
          this.headerData.push({
            param_key: textHeader,
            param_value: headerData[textHeader]
          })
        }
      }
      this.headerData.push({
        param_key: undefined,
        param_value: undefined
      });

      for (const textHeader in bodyData) {
        if (bodyData.hasOwnProperty(textHeader)) {
          this.bodyData.push({
            param_key: textHeader,
            param_value: bodyData[textHeader]
          })
        }
      }
      this.bodyData.push({
        param_key: undefined,
        param_value: undefined
      });

      for (const textHeader in paramData) {
        if (paramData.hasOwnProperty(textHeader)) {
          this.paramsData.push({
            param_key: textHeader,
            param_value: paramData[textHeader]
          })
        }
      }
      this.paramsData.push({
        param_key: undefined,
        param_value: undefined
      });

      for (const textHeader in validateData) {
        if (validateData.hasOwnProperty(textHeader)) {
          this.validate.push({
            param_key: textHeader,
            param_value: validateData[textHeader]
          })
        }
      }
      this.validate.push({
        param_key: undefined,
        param_value: undefined
      });

    }

    private getchild(getvalue: any, getCode: number) {
      let key = getvalue[getvalue.length - 1].param_key
      let value = getvalue[getvalue.length - 1].param_value
      if (key !== undefined || value !== undefined) {
        getvalue.push({
          param_key: undefined,
          param_value: undefined
        });
      }
      switch (getCode) {
        case 1001:
          this.paramsData = getvalue;
          break;
        case 1002:
          this.headerData = getvalue;
          break;
        case 1003:
          this.bodyData = getvalue;
          break;
        case 1004:
          this.validate = getvalue;
          break;
      }
    }
  }
</script>

<style scoped>

</style>
