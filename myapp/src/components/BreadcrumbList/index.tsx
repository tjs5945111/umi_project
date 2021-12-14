import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export default ({
  urls,
  isHide,
}: {
  urls: Array<{
    name: string;
    url?: string;
  }>;
  isHide: Boolean;
}) => {
  return (
    <Breadcrumb style={{ margin: 0, marginBottom: '1rem', display: isHide ? 'none' : 'block' }}>
      {urls.map(({ name, url }, index) => (
        <Breadcrumb.Item key={index}>{url ? <Link to={url}>{name}</Link> : name}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
