<template>
  <JsonFormatData :jsonData="dd"></JsonFormatData>
</template>


<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import JsonFormatData from "@/components/InterfaceAuto/JsonFormatData.vue";

  @Component({
    name: 'testCase',
    components: {JsonFormatData},
  })
  export default class extends Vue {
    // 主键PK
    private dd={"status":0,"message":"成功","data":[{"id":1988,"bussNo":"CK000002063","bussSource":"15002","bussSourceDesc":"合同签约","custName":"黄小红","custMobile":"15745400192","contractNo":"Z202006080014","vehicleInfo":"比亚迪 E5-450","plate":"自A61907","vinCode":"LVRZX4HG967B1FEPU","corpId":105338612,"corpName":"测试公司","userId":null,"userName":"","salesName":"严建凯","depotStatus":"14901","depotStatusDesc":"待出库","assetMaintenance":null,"vehicleId":24957,"contractId":69991,"custId":539945,"modelId":29162,"remark":null,"gmtCreate":1591584399000,"gmtModify":null,"finishTime":null,"vehicleOption":null,"odMemter":null,"hevMemter":null,"capactity":null,"checkTime":null},{"id":1990,"bussNo":"CK000002065","bussSource":"15011","bussSourceDesc":"合同转让","custName":"黄小红","custMobile":"15745400192","contractNo":"Z202006080014","vehicleInfo":"比亚迪 E5-450","plate":"自A61907","vinCode":"LVRZX4HG967B1FEPU","corpId":105338612,"corpName":"测试公司","userId":null,"userName":"","salesName":"严建凯","depotStatus":"14903","depotStatusDesc":"待入库","assetMaintenance":null,"vehicleId":24957,"contractId":69991,"custId":539945,"modelId":29162,"remark":null,"gmtCreate":1591584819000,"gmtModify":null,"finishTime":null,"vehicleOption":null,"odMemter":null,"hevMemter":null,"capactity":null,"checkTime":null}],"errorInfo":null,"errorMessage":null,"success":true}
    private menusTree: any = [{
      id:1,
      type: 'array|object|string|boolen|number',
      key: 'key', // 菜单等级
      value: 'value', // 父id
      children: [{
        id: '4',
        key: '2',
        value: '1',
        type:''
      }],
    }]
    private menusTable:any=[]
    created(){
      this.menusTable = this.menusTree;
    }
    private formatData(data:any){
      JSON.stringify(data)
    }
  }
</script>

<style scoped>
  .level1, .level2, .level3 {
    display: inline-block;
    width: 20px;
  }

  .level1 {
    margin-left: 5px;
  }

  .level2 {
    margin-left: 20px;
  }

  .level3 {
    margin-left: 35px;
  }
</style>
