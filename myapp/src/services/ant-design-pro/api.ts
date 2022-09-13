// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/manager/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/out', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(params: any) {
  return request<API.LoginResult>('/manager/send.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}

/** 证据列表 */
export async function getZjlb(params: any) {
  let tempData = {
    api: "forensics",
    request: JSON.stringify(params),
    method: "getNotaries"
  }
  return request<API.LoginResult>('/manager/getNotaries.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
export async function getZjxq(params: any) {
  let tempData = {
    api: "forensics",
    request: params,
    method: "getForensics"
  }
  return request<API.LoginResult>('/manager/getNotaries.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 预约事项列表 */
export async function getYysx(params?: any) {
  let tempData = {
    api: "system",
    // request: JSON.stringify(params),
    request: "{\"pageSize\":1,\"pageNumber\":100,\"configType\":1}",
    method: "selectSystemConfigPage"
  }
  return request<API.LoginResult>('/manager/getReserveMatters.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 系统保存 */
export async function getXtpz(params: any) {
  let tempData = {
    api: "system",
    request: JSON.stringify(params),
    method: "saveSystem"
  }
  return request<API.LoginResult>('/manager/saveSystem.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 系统修改 */
export async function getXtxg(params: any) {
  let tempData = {
    api: "system",
    request: JSON.stringify(params),
    method: "updateSystem"
  }
  return request<API.LoginResult>('/manager/updateSystem.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 预约删除 */
export async function yysc(params: any) {
  let tempData = {
    api: "reserve",
    request: params,
    method: "deleteReserve"
  }
  return request<API.LoginResult>('/manager/deleteReserve.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 预约事项删除 */
export async function yysxsc(params: any) {
  let tempData = {
    api: "system",
    request: params,
    method: "deleteSystem"
  }
  return request<API.LoginResult>('/manager/deleteSystem.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 金额删除 */
export async function jesc(params: any) {
  let tempData = {
    api: "system",
    request: params,
    method: "deleteSystem"
  }
  return request<API.LoginResult>('/manager/deleteSystem.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 人员删除 */
export async function rysc(params: any) {
  let tempData = {
    api: "userAuth",
    request: params,
    method: "deleteUserAuth"
  }
  return request<API.LoginResult>('/manager/deleteUserAuth.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 人员详情 */
export async function ryxq(params: any) {
  let tempData = {
    api: "userAuth",
    request: params,
    method: "deleteUserAuth"
  }
  return request<API.LoginResult>('/manager/selectUserAuth.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}
/** 下载 */
export async function downLoadFun(params: any) {
  let tempData = {
    api: "forensics",
    request: params,
    method: "getForensicsZip"
  }
  return request<API.LoginResult>('/manager/forensics.zip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 预约状态修改 */
export async function yyzt(params: any) {
  let tempData = {
    // api: "system",
    request: JSON.stringify(params),
    // method: "updateSystem"
  }
  return request<API.LoginResult>('/manager/updateReserveStatus.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params
  });
}
/** 出证状态jine修改 */
export async function czsz(params: any) {
  let tempData = {
    api: "forensics",
    request: JSON.stringify(params),
    method: "updateNotaryStatus"
  }
  return request<API.LoginResult>('/manager/updateNotaryStatus.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}

/** 系统列表 */
export async function getXtlb(params: any) {
  let tempData = {
    api: "system",
    request: JSON.stringify({
      pageSize: 1,
      pageNumber: 100,
      configType: params,
    }),
    method: "selectSystemConfigPage"
  }
  return request<API.LoginResult>('/manager/selectSystemConfigPage.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 角色列表 */
export async function getJslb(params?: any) {
  return request<API.LoginResult>('/manager/getRoleEnums.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({
    //   api: "",
    //   request:"",
    //   method: ""
    // })
  });
}
/** 角色保存 */
export async function getJsbc(params: any) {
  return request<API.LoginResult>('/manager/saveUserAuth.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params
  });
}
/** 角色修改 */
export async function getJsxg(params: any) {
  return request<API.LoginResult>('/manager/updateUserAuth.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params
  });
}
/** 人员列表 */
export async function getRylb(params: any) {
  let tempData = {
    api: "userAuth",
    request: JSON.stringify(params),
    method: "selectUserAuthPage"
  }
  return request<API.LoginResult>('/manager/selectUserAuthPage.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 预约列表 */
export async function getYylb(params: any) {
  let tempData = {
    api: "reserve",
    request: JSON.stringify(params),
    method: "selectReservePage"
  }
  return request<API.LoginResult>('/manager/selectReservePage.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 预约详情 */
export async function getYyxq(params: any) {
  let tempData = {
    api: "reserve",
    request: params,
    method: "getReserve"
  }
  return request<API.LoginResult>('/manager/selectReservePage.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}
/** 状态枚举类型 */
export async function getLx(params?: { [key: string]: any },) {
  return request<API.LoginResult>('/manager/getNotarizationEnums.json', {
    method: 'GET',
    // data: {
    //   api: "forensics",
    //   // request: JSON.stringify(rqParams),						// 领域模型json字符串
    //   method: "saveForensics"
    // },
  });
}
/** 证据类型枚举 */
export async function getZjlx(params?: { [key: string]: any },) {
  return request<API.LoginResult>('/manager/getEvidenceEnums.json', {
    method: 'GET',
    // data: {
    //   api: "forensics",
    //   // request: JSON.stringify(rqParams),						// 领域模型json字符串
    //   method: "saveForensics"
    // },
  });
}

/** 电签列表 */
export async function getDqlb(params: any) {
  let tempData = {
    api: "reserve",
    request: JSON.stringify(params),
    method: "selectReservePage"
  }
  return request<API.LoginResult>('/manager/case/search.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  });
}
/** 电签详情 */
export async function getDqDeatil(params: any) {
  return request<API.LoginResult>('/manager/case/query.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}
/** 通过名字查用户信息 */
export async function getNameData(params: any) {
  return request<API.LoginResult>('/manager/user/like.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}
/** 电签下载 */
export async function dqDrown(params: any) {
  return request<API.LoginResult>('/manager/flow/download.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}
/** 电签文件上传 */
export async function wjsc(params: any) {
  return request<API.LoginResult>('/manager/signdoc/upload.json', {
    method: 'POST',
    headers: {
      authorization: 'authorization-text',
    },
    params,
  });
}
/** 主体列表 */
export async function ztList(params: any) {
  let tempData = {
    api: "reserve",
    request: JSON.stringify(params),
    method: "selectReservePage"
  }
  return request<API.LoginResult>('/manager/selectReservePage.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tempData)
  });
}

/** 合约人列表 */
export async function yzList(params: any) {

  return request<API.LoginResult>('/manager/user/search.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  });
}
/** 合约人列表 */
export async function getSeals(params: any) {

  return request<API.LoginResult>('/manager/seal/getSeals.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
}
/** 印章添加 */
export async function yzAdd(params: any) {

  return request<API.LoginResult>('/manager/seal/create.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  });
}
/** 平台注册 */
export async function ptCreate(params: any) {

  return request<API.LoginResult>('/manager/platform/register.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  });
}
/** 添加主体 */
export async function ztCreate(params: any) {

  return request<API.LoginResult>('/manager/user/create.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  });
}
/** 印章添加 */
export async function yzDeatil(params: any) {

  return request<API.LoginResult>('/manager/user/query.json?', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params
  });
}


/** 电签第一步 */
export async function addOne(params: any) {
  return request<API.LoginResult>('/manager/signdoc/save.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params
  });
}
/** 电签添加 */
export async function dqAdd(params: any) {
  return request<API.LoginResult>('/manager/updateUserAuth.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params
  });
}
/** 主体添加 */
export async function ztAdd(params: any) {
  return request<API.LoginResult>('/manager/signer/add.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params
  });
}
/** 主体修改 */
export async function changeZt(params: any) {
  return request<API.LoginResult>('/manager/updateUserAuth.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params
  });
}
/** 主体删除 */
export async function ztDelect(params: any) {
  return request<API.LoginResult>('/manager/signer/delete.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params
  });
}

/** 流程 */
export async function lcOne(params: any) {
  return request<API.LoginResult>('/manager/flow/create.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params
  });
}
/** 流程 */
export async function lcTwo(params: any) {
  return request<API.LoginResult>('/manager/flow/addoc.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params
  });
}
/** 流程 */
export async function lcThree(params: any) {
  return request<API.LoginResult>('/manager/flow/addsigner.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params
  });
}
/** 流程 */
export async function lcFore(params: any) {
  return request<API.LoginResult>('/manager/flow/start.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params
  });
}
/** 手动获取链接 */
export async function lj(params: any) {
  return request<API.LoginResult>('/manager/flow/signurl.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
