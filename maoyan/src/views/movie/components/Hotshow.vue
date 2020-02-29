<template>
    <div>
        <MovieItem v-for="i in 10" :key="i"></MovieItem>
    </div>
</template>
<script>
import MovieItem from './MovieItem'
export default {
    components:{
        MovieItem
    }
}
</script>