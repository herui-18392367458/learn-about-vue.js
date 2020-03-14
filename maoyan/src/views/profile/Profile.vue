<template>
    <div>
        <Header>
             <template #back>
              <!-- <i class="icon-back" @click="back"></i> -->
              <span class="title">我的</span>
           </template>
         </Header>
    </div>
</template>
<script>
import Header from '../../components/Header'
export default {
    components:{
        Header
    }
}
</script>