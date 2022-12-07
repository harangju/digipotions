<template>
  <v-app :theme="theme">
    <v-app-bar title="Digi Potions" :elevation="2">
      <v-spacer />
      <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="toggleTheme" />
    </v-app-bar>
    <v-main>
      <v-card class="pa-md-6 mt-6 mx-lg-auto" width="300px">
        <v-text-field label="Dark Hero Spirit #"></v-text-field>
        <v-text-field label="Dark Spirit #"></v-text-field>
        <v-card-actions>
          <v-btn class="mx-lg-auto">Run simulation</v-btn>
        </v-card-actions>
      </v-card>

      <v-card class="pa-md-6 mt-6 mx-lg-auto" width="300px">
        <p><strong>Class:</strong> {{ class}} </p>
        <p><strong>Weapons:</strong> {{ weapons }} </p>
        <p><strong>Calligraphy:</strong> {{ calligraphy }} </p>
      </v-card>

    </v-main>
  </v-app>
</template>

<script lang="ts">
// import fs from 'fs';
import { getDarkSpirit, getDarkHeroSpirit } from './utils/utils';
import axios from 'axios';
export default {
  data() {
    return {
      theme: 'dark',
      class: '',
      weapons: '',
      calligraphy: '',
    };
  },
  mounted() {
    // fs.readFile('assets/csv/Enhancements.csv', (err, data) => {
    //   console.log(data);
    // });
    // let json = csvToJSON('');
    // this.axios.get('https://digidaigaku.com/dark-spirits/metadata/1633.json').then((response) => {
    //   console.log(response.data)
    // })

  },
  methods: {
    toggleTheme() {
      this.theme = (this.theme === 'light') ? 'dark' : 'light';
    },
    async runSimluation() {
      let darkSpirit = await getDarkSpirit('812');
      let darkHeroSpirit = await getDarkHeroSpirit('812');
      this.class = '';
      this.weapons = '';
      this.calligraphy = '';
    },
  }
};
</script>
