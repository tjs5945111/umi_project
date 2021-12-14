import { Badge, Tag } from 'antd';

export default (status, data?: any) => {
  const ratio = data?.ratio || 0;
  return {
    DRAFT: <Badge color="#bfbfbf" text="草稿" />,
    UPDATED: <Badge color="#faad14" text="有更新" />,
    PROCESSING: <Badge color="#faad14" text="审批中" />,
    PROCESSING_D: <Badge color="#faad14" text="下线审批中" />,
    PRE_RELEASED: <Badge color="#00C78C" text="预发布" />,
    DELETED: <Badge color="#f50" text="删除" />,
    WHITE_LIST_GRAY: <Badge color="#4169E1" text="白名单灰度" />,
    INNER_GRAY: <Badge color="#87CEEB" text="集团灰" />,
    EXTERNAL_GRAY: <Badge color="#108ee9" text="外灰" />,
    EXTERNAL_GRAY_D: <Badge color="#7FFFD4" text="下线外灰" />,
    WHITE_LIST_GRAY_D: <Badge color="#40E0D0" text="下线灰度中" />,
    RELEASED: <Badge color="#52c41a" text="发布" />,
    INVALID: <Badge color="#bfbfbf" text="下线" />,
  }[status];
};

const TagNew = ({ color, text }) => {
  return <Tag color={color}>{text}</Tag>;
}

export const StatusTag = ({status}) => {
  return {
    DRAFT: <TagNew color="#bfbfbf" text="草稿" />,
    UPDATED: <TagNew color="#faad14" text="有更新" />,
    PROCESSING: <TagNew color="#faad14" text="审批中" />,
    PROCESSING_D: <TagNew color="#faad14" text="下线审批中" />,
    PRE_RELEASED: <TagNew color="#00C78C" text="预发布" />,
    DELETED: <TagNew color="#f50" text="删除" />,
    WHITE_LIST_GRAY: <TagNew color="#4169E1" text="白名单灰度" />,
    INNER_GRAY: <TagNew color="#87CEEB" text="集团灰" />,
    EXTERNAL_GRAY: <TagNew color="#108ee9" text="外灰" />,
    EXTERNAL_GRAY_D: <TagNew color="#7FFFD4" text="下线外灰" />,
    WHITE_LIST_GRAY_D: <TagNew color="#40E0D0" text="下线灰度中" />,
    RELEASED: <TagNew color="#52c41a" text="发布" />,
    INVALID: <TagNew color="#bfbfbf" text="下线" />,
  }[status];
}
