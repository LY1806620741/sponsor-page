
作用为开启https支持，pwa需要https

安装[mkcert](https://github.com/FiloSottile/mkcert)

```shell
# 安装可信颁发机构(CA)
mkcert -install

# 在ca目录生成localhost的证书
mkcert localhost
```