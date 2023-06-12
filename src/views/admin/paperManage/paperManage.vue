<template>
    <div>
        <div class="up">
            <el-button type="success" @click="doAdd()">新建</el-button>
        </div>

        <div class="down">
            <div>
                <ListView :data="data" :column="column" title="论文列表">
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

        <el-dialog v-model="visible" v-if="visible" width="30%" title="论文信息">
            <PaperEdit :id="choiceId" @doCancel="doCancel"></PaperEdit>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '../../../components/list-view/list-view.vue';
import { one, add, edit, page,del } from "@/http/paperApi/paperApi"
import { success, fail } from "@/utils/msg/msg";
import SubjectEdit from '../../../components/subjectEdit/subjectEdit.vue';
import PaperEdit from '../../../components/paperEdit/paperEdit.vue';
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
                // { prop: "id", label: "课题编号", width: 100 },
                { prop: "name", label: "论文题目", width: 100 },
                { prop: "attachment", label: "材料", width: 350 },
                { prop: "publishTime", label: "发布时间", width: 260 },
                { prop: "type", label: "论文类型", width: 100 },
                { prop: "userId", label: "作者id", width: 100 },
                { prop: "publication", label: "刊物", width: 100 },
                { prop: "publicationCate", label: "刊物种类", width: 100 },
                { prop: "count", label: "引用次数", width: 200 },
            ];
        }
    },
    components: { ListView, PaperEdit }
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
