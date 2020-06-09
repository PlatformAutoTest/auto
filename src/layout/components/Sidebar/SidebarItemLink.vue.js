import { __decorate } from "tslib";
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isExternal } from '@/utils/validate';
let default_1 = class default_1 extends Vue {
    constructor() {
        super(...arguments);
        this.isExternal = isExternal;
    }
};
__decorate([
    Prop({ required: true })
], default_1.prototype, "to", void 0);
default_1 = __decorate([
    Component({
        name: 'SidebarItemLink'
    })
], default_1);
export default default_1;
//# sourceMappingURL=SidebarItemLink.vue.js.map