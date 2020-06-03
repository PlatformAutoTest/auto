import { __decorate } from "tslib";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
let default_1 = class default_1 extends Vue {
    create() {
        this.getlableText();
    }
    getlableText() {
        if (this.code === 1004) {
            this.textLabelkey = 'Expect';
            this.textLabelValue = 'Actually';
        }
        else {
            this.textLabelkey = 'Key';
            this.textLabelValue = 'Value';
        }
    }
    send(getValue, code) {
    }
    ;
    handleAddLine() {
        this.send(this.listDate, this.code);
        // let key = this.listDate[this.listDate.length - 1].param_key
        // let value = this.listDate[this.listDate.length - 1].param_value
        // if (key !== undefined || value !== undefined) {
        //]
        // }
        console.log(this.listDate);
    }
};
__decorate([
    Prop()
], default_1.prototype, "code", void 0);
__decorate([
    Prop()
], default_1.prototype, "listDate", void 0);
__decorate([
    Emit('sendValue')
], default_1.prototype, "send", null);
default_1 = __decorate([
    Component({
        name: "tabform",
    })
], default_1);
export default default_1;
//# sourceMappingURL=tabform.vue.js.map