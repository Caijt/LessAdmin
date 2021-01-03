export default {
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCollapse: false,
      maxModuleMenu: 0, //顶部最大显示的菜单数量，防止菜单数量过多导致页面变形
      modulePath: ""
    }
  },
  created() {
    this.maxModuleMenu = Math.floor((document.body.clientWidth - 350) / 100);
  },
  watch:{
    $route: {
      handler(v) {
        this.modulePath = this.$route.path.substr(0,this.$route.path.indexOf("/",1)) || this.$route.path;
      },
      immediate: true
    }
  },
  computed: {
    subMenu() {
      let menu = this.$store.state.sys.menus.find(item => {
        return "/" + item.path == this.modulePath;
      });
      if (!menu) {
        return [];
      }
      return menu.children || [];
    },
    menuPath() {
      if (this.$route.meta.isPage) {
        let index = this.$route.path.lastIndexOf("/");
        return this.$route.path.substr(0, index);
      } else {
        return this.$route.path;
      }
    }
  },
  methods: {
    collapseMenu() {
      this.isCollapse = !this.isCollapse;
    },
    selectModule(index, indexPath) {
      if (index) {
        this.modulePath = index;
      }
      if (this.subMenu.length == 0 && this.$route.path != index) {
        this.$router.push({ path: index });
      }
    }
  }
}