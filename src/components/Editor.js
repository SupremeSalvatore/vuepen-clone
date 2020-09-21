const template = `
<div class="editor-container"
:class="classes.editor">
  <div class="editor-title">
    {{displayName}}
    <button
      type="button"
      class="expand-collapse-btn"
      @click="toggleOpen"
    >
      <i class="fas" :class="classes.icon"></i>
    </button>
  </div>
  <codemirror
    @input="$emit('input-lang',$event)"
    :value="value"
    class="code-mirror-wrapper"
    :options="cmOption"
  />
</div>
`;

const Editor = {
  template,
  props: {
    language: {
      type: String,
      default: ''
    },
    displayName: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: true,
      cmOption: {
        tabSize: 2,
        lineWrapping: true,
        lint: true,
        mode: this.language,
        lineNumbers: true,
        styleActiveLine: true,
        line: true,
        matchBrackets: true,
        theme: 'monokai',
        extraKeys: { Ctrl: 'autocomplete' }
      }
    };
  },
  computed: {
    classes() {
      return {
        editor: {
          ['editor-container']: this.isOpen,
          ['collapsed']: !this.isOpen
        },
        icon: {
          ['fa-compress-alt']: this.isOpen,
          ['fa-expand-alt']: !this.isOpen
        }
      };
    }
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  }
};

export default Editor;