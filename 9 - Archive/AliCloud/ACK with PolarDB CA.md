团队抱怨证书太长？不方便使用。
理解为secretRef的时候团队嫌弃每个服务都要写一次，开始调查
现在有两种用法：

1.  将polardb的证书直接放到镜像里：  ns-hkg-shared-system下面的rcs
2.  直接放到K8S  secret里： 还在找....
   #2 ns-hkg-customer-system/hkg-mkt-ods-polar-cert

dep-hk-ods-marketing-service-1-0-7-snapshot -n ns-hkg-customer-system

### Idea
#### 着手优化secret 引用
1. 统一集成方式？
2. ~~Node上为啥没有？~~
   ~~node_image: AliyunLinux3ContainerOptimized~~
   ~~[PolarDB SSL](https://www.alibabacloud.com/help/en/polardb/polardb-for-postgresql/configure-ssl-encryption) 从文档上来看Aliyun默认没有把CA集成到系统镜像~~
   记错了
3. Kyveron
   https://kyverno.io/policies/other/add-certificates-volume/add-certificates-volume/
4. Patch

#### CA cert as ENV var
和架构聊了后发现，root case是CA是个以str的形式用env放到pod进去的。
<details>

<summary>1.因为阿里的CA证书里塞了太多东西，一定的裁剪是可行的。</summary>

```
openssl crl2pkcs7 -nocrl -certfile /Users/luruilr/Downloads/ApsaraDB-CA-Chain\ \(1\)/ApsaraDB-CA-Chain.pem  \
| openssl pkcs7 -print_certs -noout
subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=cn-hangzhou
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ap-southeast
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-beijing region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-hongkong region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-shenzhen region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-qingdao region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB us-west region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB us-east region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-shanghai region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB japan region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB germany region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB dubai region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB australia region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB australia region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB taihu region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB zhangbei region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ningxiaqiye region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-southeast-3 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-huhehaote region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-south-1 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-southeast-5 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-southeast-5 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-chengdu region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB eu-west-1 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB mngr-onecs region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-hangzhou region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-southeast region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-beijing region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-hongkong region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-shenzhen region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-qingdao region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB us-west region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB us-east region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-shanghai region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB japan region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB germany region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB dubai region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB australia region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB taihu region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB zhangbei region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ningxiaqiye region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-southeast-3 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-huhehaote region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-south-1 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-southeast-5 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-chengdu region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB eu-west-1 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB mngr-onecs region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-beijing-gov region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-beijing-gov region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB mngr-onecs-test1 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB polardb-pg-public region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-heyuan region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-wulanchabu region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-guangzhou region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-southeast-6 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB rus-west-1 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-hochiminh-ant region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB rds-aliyun-pre region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-northeast-2 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-southeast-7 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB me-central-1 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cn-shanghai-ant region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB mayi_bank_cl_cloud region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB singapore-pre region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB rds-aliyun-america region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB cloud-spe region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB hongkong region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB hongkong region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB mexico region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB govnorth region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB szfin region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB szfin region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB atlanta region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB guangzhou region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB shhfin region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB shenzhen region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB bjfin region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB qingdao region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB beijing region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB zhongwei region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB nantong region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB shanghai region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA

subject=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB ap-southeast-8 region CA
issuer=C=CN, ST=ZheJiang, L=HangZhou, O=Alibaba, OU=Aliyun, CN=ApsaraDB Root CA
```

</details>
2.app team，通过环境变量的形式给到服务，所以会提示过长。‘
已经给到架构建议，该用文件的形式使用。

写[文档](https://manulife-asia.atlassian.net/wiki/spaces/HKDO/pages/edit-v2/1621066154?draftShareId=abe78937-8bed-4890-b96f-3dbd9dba49c3)的时候，发现RSF框架限制了volume的使用，⬆️的方案是行不通的。
- 列出可用代替方案
- 讨论后续
### Result
