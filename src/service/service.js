import { useHistory } from 'react-router-dom';
import CryptoJS, { SHA256 } from 'crypto-js';
import Encrypt from 'jsencrypt';
import { merge } from 'lodash';
import { EncryptKeys } from './api';

// const BASE_URL = 'http://ccbsz.cpay-service.com';
const BASE_URL = 'http://139.196.226.55:8889/acps-ccb-api/v3';

export const getRandomString = (len) => {
  /**
   * 字符串位数 默认9位
   *
   * @param length number
   */
  const length = len || 9;

  /**
   * 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
   *
   * @param $chars string
   */
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /**
   * 最大长度
   *
   * @param maxPos number
   */
  const maxPos = $chars.length;

  let message = '';

  /**
   * 生成随机字符串
   */
  for (let i = 0; i < length; i++) {
    message += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return message;
};

export const getCommonFetchBody = (params) => {
  return {
    ...params,
    version: 'V3.0',
    channel: 'H5',
  };
};

/**
 * 签名摘要
 *
 * 签名摘要生成的通用步骤如下：
 * 设所有发送或者接收到的数据为集合 M，
 * 将集合 M 内非空参数值的参数 按照参数名 ASCII 码从小到大排序（字典序），
 * 使用 URL 键值对的格式（即 key1=value1&key2=value2…）拼接成字符串 stringA，
 * 再对 stringA 进 行 sha256，最后转十六进制字符串为最终签名摘要。
 * 特别注意以下重要规则：
 * ◆ 参数名 ASCII 码从小到大排序（字典序）；
 * ◆ 如果参数的值为空不参与签名；
 * ◆ 参数名区分大小写；
 * ◆ 传送的 sign 参数不参与签名，将生成的签名与该 sign 值作校验。
 */
export const getSign = (data) => {
  /**
   * 参数数组
   *
   * @param params
   */
  const params = [];

  // 第一步把所有数据拆成数组
  for (let key in data) {
    params.push({ key: key, value: data[key] });
  }

  // 第二步把数组按照 ASCII 值进行排序
  const sortAsciiParams = sortByAscii(params);

  /**
   * 拼接成字符串
   *
   * @param paramsString
   */
  let paramsString = '';

  // 使用 URL 键值对的格式（即 key1=value1&key2=value2…）拼接成字符串 stringA
  for (let i = 0; i < sortAsciiParams.length; i++) {
    if (i !== 0) {
      paramsString += '&';
    }

    if (typeof sortAsciiParams[i].value === 'string') {
      paramsString += `${sortAsciiParams[i].key}=${sortAsciiParams[i].value}`;
    } else {
      paramsString += `${sortAsciiParams[i].key}=${JSON.stringify(
        sortAsciiParams[i].value
      )}`;
    }
  }

  /**
   * 加上key
   *
   * @param {key} string
   */
  const key = '62f46484d4667486d4861417073501';
  const paramsStringWithKey = paramsString + `&key=${key}`;

  /**
   * sha256加密的字符串
   *
   * @param shaString
   */
  const shaString = SHA256(paramsStringWithKey).toString();
  console.log(`
    ---- 开始加密 ----
    拼接字符串: ${paramsStringWithKey} \n
    sha256加密之后: ${shaString} \n
    ---- 加密结束 ----
  `);

  return shaString.toUpperCase();

  /**
   * 对数据进行 RSA 加密
   */
  const encrypt = new Encrypt();
  // encrypt.setPublicKey(EncryptKeys.PublicKey);
  encrypt.setPrivateKey(EncryptKeys.PrivateKey);
  // const encryptString = encrypt.encrypt(shaString);
  const encryptString = encrypt.sign(paramsString, CryptoJS.SHA1, 'sha1');

  const hexString = stringToHex(encryptString);

  console.log(`
    ---- 开始加密 ---- 
    拼接字符串: ${paramsString} \n
    SHA1WITHRSA加密之后: ${encryptString} \n
    转16进制之后: ${hexString}
    ---- 加密结束 ----
  `);

  return hexString;
  // return '415EAB9133366E9CDC9650B2EE7BE0C993D677558629B2A8340B8DC8DDF9E177FC1A00E5208DEAB8B5E6F7BDFD2A16B62B335F5AB2448A32BA93DF4E5DE520484733BD483A819DE94B9D47BC461570227050FD373C7886FAA16B6F2CA0BBE3F63335EDF1AD3CBD3F3A75961C7C2B2F6C0EC6E46DB0ED62774C975E94D34E3AAA';
  return '6053F6088FBAD5CBF887179BD50F4A38C30D1E88C15BF27C14B56511C94BFB36FA4F108337EF7D46223BC0683E429F903AD9D1C23F432FDF69A0FE8E973678B28238E5AE07C3A9F8477A5918D0EBE7F61813F5FBE7FC1D322D439CC73AD1750902FD4FD92E6848EF381863FAB3EE451C959B0AF43E151EF6F90D900063BB57FD';
};

export function sortByAscii(params) {
  const data = merge([], params);
  data.sort((a, b) => {
    for (let i = 0; i < a.key.length; i++) {
      // 如果一样则继续比较
      if (a.key.charCodeAt(i) === b.key.charCodeAt(i)) {
        continue;
      }
      // 根据ASCII大小进行比较
      return a.key.charCodeAt(i) - b.key.charCodeAt(i);
    }
  });

  return data;
}

// 十进制转16进制
export function stringToHex(str) {
  let val = '';

  for (var i = 0; i < str.length; i++) {
    val += str.charCodeAt(i).toString(16);
  }

  return val;
}

/**
 * @todo [传入条件返回格式化请求数据]
 * @param json
 */
export const jsonToQueryString = (json) => {
  const field = Object.keys(json)
    .map((key) => {
      if (json[key] !== undefined) {
        return key + '=' + json[key];
      } else {
        return '';
      }
    })
    .filter((f) => !!f)
    .join('&');
  return field.length > 0 ? `?${field}` : '';
};

export const formatSearch = (search) => {
  let result = {};

  if (search === '') {
    return result;
  }

  search
    .replace('?', '')
    .split('&')
    .forEach((item) => {
      result[item.split('=')[0]] = item.split('=')[1];
    });
  return result;
};

export const useQueryParam = (paramId) => {
  const history = useHistory();
  const params = formatSearch(history.location.search);
  return params[paramId] || undefined;
};

/**
 * fetch 工具
 *
 * @author Ghan
 * @class ApiRequest
 */
class ApiRequest {
  baseOptions(params, method = 'GET', hasHeader) {
    let { url, data } = params;
    let contentType = 'application/json;charset=utf-8';
    // let contentType = 'Content-Type:application';
    contentType = params.contentType || contentType;
    const option = {
      method: method,
      headers: {
        'Content-Type': contentType,
      },
      // credentials: 'include',
      ...(method === 'POST' ? { body: data } : {}),
    };
    if (hasHeader === false) {
      delete option.headers;
    }
    return fetch(`${BASE_URL}${url}`, option)
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }

  get(url, data = '') {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post(url, data) {
    const requestData = {
      request: getCommonFetchBody(data),
      sign: getSign(getCommonFetchBody(data)),
    };

    let params = {
      url,
      data: typeof data === 'string' ? data : JSON.stringify(requestData),
      // data:
      //   '{"request":{"version":"V3.0","channel":"APP","acq_code":"283499","usr_Id":"3202149344"},"sign":"415EAB9133366E9CDC9650B2EE7BE0C993D677558629B2A8340B8DC8DDF9E177FC1A00E5208DEAB8B5E6F7BDFD2A16B62B335F5AB2448A32BA93DF4E5DE520484733BD483A819DE94B9D47BC461570227050FD373C7886FAA16B6F2CA0BBE3F63335EDF1AD3CBD3F3A75961C7C2B2F6C0EC6E46DB0ED62774C975E94D34E3AAA"}',
    };
    return this.baseOptions(params, 'POST');
  }

  postFormData(url, data) {
    let params = {
      url,
      data: data,
    };
    return this.baseOptions(params, 'POST', false);
  }

  put(url, data) {
    let option = { url, data };
    return this.baseOptions(option, 'PUT');
  }

  delete(url, data = '') {
    let option = { url, data };
    return this.baseOptions(option, 'DELETE');
  }
}

const api = new ApiRequest();

export { api };
