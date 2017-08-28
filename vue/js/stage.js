Vue.component('char-tile', {
  props: ['char-tile'],
  template: ''
})

var app = new Vue({
  el: '#stage',
  data: {
    aspects: [],
    characters: roster,
    addChar: false
  },
  methods: {
    init: function () {
      this.characters = roster;
    },
    addCharToMap: function() {
      this.addChar = true;
    }
  }
})
