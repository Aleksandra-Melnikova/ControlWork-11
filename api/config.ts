import path from "path";

const rootPath  = __dirname;

const config =  {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    db: 'mongodb://localhost/melnikova-test11',
};


export default config;