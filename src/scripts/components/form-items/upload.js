import formItemMixin from './form-item';

export default {
  mixins: [formItemMixin],
  data() {
    return {
      files: []
    };
  },
  computed: {
    canUpload() {
      return (
        !this.config.maxFileCount ||
        this.files.length < this.config.maxFileCount
      );
    }
  },
  watch: {
    data(val) {
      if (!val.value.length) {
        this.files = [];
      }
    }
  },
  mounted() {
    if (this.config.value) {
      this.files = this.config.value.map(({ path, href }) => {
        return {
          url: href,
          path,
          name: path.split('/').pop()
        };
      });
    }
  },
  methods: {
    async upload(type, file) {
      let formData = new FormData();
      formData.append('type', type);
      formData.append('file', file.sourceFile);
      let { path } = await this.$store.fileUpload(formData);

      file.path = path;

      this.files.push(file);
    },
    async onChange(type, files) {
      if (this.config.maxFileCount) {
        let count = this.config.maxFileCount - this.files.length;
        if (count < 0) {
          count = 0;
        }

        if (count) {
          while (count--) {
            let file = files.shift();

            await this.upload(type, file);

            if (!files.length) {
              break;
            }
          }
        }
      } else {
        // NOTE: Don’t ever use `await` with `forEach`
        for (let file of files) {
          await this.upload(type, file);
        }
      }

      this.callback();
    },
    removeFile(index) {
      this.files.splice(index, 1);

      this.callback();
    },
    callback() {
      const value = this.files.map((file) => file.path); // NOTE: 格式化上传文件路径

      this.$emit('change', this.config.key, value);
    }
  }
};
