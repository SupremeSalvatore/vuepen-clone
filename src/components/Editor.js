const template = `
<div class="editor-container"
:class="classes.editor">
  <div class="editor-title">
    <h3>{{displayName}}
      <button
      type="button"
      @click="$emit('clear-storage',displayName)"
      class="icon-btn"
      :title="generateTitle.clear"
      >
        <i class="fas fa-trash-alt text-left"></i>
      </button>
      <button
      type="button"
      @click="copyToClipboard"
      class="icon-btn"
      :title="generateTitle.copy"
      >
        <i class="fas fa-copy text-left"></i>
      </button>
    </h3>

    <button
      type="button"
      class="icon-btn"
      :title="generateTitle.resize"
      @click="toggleOpen"
    >
      <i class="fas" :class="classes.icon"></i>
    </button>
  </div>
  <codemirror
    @input="$emit('input-lang',$event,displayName)"
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
    generateTitle() {
      return {
        clear: `Clear ${this.displayName.toUpperCase()}`,
        copy: `Copy ${this.displayName.toUpperCase()}`,
        resize: this.isOpen ? 'Collapse' : 'Expand'
      };
    },
    classes() {
      return {
        editor: {
          'editor-container': this.isOpen,
          collapsed: !this.isOpen
        },
        icon: {
          'fa-compress-alt': this.isOpen,
          'fa-expand-alt': !this.isOpen
        }
      };
    }
  },
  methods: {
    copyToClipboard() {
      const textArea = document.createElement('textarea');
      textArea.value = this.value;
      textArea.style = {
        top: '0',
        left: '0',
        position: 'fixed'
      };
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      alert('Copied!');
      document.body.removeChild(textArea);
    },
    toggleOpen() {
      this.isOpen = !this.isOpen;
    }
  }
};
export default Editor;
