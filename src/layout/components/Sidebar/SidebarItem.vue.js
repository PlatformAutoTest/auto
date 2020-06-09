import { __decorate } from "tslib";
import path from 'path';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isExternal } from '@/utils/validate';
import SidebarItemLink from './SidebarItemLink.vue';
let default_1 = class default_1 extends Vue {
    get showingChildNumber() {
        if (this.item.children) {
            const showingChildren = this.item.children.filter((item) => {
                if (item.meta && item.meta.hidden) {
                    return false;
                }
                else {
                    return true;
                }
            });
            return showingChildren.length;
        }
        return 0;
    }
    get theOnlyOneChild() {
        if (this.showingChildNumber > 1) {
            return null;
        }
        if (this.item.children) {
            for (let child of this.item.children) {
                if (!child.meta || !child.meta.hidden) {
                    return child;
                }
            }
        }
        // If there is no children, return itself with path removed,
        // because this.basePath already conatins item's path information
        return { ...this.item, path: '' };
    }
    resolvePath(routePath) {
        if (isExternal(routePath)) {
            return routePath;
        }
        if (isExternal(this.basePath)) {
            return this.basePath;
        }
        return path.resolve(this.basePath, routePath);
    }
};
__decorate([
    Prop({ required: true })
], default_1.prototype, "item", void 0);
__decorate([
    Prop({ default: false })
], default_1.prototype, "isCollapse", void 0);
__decorate([
    Prop({ default: true })
], default_1.prototype, "isFirstLevel", void 0);
__decorate([
    Prop({ default: '' })
], default_1.prototype, "basePath", void 0);
default_1 = __decorate([
    Component({
        // Set 'name' here to prevent uglifyjs from causing recursive component not work
        // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
        name: 'SidebarItem',
        components: {
            SidebarItemLink
        }
    })
], default_1);
export default default_1;
//# sourceMappingURL=SidebarItem.vue.js.map