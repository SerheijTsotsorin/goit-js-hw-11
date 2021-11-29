import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/';
const apiKey = "24371502-78d84e7e9c9a76cd0b2a52a11";

export default {
    searchQuery: "",
    page: 1,
    async fetchImages() {
        const url = `api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=40&key=${apiKey}`;
        try {;
            const { data } = await axios.get(url);
            this.incrementPage();
            return data;
            
        } catch (error) {
            throw error;
        }
    },
    incrementPage() {
    this.page += 1
    },
    resetPage() {
        this.page = 1
    },
    get query() {
        return this.searchQuery;
        },
        set query(value) {
            this.searchQuery = value;
    }    

}
