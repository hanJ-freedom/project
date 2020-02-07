<template>
    <div id="cinema">
        <div class="header">
            <div class="tar">广州</div>
            <div class="tar">影院</div>
            <div><img src="../homePage/sousuo.png" alt=""></div>
        </div>
        <ul>
            <li v-for="(val,key) in datacinema">
                <div class="brief">
                    <h1>{{val.name}}</h1>
                    <p>{{val.site}}</p>
                    <div>
                        <span>小吃</span>
                        <span>4D厅</span>
                        <span>巨幕厅</span>
                        <span>杜比全景声厅</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {phcinemaAPI} from '../../../api/api'
export default {
    data() {
        return {
            datacinema:[]
        }
    },
    async mounted() {
        this.datacinema = await phcinemaAPI()
        console.log(this.datacinema)
    }
}
</script>

<style scoped>
    #cinema{
        margin-bottom: 4rem
    }
    .header{
        display: flex;
        justify-content:space-between;
        font-size: 20px;
        padding: 0.5rem 5%;
        background-color: red;
        color: #fff;
    }
    .header img{
        width: 2rem
    }
    .header div{
        height: 2.5rem;
        text-align: center;
        display: flex;
        align-items:center;
        color: rgb(196, 194, 194);
    }
    .header .tar{
        color: #fff
    }

    #cinema ul li{
        padding: 1rem;
        display: flex;
        justify-content:space-between
    }

    #cinema ul li .brief{
        width: 100%
    }
    #cinema ul li .brief h1{
        font-size: 19px;
        margin-bottom: 6px;
        margin-top: 3px
    }
    #cinema ul li .brief p{
        font-size: 16px;
        color: rgb(184, 178, 178);
        margin-bottom: 6px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    #cinema ul li .brief span{
        font-size: 12px;
        color: rgb(247, 139, 38);
        border: 1px solid rgb(247, 139, 38);
        margin-right: 2%
    }

</style>