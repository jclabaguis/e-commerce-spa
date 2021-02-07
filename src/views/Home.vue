<template>
  <brand-tab></brand-tab>
</template>

<script>
import BrandTab from '@/components/Home/BrandTab'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    BrandTab,
  },
  methods: {},
  computed: {
    ...mapState(['items_data']),
  },
}
</script>
<style></style>
