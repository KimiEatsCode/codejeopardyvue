<template><div>test from modal comp</div>

   <div
            ref="modal"
            class="modal fade"
            :class="{ show: active, 'd-block': active }"
            tabindex="-1"
            role="dialog">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    >
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <p>{{ this.$store.state.clues }}</p>
                </div>
            </div>
            </div>
        </div>


           <div v-if="active" class="modal-backdrop fade show"></div>
</template>

<script>

export default ({
    name: 'CategoryCluesModal',
    methods: {

props: {
    clue:String
},



}

})
</script>

<style scoped>

</style>
