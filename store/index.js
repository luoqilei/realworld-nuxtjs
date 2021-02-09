const cookieParser = process.server ? require('cookieParser') : undefined
// 为了防止在服务端渲染期间数据冲突
export const state = () => {
    return {
        // 当前登录用户登录信息和状态
        user: null
    }
}

export const mutations = {
    setUser (state, payload) {
        state.user = payload
    }
}

export const actions = {
    // 特殊的 action 方法，会在服务端渲染期间自动调用
    // 初始化容器数据，传递数据给客户端使用
    nuxtServerInit ({ commit }, {req}) {
        let user = null

        if (req.headers.cookie) {
            const parsed = cookieParser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (error) {
                
            }
            commit('setUser', user)
        }
    }
}