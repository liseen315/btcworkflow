# webpack+gulp 多入口打包
webpack4+ + gulp 支持多入口打包,支持hash资源

## 目录说明
```
├── README.md
├── application   #一般为模板所在目录
├── gulpfile.js   #工作流入口
├── node_modules  
├── package-lock.json
├── package.json
├── public        #dist目录
├── src           #源目录包括css,js,images等
└── workflow      #工作流目录
```
# Development
```
git clone https://github.com/liseen315/btcworkflow.git
cd btcworkflow
npm install --registry=https://registry.npm.taobao.org
npm run dev 

```

# Release && hash assets
```
git clone https://github.com/liseen315/btcworkflow.git
cd btcworkflow
npm install --registry=https://registry.npm.taobao.org
npm run release 

```

# clean public
```
git clone https://github.com/liseen315/btcworkflow.git
cd btcworkflow
npm install --registry=https://registry.npm.taobao.org
npm run del 

```

当前缺少dll的机制.稍等片刻.

