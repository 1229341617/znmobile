<template>
<div id="Header">
    <mt-header :title="title">
    <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
    </router-link>
    <mt-button icon="" slot="right" v-if="hasRight" @click="emitFiltrate">筛选</mt-button>
    </mt-header>
</div>   
</template>
<script>
import { Header,Button } from 'mint-ui';
    export default {
        props:['title','hasRight'],
          data(){
              return {
              }
          },
          methods:{
              emitFiltrate:function(){
                  this.$emit('filtrate');
              }
          },
          components:{
              'mt-header':Header,
              'mt-button':Button
          }
    }
</script>
<style scoped>
#Header header{
    width:100%;
    height:2.5rem;
    background-color:#c8cece;

}
</style>
