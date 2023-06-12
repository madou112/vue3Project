<template>
    <div class="big">
        <div class="up">

            <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" mode="horizontal" :router="true">
                <el-menu-item index="/zkh/paperManage">论文管理</el-menu-item>
                <el-menu-item index="/zkh/copyRightManage">著作权管理</el-menu-item>
                <el-menu-item index="/zkh/patentManage">专利管理</el-menu-item>
                <el-menu-item index="/zkh/subjectManage">课题管理</el-menu-item>
            </el-menu>
        </div>

        <div class="down">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '/zkh/paperManage'
        }
    },
    methods: {
    },
}
</script>
<style  scoped>
.up {
    width: 100%;
    height: 20%;
    
}

.down {
    width: 100%;
    height: 800%;
    overflow-y: auto;
}

.big {
    width: 100%;
    height: 100%;
    padding: 0px;
}
</style>
