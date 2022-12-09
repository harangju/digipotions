<template>
  <v-app :theme="theme">
    <v-app-bar title="Digi Potions" :elevation="2">
      <v-spacer />
      <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="toggleTheme" />
    </v-app-bar>
    <v-main>

      <v-container fluid>

        <v-row class="mt-3">

          <v-col class="hidden-xs" cols="12" sm="4">
            <v-card class="pa-sm-2 mx-1" v-if="(Object.keys(darkHeroSpirit).length > 0)">
              <v-img class="mx-auto" :src="darkHeroSpirit.image" height="188" width="200" />
              <p class="text-h6 mt-1 text-center text-decoration-none">
                <a :href="urlDarkHeroSpirit" class="" target="_blank">
                  {{ darkHeroSpirit.Name }}
                </a>
              </p>
            </v-card>
          </v-col>

          <v-col cols="12" sm="4">
            <v-card class="pa-sm-4" :loading="loading">
              <v-text-field label="Dark Hero Spirit #" v-model="idDarkHeroSpirit"></v-text-field>
              <v-text-field label="Dark Spirit #" v-model="idDarkSpirit"
                v-on:keyup.enter="runSimluation"></v-text-field>
              <v-card-actions>
                <v-btn class="mx-sm-auto" @click="runSimluation">Run simulation</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" sm="4">
            <v-card class="hidden-xs pa-sm-2 mx-1" v-if="(Object.keys(darkSpirit).length > 0)">
              <v-img class="mx-auto" :src="darkSpirit.image" height="188" width="200" />
              <p class="text-h6 mt-1 text-center text-decoration-none">
                <a :href="urlDarkSpirit" class="" target="_blank">
                  {{ darkSpirit.Name }}
                </a>
              </p>
            </v-card>

            <v-card class="hidden-sm-and-up pa-sm-2 mx-1" v-if="(Object.keys(darkHeroSpirit).length > 0)">
              <v-row>
                <v-col>
                  <v-img class="mx-auto" :src="darkHeroSpirit.image" height="200" width="200" />
                  <p class="text-h6 mt-1 text-center text-decoration-none">
                    <a :href="urlDarkHeroSpirit" class="" target="_blank">
                      {{ darkHeroSpirit.Name }}
                    </a>
                  </p>
                </v-col>
                <v-col>
                  <v-img class="mx-auto" :src="darkSpirit.image" height="200" width="200" />
                  <p class="text-h6 mt-1 text-center text-decoration-none">
                    <a :href="urlDarkSpirit" class="" target="_blank">
                      {{ darkSpirit.Name }}
                    </a>
                  </p>
                </v-col>
              </v-row>

            </v-card>
          </v-col>

        </v-row>

        <v-row class="my-3">

          <v-col cols="12" sm="4">
            <v-card v-if="(Object.keys(enhancements).length > 0)" class="pa-3 mx-1">
              <h3>Enhancements</h3>
              <p>Bloodline - Dark Hero Spirit: <strong>{{ enhancements['Bloodline - Dark Hero Spirit'] }}</strong> </p>
              <p>Expression - Dark Hero Spirit: <strong>{{ enhancements['Expression - Dark Hero Spirit'] }}</strong>
              </p>
              <p>Expression - Dark Spirit: <strong>{{ enhancements['Expression - Dark Spirit'] }}</strong> </p>
              <p>Potion Name: <strong>{{ enhancements['Potion Name'] }}</strong></p>
              <p>Revealed Villain Class: <strong>{{ enhancements['Revealed Villain Class'] }}</strong> </p>
              <p>Revealed Villain Enhancement: <strong>{{ enhancements['Revealed Villain Enhancement'] }}</strong> </p>
              <p>Revealed Villain Type: <strong>{{ enhancements['Revealed Villain Type'] }}</strong> </p>
            </v-card>
          </v-col>

          <v-col cols="12" sm="4">
            <v-card v-if="(Object.keys(weapons).length > 0)" class="pa-3 mx-1">
              <h3>Weapons</h3>
              <p>Right Prop - Dark Hero Spirit: <strong>{{ weapons['Right Prop - Dark Spirit Hero'] }}</strong> </p>
              <p>Prop - Dark Spirit: <strong>{{ weapons['Prop - Dark Spirit'] }}</strong> </p>
              <p>Revealed Villain Weapon Quantity: <strong>{{ weapons['Revealed Villain Weapon Quantity'] }}</strong>
              </p>
              <p>Revealed Villain Weapon 1 Quality: <strong>{{ weapons['Revealed Villain Weapon 1 Quality'] }}</strong>
              </p>
              <p>Revealed Villain Weapon 2 Quality: <strong>{{ weapons['Revealed Villain Weapon 2 Quality'] }}</strong>
              </p>
            </v-card>
          </v-col>

          <v-col cols="12" sm="4">
            <v-card v-if="(Object.keys(calligraphy).length > 0)" class="pa-3 mx-1">
              <h3>Calligraphy</h3>
              <p>Background - Dark Hero Spirit: <strong>{{ calligraphy['Background - Dark Hero Spirit'] }}</strong> </p>
              <p>Background - Dark Spirit: <strong>{{ calligraphy['Background - Dark Spirit'] }}</strong> </p>
              <p>Revealed Villain Background: <strong>{{ calligraphy['Revealed Villain Background'] }}</strong> </p>
              <p>Revealed Villain Calligraphy Color: <strong>{{ calligraphy['Revealed Villain Calligraphy Color']
              }}</strong>
              </p>
              <p>Revealed Villain Calligraphy Style: <strong>{{ calligraphy['Revealed Villain Calligraphy Style']
              }}</strong>
              </p>
            </v-card>
          </v-col>

        </v-row>

      </v-container>

    </v-main>

    <v-footer padless>
      <v-col class="text-center" cols="12">
        Made by <a href="https://harangju.com" target="_blank">Harang Ju</a>. <br />
        This is informational purposes only.
        Check the official <a href="https://digidaigaku.com" target="_blank">website</a>.
      </v-col>
    </v-footer>

  </v-app>
