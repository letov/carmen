<template>
  <v-container>
  <v-card>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://katemojeikis.com/img/portfolio/main.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Kate Mojeikis</v-list-item-title>

        <v-btn
            icon
            @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Клиенты', icon: 'mdi-account-group-outline' },
      ],
      mini: true,
    }
  },
}
</script>

<style scoped>

</style>