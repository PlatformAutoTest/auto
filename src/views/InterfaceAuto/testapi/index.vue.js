import { __decorate } from "tslib";
import { Component, Vue } from "vue-property-decorator";
import { getApiDetails, getApiList, defaultApiData } from "@/api/InterfaceAuto/testapi";
import tabform from "@/components/InterfaceAuto/tabform.vue";
import { cloneDeep } from 'lodash';
let default_1 = class extends Vue {
    constructor() {
        super(...arguments);
        // private list: IArticleData[] = []
        this.formLabelWidth = '120px';
        this.activeName = 'first';
        this.listLoading = true;
        this.dialogFormVisible = false;
        this.dialogStatus = '';
        this.textMap = {
            update: 'Edit',
            create: 'Create',
        };
        this.verifierOptions = ['是', '否'];
        this.requestMethod = [
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
            }
        ];
        this.paramsData = [];
        this.headerData = [];
        this.bodyData = [];
        this.validate = [];
        this.tempApiData = defaultApiData;
        this.list = [];
        // private tempArticleData
        this.listQuery = {
            page: 1,
            limit: 20,
            api_url: undefined,
            api_name: undefined,
            verified: undefined,
            last_update: undefined,
            sort: '+id'
        };
    }
    created() {
        this.getList();
    }
    async getList() {
        this.listLoading = true;
        const { data } = await getApiList(this.listQuery);
        this.list = data;
        // Just to simulate the time of the request
        setTimeout(() => {
            this.listLoading = false;
        }, 0.5 * 1000);
    }
    async getDetails(apiId) {
        const id = { id: apiId };
        const { data } = await getApiDetails(id);
        // Just to simulate the time of the request
        this.tempApiData = data;
        setTimeout(() => {
            this.listLoading = false;
        }, 0.5 * 1000);
    }
    handleFilter() {
        this.listQuery.page = 1;
        this.getList();
    }
    submitApi() {
        this.dialogFormVisible = false;
    }
    resetTempApiData() {
        this.tempApiData = cloneDeep(defaultApiData);
        this.paramsData = [];
        this.headerData = [];
        this.bodyData = [];
        this.validate = [];
    }
    handleCreate() {
        this.resetTempApiData();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
            this.$refs.dataForm.clearValidate();
        });
    }
    handleUpdate(apiId) {
        this.resetTempApiData();
        this.getDetails(apiId).then(() => {
            this.tabDataFilter();
        });
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
            this.$refs.dataForm.clearValidate();
        });
    }
    handleClick(tab, event) {
        console.log(tab, event);
        console.log(this.tempApiData);
    }
    tabDataFilter() {
        let headerData = this.tempApiData.requestHeaders;
        let bodyData = this.tempApiData.requestBody;
        let paramData = this.tempApiData.requestParams;
        let validateData = this.tempApiData.requestValidate;
        for (const textHeader in headerData) {
            if (headerData.hasOwnProperty(textHeader)) {
                this.headerData.push({
                    param_key: textHeader,
                    param_value: headerData[textHeader]
                });
            }
            else {
                this.headerData.push({
                    param_key: undefined,
                    param_value: undefined
                });
            }
        }
        for (const textHeader in bodyData) {
            if (bodyData.hasOwnProperty(textHeader)) {
                this.bodyData.push({
                    param_key: textHeader,
                    param_value: bodyData[textHeader]
                });
            }
            else {
                this.bodyData.push({
                    param_key: undefined,
                    param_value: undefined
                });
            }
        }
        for (const textHeader in paramData) {
            if (paramData.hasOwnProperty(textHeader)) {
                this.paramsData.push({
                    param_key: textHeader,
                    param_value: paramData[textHeader]
                });
            }
            else {
                this.paramsData.push({
                    param_key: undefined,
                    param_value: undefined
                });
            }
        }
        for (const textHeader in validateData) {
            if (validateData.hasOwnProperty(textHeader)) {
                this.validate.push({
                    param_key: textHeader,
                    param_value: validateData[textHeader]
                });
            }
            else {
                this.validate.push({
                    param_key: undefined,
                    param_value: undefined
                });
            }
        }
    }
    getchild(getvalue, getCode) {
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
};
default_1 = __decorate([
    Component({
        name: 'testApi',
        components: { tabform },
    })
], default_1);
export default default_1;
//# sourceMappingURL=index.vue.js.map