<template>
  <v-dialog @input="emit($event)" clipped :value="value" persistent max-width="380">
    <v-card>
      <v-card-title class="headline">
        Remove Item From Your Cart?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="emit(false)">
          Cancel
        </v-btn>
        <v-btn color="green darken-1" text @click="aggree()">
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  watch: {
    value: function(val) {
      if (val == false) this.$emit('destroyed')
    },
  },
  data() {
    return {
      show: false,
    }
  },
  props: {
    value: Boolean,
  },
  methods: {
    aggree() {
      this.$emit('Agree')
      this.$emit('input', false)
    },
    emit(val) {
      this.$emit('input', val)
    },
  },
}
</script>

<style></style>
