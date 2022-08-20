import  axios  from 'axios';
const state = {
    posts: [],
    post: {},
};
const getters = {
    getPosts: (state) => state.posts,
    getPost: (state) => state.post,
};
//update the state with the new post
const mutations = {
    setPosts: (state, posts) => state.posts = posts,
    setPost: (state, post) => state.post = post,
    removePost: (state,post) => state.posts.splice(state.posts.indexOf(post),1)
    
};
const actions = {
//steps 1 
// call data base
//steps 2
// update to the state with the new post
getPosts(context){
    return new Promise((resolve, reject)=>{
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then((res)=>{
            context.commit('setPosts', res.data);
            resolve(res);
        })
        .catch((error)=>{
            reject(error);
        })
    })


    },
showPost({commit}, id){
    return new Promise((resolve, reject)=>{
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res)=>{
            commit('setPost', res.data);
            resolve(res)
        })
        .catch((error)=>{
            reject(error)
        })
    })

},
deletePost({commit}, post){
    return new Promise((resolve, reject)=>{
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      .then((res)=>{
        commit('removePost', post);
        resolve(res)
      })
      .catch((error)=>{
        reject(error)
      })
    })



}
};
export default {
    state,
    getters,
    mutations,
    actions,

}