</template>

<script lang="ts">
import {
  getDarkSpirit, getDarkHeroSpirit, getWeapons, getCalligraphy, getEnhancements,
  key_weapons, key_calligraphy, key_enhancements
} from './utils/utils';
export default {
  data() {
    return {
      theme: 'light',
      loading: false,
      weapons: {} as key_weapons,
      calligraphy: {} as key_calligraphy,
      enhancements: {} as key_enhancements,
      idDarkSpirit: '',
      idDarkHeroSpirit: '',
      darkSpirit: {} as { [key: string]: string },
      darkHeroSpirit: {} as { [key: string]: string },
    };
  },
  computed: {
    urlDarkSpirit() {
      return "https://opensea.io/assets/ethereum/0xbc4a4e7ece9429d982f9d5c83bcadbb9b2e9314d/" + this.idDarkSpirit;
    },
    urlDarkHeroSpirit() {
      return "https://opensea.io/assets/ethereum/0xe56dd80688f913e36e2e20c2b4a62669a3e23968/" + this.idDarkHeroSpirit;
    },
  },
  methods: {
    toggleTheme() {
      this.theme = (this.theme === 'light') ? 'dark' : 'light';
    },
    async runSimluation() {
      this.loading = true;
      if (isNaN(Number(this.idDarkSpirit)) || isNaN(Number(this.idDarkHeroSpirit))) {
        return;
      }
      this.darkSpirit = await getDarkSpirit(this.idDarkSpirit);
      this.darkHeroSpirit = await getDarkHeroSpirit(this.idDarkHeroSpirit);
      console.log(this.darkSpirit, this.darkHeroSpirit);
      this.weapons = getWeapons(this.darkSpirit['Prop'], this.darkHeroSpirit['Right Prop']);
      this.calligraphy = getCalligraphy(this.darkSpirit['Background'], this.darkHeroSpirit['Background']);
      this.enhancements = getEnhancements(
        this.darkSpirit['Expression'], this.darkHeroSpirit['Bloodline'], this.darkHeroSpirit['Expression']);
      console.log(this.weapons, this.calligraphy, this.enhancements);
      this.loading = false;
    },
  }
};
</script>

<style >
a {
  color: #B71C1C;
  text-decoration: none;
}
</style>