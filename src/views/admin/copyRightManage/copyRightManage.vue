<template>
    <div>
        <div class="up">
            <el-button type="success" @click="doAdd()">新建</el-button>
        </div>

        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="著作权列表">
                    <slot>
                        <el-table-column label="状态" width="70">
                            <template #default="scope">
                                <span>{{ scope.row.enable == 0 ? '未启用' : '启用' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button type="primary" plain @click="doEdit(scope.row.id)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </slot>
                </ListView>
            </div>
        </div>

        <el-dialog v-model="visible" v-if="visible" width="30%" title="著作权信息">
            <CopyRigthEdit  :id="choiceId" @doCancel="doCancel"></CopyRigthEdit>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '../../../components/list-view/list-view.vue';
import { page } from "@/http/copyRightApi/copyRightApi"
import { success, fail } from "@/utils/msg/msg";
import PaperEdit from '../../../components/paperEdit/paperEdit.vue';
import CopyRigthEdit from '../../../components/copyRightEdit/copyRigthEdit.vue';
export default {
    mounted() {
        this.column = this.buildColumn()
        this.all()
    },
    data() {
        return {
            data: [],
            column: [],
            visible: false,
            choiceId: 0
        };
    },
    methods: {
        doEdit(id) {
            this.choiceId = id
            this.visible = true
            console.log('编辑的id:' + this.choiceId + '  visible:' + this.visible)
        },
        doAdd() {
            console.log('触发了添加方法')
            this.choiceId = 0
            this.visible = true
        },
        doCancel() {
            this.visible = false
            this.all()
        },
        doDelete(id){
            del({id:id}).then(resp=>{
                success('删除成功')
                this.all()
            })
        },
        all() {
            let body  = {
                "colums": [],
                "current": 1,
                "size": 100
            }
            page(body).then(resp => {
                console.log('收到回复：' + JSON.stringify(resp.data))
                this.data = resp.data.page.records
            })
        },
        //规定列表每列名称和显示的属性
        buildColumn() {
            return [
                { prop: "id", label: "编号", width: 100 },
                { prop: "name", label: "著作权名称", width: 100 },
                { prop: "attachment", label: "佐证材料", width: 100 },
                { prop: "copyrightNo", label: "著作权编号", width: 100 },
                { prop: "userId", label: "著作人id", width: 200 },
                { prop: "finishTime", label: "完成时间", width: 200 },
                { prop: "publishTime", label: "首次发表时间", width: 200 },
            ];
        }
    },
    components: { ListView, CopyRigthEdit }
}
</script>
<style  scoped>
.up {
    display: flex;
    justify-content: center;
}

.down {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100;
}
</style>
