import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from "path";
import vitePluginImp from "vite-plugin-imp";

// https://vitejs.dev/config/
export default defineConfig( {
  alias: [ { find: "@", replacement: path.resolve( __dirname, "src" ) } ],
  plugins: [
    reactRefresh(),
    vitePluginImp( {
      libList: [
        {
          libName: "antd",
          style: ( name ) => `antd/lib/${ name }/style/index.css`,
        },
      ],
    } ),
  ],
} )
