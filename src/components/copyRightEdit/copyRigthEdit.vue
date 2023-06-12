<template>
    <div>
        <el-form :model="entity" label-width="120px">
            <el-form-item label="著作权名称">
                <el-input v-model="entity.name" />
            </el-form-item>

            <el-form-item label="著作人id">
                <el-input v-model="entity.userId" />
            </el-form-item>

            <el-form-item label="完成时间">
                <el-date-picker v-model="entity.finishTime" type="datetime" placeholder="Select date and time" />
            </el-form-item>

            <el-form-item label="首次发表时间">
                <el-date-picker v-model="entity.publishTime" type="datetime" placeholder="Select date and time" />
            </el-form-item>

            <el-form-item label="佐证材料">
                <el-input v-model="entity.attachment" />
            </el-form-item>

            <el-form-item label="著作权编号">
                <el-input v-model="entity.copyrightNo"/>
            </el-form-item>
           
        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { one, add, edit } from "@/http/copyRightApi/copyRightApi"
import { success, fail } from "@/utils/msg/msg";
export default {
    props: { id: Number },
    mounted() {
        console.log('mounted' + this.id)
        this.get()
    },
    data() {
        return {
            entity: {
                id: 0,
                attachment: '',
                copyrightNo: '',
                finishTime: '',
                name: '',
                publishTime: '',
                userId: '',
            },
            publicationCateArr:['核心期刊','国际会议','SCI','EI','本科学报'],
            typeArr:['科技类','教改类','其他'],
        }
    },
    methods: {
        sure() {
            this.id == 0 ? this.add() : this.edit()
        },
        add() {
            console.log('新建的:' + JSON.stringify(this.entity))
            add(this.entity).then(resp => {
                success('新建成功')
                this.doCancel()
            })
        },
        edit() {
            edit(this.entity).then(resp => {
                success('已保存')
                this.doCancel()
            })
        },
        doCancel() {
            this.$emit('doCancel')
        },
        get() {
            if (this.id != 0) {
                one({ id: this.id }).then(resp => {
                    console.log('编辑收到的:' + JSON.stringify(resp))
                    this.entity = resp.data.copyright
                })
            }
        },
    },
}
</script>
<style  scoped>
.btnDiv {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>
