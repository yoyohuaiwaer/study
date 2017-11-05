/**
 * Created by A on 2016/12/5.
 */
module.exports = {
    entry:'./js/entry.js',
    output: {
        path: __dirname,
        filename:'bundle.js'
    },
    module:{
        loader:[
            {
                test:/\.cssz$/,
                loader:'style!css'
            }
        ]
    }
};