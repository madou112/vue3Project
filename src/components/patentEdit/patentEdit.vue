<template>
    <div>
        <el-form :model="entity" label-width="120px">
            <el-form-item label="专利名称">
                <el-input v-model="entity.name" />
            </el-form-item>

            <el-form-item label="发明人id">
                <el-input v-model="entity.userId" />
            </el-form-item>

            <el-form-item label="授权时间">
                <el-date-picker v-model="entity.empowerTime" type="datetime" placeholder="Select date and time" />
            </el-form-item>

            <el-form-item label="地址">
                <el-input v-model="entity.address" />
            </el-form-item>

            <el-form-item label="佐证材料">
                <el-input v-model="entity.attachment" />
            </el-form-item>

            <el-form-item label="专利号">
                <el-input v-model="entity.patentNo"/>
            </el-form-item>

            <el-form-item label="专利类型">
                <el-select v-model="entity.type" placeholder="请选择专利类型">
                    <el-option v-for="item in typeArr" :key="item" :label="item" :value="item" />
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
import { one, add, edit } from "@/http/patentApi/patentApi"
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
                address: '',
                empowerTime: '',
                name: '',
                patentNo: '',
                userId: '',
                type:'',
            },
            typeArr:['发明专利','实用型专利','外观设计'],
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
                    this.entity = resp.data.patent
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
