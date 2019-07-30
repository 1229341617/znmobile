<template>
  <div id="app">
    <transition name="fade" mode="out-in" >
      <router-view class="view"></router-view>
    </transition>
    <lg-preview></lg-preview>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted() {
      //初始化改变根节点的font-size,以320的屏幕为基准,20px为基准.
      //this is added by zou
      (function(doc, win) {
        var docEl = doc.documentElement || doc.body,
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
          recalc = function() {
            var clientWidth = docEl.clientWidth || doc.body.clientWidth;
            if(!clientWidth) return;
            if(clientWidth < 768) {
              docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            }
          };
        if(!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
      })(document, window);
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  body {
    font-size: 0.7rem;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
