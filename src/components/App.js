const template = `
<div id="app">
  <div class="pane top-pane">
    <Editor
      language="xml"
      display-name="HTML"
      :value="html"
      @input-lang="setHtml"
    />
    <Editor
      language="css"
      display-name="CSS"
      v-model='css'
      @input-lang="setCss"
    />
    <Editor
      language="javascript"
      display-name="JS"
      v-model='js'
      @input-lang="setJs"
    />
  </div>
  <div class="pane">
    <iframe
      :srcDoc="srcDoc"
      title="output"
      sandbox="allow-scripts"
      frameBorder="0"
      width="100%"
      height="100%"
    />
  </div>
</div>
`;

import Editor from './Editor.js';

const APP_PREFIX = 'vuepen-clone';

const App = {
  template,
  components: { Editor },
  data() {
    return {
      html: '',
      css: '',
      js: ''
    };
  },
  created() {
    this.html = this.getLocal('html');
    this.css = this.getLocal('css');
    this.js = this.getLocal('js');
  },
  computed: {
    srcDoc() {
      return `
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
          <style>${this.css}</style>
        </head>
        <body>
          <div id="app"></div>
        <script src="https://cdn.jsdelivr.net/combine/npm/vue@2.6.10,npm/jquery-slim@3.0.0/dist/jquery.slim.min.js,npm/bootstrap@4.5.2/dist/js/bootstrap.min.js"></script>
        <script>${this.js}</script>
        <script>
          const App={
            template:\`<div id="app">${this.html}</div>\`
          };
          new Vue({
            el: '#app',
            render: (h) => h(App)
        });
        </script>
        </body>

      </html>`;
    }
  },
  methods: {
    getLocal(language) {
      const localLanguage = localStorage.getItem(`${APP_PREFIX}-${language}`);
      return localLanguage ? JSON.parse(localLanguage) : '';
    },
    setLocal(language) {
      localStorage.setItem(
        `${APP_PREFIX}-${language}`,
        JSON.stringify(this[language])
      );
    },
    setHtml(value) {
      this.html = value;
      this.setLocal('html');
    },
    setCss(value) {
      this.css = value;
      this.setLocal('css');
    },
    setJs(value) {
      this.js = value;
      this.setLocal('js');
    }
  }
};

export default App;
