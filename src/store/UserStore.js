import { createStore } from 'vuex';
import axios from 'axios';
import { cloneDeep } from 'lodash';

const baseURL = 'http://localhost:8000/api/';

const store = createStore({
  state: {
    users: [],
    loading: false,
    error: {},
    message: null,
    success: null,
    dialog: false,
    formData: {
      name: '',
      lastname: '',
      phone: '',
      email: '',
      age: null,
      size: null,
      weight: null
    },
    formState: 'create'
  },

  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    addUser(state, payload) {
      state.users - state.users.push(payload);
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setMessage(state, payload) {
      state.message = payload;
    },
    setSuccess(state, payload) {
      state.success = payload;
    },
    setFormData(state, payload) {
      state.formData = payload;
    },
    setDialog(state, payload) {
      state.dialog = payload;
    },
    setFormState(state, payload) {
      if (payload === 'create' && !state.dialog) {
        state.formData = {
          name: '',
          lastname: '',
          phone: '',
          email: '',
          age: null,
          size: null,
          weight: null
        };
      }
      state.formState = payload;
    }
  },

  actions: {
    async fetchUsers({ commit }, URL = '') {
      commit('setLoading', true);
      try {
        const response = await axios.get(`${baseURL}${URL}`);
        commit('setUsers', response.data.response);
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },

    async addUser({ commit, state }) {
      commit('setLoading', true);
      try {
        axios
          .post(`${baseURL}users`, state.formData)
          .then(({ data: { response, message } }) => {
            commit('addUser', response);
            commit('setMessage', message);
            commit('setFormState', 'create');
          })
          .catch((error) => {
            let newError = {};
            for (const key in error.response.data.error) {
              newError[key] = error.response.data.error[key][0];
            }
            throw new Error(error);
          })
          .finally(() => {
            commit('setLoading', false);
            setTimeout(() => {
              commit('setMessage', null);
            }, 2000);
          });
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateUser({ commit, state }) {
      try {
        commit('setLoading', true);
        axios
          .put(`${baseURL}users/${state.formData.id}`, state.formData)
          .then((response) => {
            commit('setSuccess', response.data.message);
          });
      } catch (error) {
        console.error(error);
      } finally {
        commit('setFormState', 'create');
        commit('setLoading', false);
        setTimeout(() => {
          commit('setSuccess', null);
        }, 2000);
      }
    },

    async deleteUser({ commit, state }, id) {
      commit('setLoading', true);
      try {
        const response = await axios.delete(`${baseURL}users/${id}`, {
          isDelete: true
        });
        if (response.data.success) {
          const updatedUser = state.users.filter((item) => item.id !== id);
          commit('setUsers', updatedUser);
          commit('setSuccess', response.data.message);
        } else {
          commit('setError', response.error);
        }
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
        setTimeout(() => {
          commit('setSuccess', null);
        }, 2000);
      }
    },

    dialogAction( { commit }, value ) {
      commit('setDialog', value);
    }
  }
});

export default store;
