// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
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
/** 预约事项列表 */
export async function getYysx(params: any) {
  let tempData = {
    api: "system",
    request: JSON.stringify(params),
    // request:"{\"pageSize\":10,\"pageNumber\":1,\"configType\":1}",
    method: "selectPage"
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
  return request<API.LoginResult>('/manager/application/json', {
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
/** 系统列表 */
export async function getXtlb(params: any) {
  let tempData = {
    api: "system",
    request: JSON.stringify(params),
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
export async function getJslb(params: any) {
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
    body: JSON.stringify({
      // api: "",
      request: JSON.stringify(params),
      // method: "saveUserAuth"
    })
  });
}
/** 角色修改 */
export async function getJsxg(params: any) {
  return request<API.LoginResult>('/manager/updateUserAuth.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // api: "",
      request: JSON.stringify(params),
      // method: "saveUserAuth"
    })
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
