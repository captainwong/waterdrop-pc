import { ROUTES, getRouteByKey } from '@/routes/menu';
import { useEffect, useMemo } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

/**
 * 设置页面标题
 * @param title 页面标题
 * @example
 * useTitle('首页');
 * useTitle('详情页');
 */
export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, []);
};

/**
 * 路由跳转
 * @returns
 * @example
 * const { back, go } = useGoTo();
 * <button onClick={back}>返回</button>
 * <button onClick={() => go('home')}>跳转到首页</button>
 * <button onClick={() => go('detail', { id: 1 })}>跳转到详情页</button>
 * <button onClick={() => go('detail', { id: 1, name: 'test' })}>跳转到详情页</button>
 * <button onClick={() => go('detail', { id: 1, name: 'test', age: 18 })}>跳转到详情页</button>
 */
export const useGoTo = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  const go = (pageKey?: string, params?: Record<string, string | number>) => {
    if (!pageKey) {
      navigate('/');
      return;
    }
    const route = getRouteByKey(pageKey);
    if (route && route.path) {
      if (!params) {
        navigate(`/${route.path}`);
        return;
      }

      // /page/:id/:name {id: 1, name: 'test'} => /page/1/test
      let path = `/${route.path}`;
      Object.keys(params).forEach((key) => {
        path = path.replace(`:${key}`, `${params[key]}`);
      });
      navigate(path);
    }
  };
  return { back, go };
};

/**
 * 获取当前匹配的路由
 */
export const useMatchedRoute = () => {
  const location = useLocation();
  const route = useMemo(
    () => ROUTES.find((item) => matchPath(item.path, location.pathname)),
    [location.pathname],
  );
  return route;
};
