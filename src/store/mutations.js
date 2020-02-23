export default {
    mutationUpdateCurrentPage(state, payload) {
        state.laravelData.current_page = payload;
    },
    mutationOnEachSide(state, payload) {
        state.onEachSide = payload;
    },
    mutationShowNextPrev(state, payload){
        state.showNextPrev = payload
    },
    mutationDots(state, payload){
        state.dots = payload
    }
};
