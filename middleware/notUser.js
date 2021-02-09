/**
 * 校验是否登录的中间件
 * 会在渲染之前自动调用
 */
export default function ({ store, redirect }) {
    if (store.state.user) {
        return redirect('/')
    }
}