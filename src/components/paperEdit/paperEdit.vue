<template>
    <div>
        <el-form :model="entity" label-width="120px">
            <el-form-item label="论文题目">
                <el-input v-model="entity.name" />
            </el-form-item>

            <el-form-item label="作者id">
                <el-input v-model="entity.userId" />
            </el-form-item>

            <el-form-item label="刊物">
                <el-input v-model="entity.publication" />
            </el-form-item>

            <el-form-item label="发表时间">
                <el-date-picker v-model="entity.publishTime" type="datetime" placeholder="Select date and time" />
            </el-form-item>


            <el-form-item label="引用次数">
                <el-input v-model="entity.count" type="number" />
            </el-form-item>

            <el-form-item label="材料">
                <el-input v-model="entity.attachment" />
            </el-form-item>

            <el-form-item label="论文类型">
                <el-select v-model="entity.type" placeholder="请选择论文类型">
                    <el-option v-for="item in typeArr" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>


            <el-form-item label="刊物种类">
                <el-select v-model="entity.publicationCate" placeholder="请选择">
                    <el-option v-for="item in publicationCateArr" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { one, add, edit } from "@/http/paperApi/paperApi"
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
                count: '',
                name: '',
                publication: '',
                publicationCate: '',
                type: '',
                userId: '',
                publishTime: ''
            },
            publicationCateArr: ['核心期刊', '国际会议', 'SCI', 'EI', '本科学报'],
            typeArr: ['科技类', '教改类', '其他'],
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
                    this.entity = resp.data.paper
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
