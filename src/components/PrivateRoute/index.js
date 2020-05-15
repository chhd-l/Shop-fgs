import React from "react";
import { Route } from "react-router-dom";
import AsyncBeforeEnter from "@/components/AsyncBeforeEnter"
export default (route) => (
  <Route
      path={route.path}
      exact={route.exact}
      strict={route.strict}
      location={route.location}
      sensitive={route.sensitive}
      children={route.children}
      render={props => {
          // beforeEnter
          const { beforeEnter, ...nextProps } = route
          // 如果有钩子函数，执行带有异步组件
          if (route.beforeEnter && typeof route.beforeEnter === 'function') {
              return (
                  <AsyncBeforeEnter
                      beforeEnter={beforeEnter}
                      route={nextProps}
                      {...props}
                      // {...extraProps}
                  />
              )

          }
          // 直接渲染
          return (
              route.render && typeof route.render ?
                  (
                      route.render({ ...props, 
                        // ...extraProps,
                         route: nextProps })
                  ) : (
                      route.component ? (
                          <route.component
                              route={nextProps}
                              {...props}
                              // {...extraProps}
                          />
                      ) : null
                  )
          )
      }}
  />
)