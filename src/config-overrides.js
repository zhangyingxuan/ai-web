/* config-overrides.js */
const {
    override,
    addLessLoader, // less配置函数
    fixBabelImports, // 按需加载配置函数
    addBabelPlugins, // babel插件配置函数
    addWebpackAlias,
    addWebpackPlugin
} = require('customize-cra')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

process.env.GENERATE_SOURCEMAP = "false";
module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#24292e'
        }
    }),
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src"),
    }),
    addBabelPlugins( // 支持装饰器
        [
            '@babel/plugin-proposal-decorators',
            {legacy: true}
        ]
    ),
    fixBabelImports('import', { // antd 按需加载
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    }),
    // 其他配置 ...,
    addWebpackPlugin(new ProgressBarPlugin({
            complete: "█",
            format: `${chalk.green('Building')} [ ${chalk.green(':bar')} ] ':msg:' ${chalk.bold('(:percent)')}`,
            clear: true
        })
    )
)