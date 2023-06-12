<template>
    <div>
        <div class="up">
            <el-button type="success" @click="doAdd()">新建</el-button>
        </div>

        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="专利列表">
                    <slot>
                        <el-table-column label="状态" width="70">
                            <template #default="scope">
                                <span>{{ scope.row.enable == 0 ? '未启用' : '启用' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button type="primary" plain @click="doEdit(scope.row.id)">编辑</el-button>
                                <el-button type="danger" plain @click="doDelete(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </slot>
                </ListView>
            </div>
        </div>

        <el-dialog v-model="visible" v-if="visible" width="30%" title="专利信息">
            <PatentEdit :id="choiceId" @doCancel="doCancel"></PatentEdit>
        </el-dialog> 
    </div>
</template>
<script>
import ListView from '../../../components/list-view/list-view.vue';
import { page,del } from "@/http/patentApi/patentApi"
import { success, fail } from "@/utils/msg/msg";
import PatentEdit from '../../../components/patentEdit/patentEdit.vue';
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
                { prop: "name", label: "专利名称", width: 200 },
                { prop: "attachment", label: "佐证材料", width: 100 },
                { prop: "type", label: "专利类型", width: 100 },
                { prop: "userId", label: "发明人id", width: 90 },
                { prop: "address", label: "地址", width: 200 },
                { prop: "patentNo", label: "专利号", width: 200 },
                { prop: "empowerTime", label: "授权时间", width: 300 },
            ];
        }
    },
    components: { ListView, PatentEdit }
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
