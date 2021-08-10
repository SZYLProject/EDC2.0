<!--
 * @Author: your name
 * @Date: 2021-03-03 18:18:05
 * @LastEditTime: 2021-04-20 11:44:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\components\Empty.vue
-->
<template>
  <div class="main-empty">
    <!-- <img src="~/assets/img/tip/bluetheme/empty-bg-md.png" alt="" /> -->
    <div class="main-empty-box">
      <div class="main-empty-img">
      </div>
      <div class="main-empty-error">
        <slot name="label">
        </slot>
      </div>
      <slot>
      </slot>
    </div>
  </div>
</template>
<script>
</script>
