const template = `
<div id="app">
  <div class="pane top-pane">
    <Editor
      language="html"
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
      js: ``
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
        <body>${this.html}</body>
        <style>${this.css}</style>
        <script>${this.js}</script>
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
      this.setLocal('html');
    },
    setJs(value) {
      this.js = value;
      this.setLocal('html');
    }
  }
};

export default App;
