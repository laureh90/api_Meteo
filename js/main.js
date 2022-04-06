import accueil from './components/accueil.js'
import info from './components/info.js'

const app = {

    components: {
        "accueil": accueil,
        "info": info,
    },
    data() {
        return {
            page: "accueil",
            info: null,
        }
    },
    methods: {
        changerPage(nouvelle_page, info_page) {
            //page dans le v-iff de index.html
            this.page = nouvelle_page
            this.info = info_page
        }
    }
}

Vue.createApp(app).mount("#app")