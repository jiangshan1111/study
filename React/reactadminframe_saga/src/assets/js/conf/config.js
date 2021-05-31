let prodUrl="http://vueshop.glbuys.com/api";
let devUrl="/api";
export default {
    baseApi:process.env.NODE_ENV==='production'?prodUrl:devUrl,
    path:"/",
    token:"1ec949a15fb709370f"
}
