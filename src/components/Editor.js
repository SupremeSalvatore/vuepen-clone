const template = `
<div class="editor-container"
:class="classes.editor">
  <div class="editor-title">
    <span>{{displayName}}
      <button
      type="button"
      @click="clearStorage"
      class="expand-collapse-btn"
      >
        <i class="fas fa-trash-alt text-left"></i>
      </button>
    </span>

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
        mode: this.language,
        lineNumbers: true,
        styleActiveLine: true,
        line: true,
        matchBrackets: true,
        theme: 'monokai',
        keyMap: 'sublime',
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
    },
    clearStorage() {
      localStorage.removeItem(`vuepen-clone-${this.displayName.toLowerCase()}`);
      this.$emit('input-lang', '');
    }
  }
};
export default Editor;
