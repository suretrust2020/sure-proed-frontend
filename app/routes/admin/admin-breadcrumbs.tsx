import { Link, useLocation } from "react-router";
import * as React from "react";
import { Breadcrumb } from "@chakra-ui/react";
export function AdminBreadcrumbs() {
  const breadcrumbNameMap: Record<string, string> = {
    admin: "Admin",
    projects: "Projects",
    plantations: "Plantations",
  };

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {pathnames.map((segment, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const label = breadcrumbNameMap[segment] || segment;
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={to}>
              <Breadcrumb.Item>
                <Breadcrumb.Link asChild color={isLast ? "gray.solid" : "gray"}>
                  <Link to={to}>{label}</Link>
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              {!isLast && <Breadcrumb.Separator />}
            </React.Fragment>
          );
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
