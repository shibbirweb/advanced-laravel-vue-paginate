export default {
  actionUpdateCurrentPage({ commit }, payload) {
    commit("mutationUpdateCurrentPage", payload);
  },
  actionOnEachSide({ commit }, payload) {
    commit("mutationOnEachSide", Number.parseInt(payload.target.value));
  },
  actionShowNextPrev({ commit }, payload) {
    commit("mutationShowNextPrev", payload.target.value === "true");
  },
  actionDots({commit}, payload){
    commit("mutationDots", payload.target.value)
  }
};
