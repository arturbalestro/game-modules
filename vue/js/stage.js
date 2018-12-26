Vue.component('char', {
  props: ['char'],
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
