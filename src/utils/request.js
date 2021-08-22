import axios from "axios";
// 参加axios实例
const instance=axios.create({
  baseURL:'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  // 超过十秒算超时
  timeout:10000
})

// get封装请求
export const get = (url, params={}) => {
  return new Promise((resolve, reject) => {
    // 直接使用axios实例instance去get，baseURL，timeout默认实例都有了，所以这里不需要设置
    instance.get(url, {params}).then((response)=>{
      resolve(response.data)
    },err=>{
      reject(err)
    })
  });
};
// post封装请求
// 第一个参数url，第二个数据默认为空
export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    // post第三个是请求时候发送的参数
    // 直接使用axios实例instance去post，baseURL，timeout默认实例都有了，所以这里不需要设置
    instance
      .post(url, data, {
        // application/json作为请求头
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
  });
};
